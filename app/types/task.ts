import type { Goal } from "./goal";

export interface Task {
  id: string;
  title: string;
  description?: string;
  estimatedTime?: number; // 所要時間（分）
  completed: boolean;
  date: string; // ISO 8601 format
  userId: string;
  goalId?: string; // Phase 2: 目標との紐づけ
  goal?: Goal; // Phase 2: 目標情報
  isAIGenerated: boolean; // Phase 4: AIが生成したタスクかどうか
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  estimatedTime?: number;
  date: string;
  goalId?: string; // Phase 2: 目標との紐づけ
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  estimatedTime?: number;
  completed?: boolean;
  date?: string;
  goalId?: string; // Phase 2: 目標との紐づけ
}
