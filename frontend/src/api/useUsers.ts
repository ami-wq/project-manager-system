import { useQuery } from '@tanstack/react-query';
import type { User } from '../types/user';
import getUsers from './usersApi';

const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: ({ signal }) => getUsers(signal),
  });
};

export default useUsers;
