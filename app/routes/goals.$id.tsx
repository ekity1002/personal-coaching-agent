import { useParams } from "react-router";
import { Header } from "~/components/layout/header";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Goal } from "~/types/goal";
import type { Task } from "~/types/task";

// モックデータ
const mockGoals: Goal[] = [
  {
    id: "1",
    title: "英語力向上",
    description: "TOEICスコア800点を目指す",
    priority: "high",
    isArchived: false,
    userId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "健康維持",
    description: "定期的な運動習慣をつける",
    priority: "medium",
    isArchived: false,
    userId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockTasks: Task[] = [
  {
    id: "1",
    title: "朝のウォーキング30分",
    description: "健康のため",
    estimatedTime: 30,
    completed: true,
    date: new Date(Date.now() - 86400000).toISOString(),
    userId: "user1",
    goalId: "2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "英語リスニング練習",
    estimatedTime: 20,
    completed: true,
    date: new Date().toISOString(),
    userId: "user1",
    goalId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "英単語50個暗記",
    estimatedTime: 15,
    completed: false,
    date: new Date().toISOString(),
    userId: "user1",
    goalId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const priorityLabels = {
  high: { label: "高", variant: "destructive" as const },
  medium: { label: "中", variant: "default" as const },
  low: { label: "低", variant: "secondary" as const },
};

export default function GoalDetail() {
  const params = useParams();
  const goalId = params.id;

  const goal = mockGoals.find((g) => g.id === goalId);
  const goalTasks = mockTasks.filter((t) => t.goalId === goalId);

  if (!goal) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-8 px-4">
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">目標が見つかりません</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* 目標情報 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{goal.title}</CardTitle>
                {goal.description && <p className="text-muted-foreground">{goal.description}</p>}
              </div>
              <Badge variant={priorityLabels[goal.priority].variant}>
                優先度: {priorityLabels[goal.priority].label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant="outline">編集</Button>
              <Button variant="outline">{goal.isArchived ? "復元" : "アーカイブ"}</Button>
            </div>
          </CardContent>
        </Card>

        {/* 統計情報 */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">総タスク数</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{goalTasks.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">完了タスク</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{goalTasks.filter((t) => t.completed).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">達成率</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {goalTasks.length > 0
                  ? Math.round(
                      (goalTasks.filter((t) => t.completed).length / goalTasks.length) * 100,
                    )
                  : 0}
                %
              </p>
            </CardContent>
          </Card>
        </div>

        {/* タスク履歴 */}
        <Card>
          <CardHeader>
            <CardTitle>最近のタスク</CardTitle>
          </CardHeader>
          <CardContent>
            {goalTasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                このゴールに紐づくタスクはまだありません
              </p>
            ) : (
              <div className="space-y-3">
                {goalTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                  >
                    <div className="flex-1">
                      <div
                        className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatDate(task.date)}
                        {task.estimatedTime && ` • ${task.estimatedTime}分`}
                      </div>
                    </div>
                    {task.completed && (
                      <Badge variant="secondary" className="ml-auto">
                        完了
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
