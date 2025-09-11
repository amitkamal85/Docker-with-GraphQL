export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface CreateTaskInput {
  title: string;
  description: string;
}

export interface UpdateTaskInput {
  id: number;
  title?: string;
  description?: string;
  status?: string;
}

export type TaskFilter = 'ALL' | 'PENDING' | 'COMPLETED';