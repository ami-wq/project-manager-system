interface Assignee {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
}

type Priority = 'Low' | 'Medium' | 'High';

type Status = 'Backlog' | 'InProgress' | 'Done';

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
