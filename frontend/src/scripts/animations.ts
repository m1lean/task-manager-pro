import { api, Task, CreateTaskDto, UpdateTaskDto } from './api.js';
import { AnimationManager, DragAndDrop } from './animations.js';

class TaskManagerUI {
  private tasks: Task[] = [];
  private currentFilter: 'all' | 'active' | 'completed' | 'high' = 'all';
  private dragAndDrop: DragAndDrop | null = null;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    this.attachEventListeners();
    await this.loadTasks();
    this.initDragAndDrop();
  }

  private attachEventListeners(): void {
    const form = document.getElementById('task-form') as HTMLFormElement;
    form?.addEventListener('submit', this.handleFormSubmit.bind(this));

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = (e.target as HTMLElement).dataset.filter as typeof this.currentFilter;
        this.setFilter(filter);
        filterButtons.forEach(b => b.classList.remove('active'));
        (e.target as HTMLElement).classList.add('active');
      });
    });

    const rippleButtons = document.querySelectorAll('.btn');
    rippleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        AnimationManager.ripple(e as MouseEvent, btn as HTMLElement);
      });
    });
  }

  private async handleFormSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    const titleInput = document.getElementById('task-title') as HTMLInputElement;
    const descInput = document.getElementById('task-description') as HTMLTextAreaElement;
    const priorityInput = document.getElementById('task-priority') as HTMLSelectElement;

    const dto: CreateTaskDto = {
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      priority: priorityInput.value as 'low' | 'medium' | 'high'
    };

    if (!dto.title) {
      AnimationManager.shake(titleInput);
      return;
    }

    try {
      const newTask = await api.createTask(dto);
      this.tasks.unshift(newTask);
      this.render();
      
      (e.target as HTMLFormElement).reset();
      
      const addButton = document.querySelector('.btn-primary') as HTMLElement;
      AnimationManager.pulse(addButton);
      
      this.showNotification('Задача успешно добавлена!', 'success');
    } catch (error) {
      console.error('Error creating task:', error);
      this.showNotification('Ошибка при создании задачи', 'error');
    }
  }

  private async loadTasks(): Promise<void> {
    try {
      this.tasks = await api.getAllTasks();
      this.render();
    } catch (error) {
      console.error('Error loading tasks:', error);
      this.showNotification('Ошибка загрузки задач', 'error');
    }
  }

  private async toggleTask(id: string): Promise<void> {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const updated = await api.updateTask(id, { completed: !task.completed });
      const index = this.tasks.findIndex(t => t.id === id);
      this.tasks[index] = updated;
      this.render();
      
      this.showNotification(
        updated.completed ? 'Задача завершена!' : 'Задача возвращена в работу',
        'success'
      );
    } catch (error) {
      console.error('Error toggling task:', error);
      this.showNotification('Ошибка при обновлении задачи', 'error');
    }
  }

  private async deleteTask(id: string): Promise<void> {
    const taskCard = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
    
    if (taskCard) {
      await AnimationManager.fadeOut(taskCard);
    }

    try {
      await api.deleteTask(id);
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.render();
      
      this.showNotification('Задача удалена', 'success');
    } catch (error) {
      console.error('Error deleting task:', error);
      this.showNotification('Ошибка при удалении задачи', 'error');
    }
  }

  private setFilter(filter: typeof this.currentFilter): void {
    this.currentFilter = filter;
    this.render();
  }

  private getFilteredTasks(): Task[] {
    switch (this.currentFilter) {
      case 'active':
        return this.tasks.filter(t => !t.completed);
      case 'completed':
        return this.tasks.filter(t => t.completed);
      case 'high':
        return this.tasks.filter(t => t.priority === 'high');
      default:
        return this.tasks;
    }
  }

  private render(): void {
    const container = document.getElementById('tasks-list');
    if (!container) return;

    const filteredTasks = this.getFilteredTasks();

    if (filteredTasks.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <p>${this.currentFilter === 'all' ? 'Нет задач. Добавьте первую задачу выше!' : 'Нет задач в этой категории.'}</p>
        </div>
      `;
    } else {
      container.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
      
      container.querySelectorAll('.task-card').forEach((card, index) => {
        AnimationManager.fadeIn(card as HTMLElement, 200 + index * 50);
        card.setAttribute('draggable', 'true');
        
        const id = (card as HTMLElement).dataset.id!;
        
        card.querySelector('.btn-complete')?.addEventListener('click', () => {
          this.toggleTask(id);
        });
        
        card.querySelector('.btn-delete')?.addEventListener('click', () => {
          this.deleteTask(id);
        });
      });
    }

    this.updateStats();
  }

  private createTaskHTML(task: Task): string {
    const priorityLabels = {
      high: 'Высокий',
      medium: 'Средний',
      low: 'Низкий'
    };

    const date = new Date(task.createdAt).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return `
      <div class="task-card" data-id="${task.id}">
        <div class="task-header">
          <div class="task-title ${task.completed ? 'completed' : ''}">${this.escapeHtml(task.title)}</div>
          <div class="task-priority priority-${task.priority}">${priorityLabels[task.priority]}</div>
        </div>
        ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
        <div class="task-footer">
          <div class="task-date">${date}</div>
          <div class="task-actions">
            <button class="btn btn-secondary btn-complete">
              ${task.completed ? '↩ Вернуть' : '✓ Завершить'}
            </button>
            <button class="btn btn-delete">Удалить</button>
          </div>
        </div>
      </div>
    `;
  }

  private updateStats(): void {
    const total = this.tasks.length;
    const active = this.tasks.filter(t => !t.completed).length;
    const completed = this.tasks.filter(t => t.completed).length;

    document.getElementById('total-count')!.textContent = total.toString();
    document.getElementById('active-count')!.textContent = active.toString();
    document.getElementById('completed-count')!.textContent = completed.toString();
  }

  private initDragAndDrop(): void {
    const container = document.getElementById('tasks-list');
    if (container) {
      this.dragAndDrop = new DragAndDrop(container);
    }
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    AnimationManager.fadeIn(notification);
    
    setTimeout(async () => {
      await AnimationManager.fadeOut(notification);
      notification.remove();
    }, 3000);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TaskManagerUI();
});
