import type { Board, BoardsResponse } from '../types/board';
import apiClient from './apiClient';

const getBoards = async (signal?: AbortSignal): Promise<Board[]> => {
  const { data } = await apiClient.get<BoardsResponse>('/boards', { signal });
  return data.data;
};

export default getBoards;
