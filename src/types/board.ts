export interface Board {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export interface BoardsResponse {
  data: Board[];
}
