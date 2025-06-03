import { useQuery } from '@tanstack/react-query';
import type { Board } from '../types/board';
import getBoards from './boardsApi';

const useBoards = () => {
  return useQuery<Board[], Error>({
    queryKey: ['boards'],
    queryFn: ({ signal }) => getBoards(signal),
  });
};

export default useBoards;
