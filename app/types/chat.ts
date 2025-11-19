export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface GoalSuggestion {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface ChatResponse {
  message: string;
  goals?: GoalSuggestion[];
}
