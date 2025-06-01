import { useQuery } from '@tanstack/react-query';
import type { Task } from '../types/task';
import getTasks from './tasksApi';

const useTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
};

export default useTasks;
