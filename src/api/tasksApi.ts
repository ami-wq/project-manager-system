import type { Task, TasksResponse } from '../types/task';
import apiClient from './apiClient';

const getTasks = async (): Promise<Task[]> => {
  const { data } = await apiClient.get<TasksResponse>('/tasks');
  return data.data;
};

export default getTasks;
