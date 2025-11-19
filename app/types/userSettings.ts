export interface UserSettings {
  id: string;
  userId: string;
  weekdayHoursPerDay: number; // 平日の1日あたりの可処分時間（時間）
  weekendHoursPerDay: number; // 休日の1日あたりの可処分時間（時間）
  createdAt: string;
  updatedAt: string;
}

export interface UserSettingsInput {
  weekdayHoursPerDay: number;
  weekendHoursPerDay: number;
}
