export interface DailyStats {
  date: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  totalTime: number; // 分
  goalBreakdown: {
    goalId: string;
    goalTitle: string;
    taskCount: number;
    completedCount: number;
    totalTime: number;
  }[];
}

export interface WeeklyStats {
  weekStart: string;
  weekEnd: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  totalTime: number;
  dailyStats: DailyStats[];
  goalBreakdown: {
    goalId: string;
    goalTitle: string;
    taskCount: number;
    completedCount: number;
    totalTime: number;
  }[];
}

export interface MonthlyStats {
  year: number;
  month: number;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  totalTime: number;
  weeklyStats: WeeklyStats[];
  goalBreakdown: {
    goalId: string;
    goalTitle: string;
    taskCount: number;
    completedCount: number;
    totalTime: number;
  }[];
}
