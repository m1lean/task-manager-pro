import { Request, Response } from 'express';
import { FileStorage } from '../storage/fileStorage';
import { TaskModel } from '../models/Task';
import { CreateTaskDto, UpdateTaskDto } from '../types';

const storage = new FileStorage();

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await storage.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await storage.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const dto: CreateTaskDto = req.body;
    const task = TaskModel.create(dto);
    const created = await storage.create(task);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const dto: UpdateTaskDto = req.body;
    const updated = await storage.update(req.params.id, dto);
    if (!updated) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deleted = await storage.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};