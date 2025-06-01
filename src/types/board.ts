import type { TasksResponse } from './task';

export interface Board {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export interface BoardsResponse {
  data: Board[];
}

export type BoardResponse = TasksResponse;
