import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("goals", "routes/goals.tsx"),
  route("goals/:id", "routes/goals.$id.tsx"),
  route("chat", "routes/chat.tsx"),
  route("settings", "routes/settings.tsx"),
  route("reflections", "routes/reflections.tsx"),
  route("api/chat", "routes/api.chat.tsx"),
  route("api/goals", "routes/api.goals.tsx"),
  route("api/generate-tasks", "routes/api.generate-tasks.tsx"),
] satisfies RouteConfig;
