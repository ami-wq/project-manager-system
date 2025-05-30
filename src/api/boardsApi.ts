import type { Board, BoardsResponse } from '../types/board';
import apiClient from './apiClient';

const getBoards = async (): Promise<Board[]> => {
  const { data } = await apiClient.get<BoardsResponse>('/boards');
  return data.data;
};

export default getBoards;
