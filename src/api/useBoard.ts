import { useQuery } from '@tanstack/react-query';
import type { Task } from '../types/task';
import getBoard from './boardApi';

const useBoards = (boardId: number) => {
  return useQuery<Task[], Error>({
    queryKey: ['boards', boardId],
    queryFn: () => getBoard(boardId),
  });
};

export default useBoards;
