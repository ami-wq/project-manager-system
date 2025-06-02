import type { User, UsersResponse } from '../types/user';
import apiClient from './apiClient';

const getUsers = async (signal?: AbortSignal): Promise<User[]> => {
  const { data } = await apiClient.get<UsersResponse>('/users', { signal });
  return data.data;
};

export default getUsers;
