import { useQuery } from '@tanstack/react-query';
import type { Task } from '../types/task';
import getBoard from './boardApi';

const useBoard = (boardId: number | undefined) => {
  return useQuery<Task[], Error>({
    queryKey: ['boards', boardId],
    queryFn: ({ signal }) => getBoard(boardId as number, signal),
    enabled: typeof boardId === 'number' && !isNaN(boardId),
  });
};

export default useBoard;
