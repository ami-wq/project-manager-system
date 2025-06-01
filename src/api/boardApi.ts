import type { BoardResponse } from '../types/board';
import type { Task } from '../types/task';
import apiClient from './apiClient';

const getBoard = async (boardId: number): Promise<Task[]> => {
  const { data } = await apiClient.get<BoardResponse>(`/boards/${boardId}`);
  return data.data;
};

export default getBoard;
