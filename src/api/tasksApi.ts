import type { Task, TasksResponse } from '../types/task';
import apiClient from './apiClient';

export const getTasks = async (signal?: AbortSignal): Promise<Task[]> => {
  const { data } = await apiClient.get<TasksResponse>('/tasks', { signal });
  return data.data;
};

export const createTask = (data: {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: string;
  title: string;
}) => apiClient.post('/tasks/create', data);

export const updateTask = (
  taskId: number,
  data: {
    assigneeId: number;
    description: string;
    priority: string;
    status: string;
    title: string;
  }
) => apiClient.put(`/tasks/update/${taskId}`, data);