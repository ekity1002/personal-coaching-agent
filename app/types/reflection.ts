export type ReflectionType = "daily" | "weekly" | "monthly";

export interface Reflection {
  id: string;
  userId: string;
  date: string; // ISO 8601 format
  type: ReflectionType;
  moodScore?: number; // 1-5
  busynessScore?: number; // 1-5
  comment?: string;
  achievements?: string; // 週次・月次
  challenges?: string; // 週次・月次
  nextActions?: string; // 週次・月次
  createdAt: string;
  updatedAt: string;
}

export interface CreateReflectionInput {
  date: string;
  type: ReflectionType;
  moodScore?: number;
  busynessScore?: number;
  comment?: string;
  achievements?: string;
  challenges?: string;
  nextActions?: string;
}

export interface UpdateReflectionInput {
  moodScore?: number;
  busynessScore?: number;
  comment?: string;
  achievements?: string;
  challenges?: string;
  nextActions?: string;
}
