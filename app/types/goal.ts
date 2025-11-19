export type GoalPriority = "high" | "medium" | "low";

export interface Goal {
  id: string;
  title: string;
  description?: string;
  priority: GoalPriority;
  isArchived: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGoalInput {
  title: string;
  description?: string;
  priority?: GoalPriority;
}

export interface UpdateGoalInput {
  title?: string;
  description?: string;
  priority?: GoalPriority;
  isArchived?: boolean;
}
