interface Assignee {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
}

export type Priority = 'Low' | 'Medium' | 'High';

export type Status = 'Backlog' | 'ToDo' | 'InProgress' | 'Done';

export const statusLabels: Record<Status, string> = {
  Backlog: 'Backlog',
  ToDo: 'To Do',
  InProgress: 'In Progress',
  Done: 'Done',
};

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: Assignee;
  boardId: number;
  boardName: string;
}

export interface TasksResponse {
  data: Task[];
}