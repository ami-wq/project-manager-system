import type { BoardResponse } from '../types/board';
import type { Task } from '../types/task';
import apiClient from './apiClient';

const getBoard = async (
  boardId: number,
  signal?: AbortSignal
): Promise<Task[]> => {
  const { data } = await apiClient.get<BoardResponse>(`/boards/${boardId}`, {
    signal,
  });

  if (data.data.length === 0) {
    throw new Error('Доска не найдена');
  }

  return data.data;
};

export default getBoard;
