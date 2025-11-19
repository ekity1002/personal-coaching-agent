import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("goals", "routes/goals.tsx"),
  route("goals/:id", "routes/goals.$id.tsx"),
  route("chat", "routes/chat.tsx"),
  route("api/chat", "routes/api.chat.tsx"),
  route("api/goals", "routes/api.goals.tsx"),
] satisfies RouteConfig;
