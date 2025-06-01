import type { User, UsersResponse } from '../types/user';
import apiClient from './apiClient';

const getUsers = async (): Promise<User[]> => {
  const { data } = await apiClient.get<UsersResponse>('/users');
  return data.data;
};

export default getUsers;
