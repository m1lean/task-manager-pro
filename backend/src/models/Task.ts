import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskDto } from '../types';

export class TaskModel {
  static create(dto: CreateTaskDto): Task {
    const now = new Date().toISOString();
    return {
      id: uuidv4(),
      title: dto.title,
      description: dto.description || '',
      priority: dto.priority,
      completed: false,
      createdAt: now,
      updatedAt: now
    };
  }
}
