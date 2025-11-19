export interface Task {
  id: string;
  title: string;
  description?: string;
  estimatedTime?: number; // 所要時間（分）
  completed: boolean;
  date: string; // ISO 8601 format
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  estimatedTime?: number;
  date: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  estimatedTime?: number;
  completed?: boolean;
  date?: string;
}
