import fs from 'fs';
import path from 'path';
import { Task } from '../types';

const DATA_FILE = path.join(__dirname, '../../data/tasks.json');

export class FileStorage {
  private ensureDataFile(): void {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
    }
  }

  async readTasks(): Promise<Task[]> {
    this.ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  }

  async writeTasks(tasks: Task[]): Promise<void> {
    this.ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
  }

  async findAll(): Promise<Task[]> {
    return this.readTasks();
  }

  async findById(id: string): Promise<Task | null> {
    const tasks = await this.readTasks();
    return tasks.find(task => task.id === id) || null;
  }

  async create(task: Task): Promise<Task> {
    const tasks = await this.readTasks();
    tasks.unshift(task);
    await this.writeTasks(tasks);
    return task;
  }

  async update(id: string, updates: Partial<Task>): Promise<Task | null> {
    const tasks = await this.readTasks();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) return null;
    
    tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
    await this.writeTasks(tasks);
    return tasks[index];
  }

  async delete(id: string): Promise<boolean> {
    const tasks = await this.readTasks();
    const filtered = tasks.filter(task => task.id !== id);
    
    if (filtered.length === tasks.length) return false;
    
    await this.writeTasks(filtered);
    return true;
  }
}
