import { useState } from "react";
import { Header } from "~/components/layout/header";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import type { Goal } from "~/types/goal";
import type { Task } from "~/types/task";

// モックデータ（Phase 2で目標を追加）
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
    completed: false,
    date: new Date().toISOString(),
    userId: "user1",
    goalId: "2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "英語リスニング練習",
    estimatedTime: 20,
    completed: false,
    date: new Date().toISOString(),
    userId: "user1",
    goalId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskEstimatedTime, setNewTaskEstimatedTime] = useState("");
  const [newTaskGoalId, setNewTaskGoalId] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `${Date.now()}`,
      title: newTaskTitle,
      estimatedTime: newTaskEstimatedTime ? Number.parseInt(newTaskEstimatedTime) : undefined,
      completed: false,
      date: currentDate.toISOString(),
      userId: "user1",
      goalId: newTaskGoalId || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskEstimatedTime("");
    setNewTaskGoalId("");
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const getGoalById = (goalId?: string) => {
    if (!goalId) return null;
    return mockGoals.find((g) => g.id === goalId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">今日のタスク</h1>
          <p className="text-muted-foreground">Phase 2 - 目標と紐づけたタスク管理</p>
        </div>

        {/* 日付切り替え */}
        <Card className="mb-6">
          <CardContent className="flex items-center justify-between p-4">
            <Button variant="outline" onClick={() => changeDate(-1)}>
              前日
            </Button>
            <div className="text-lg font-semibold">{formatDate(currentDate)}</div>
            <Button variant="outline" onClick={() => changeDate(1)}>
              翌日
            </Button>
          </CardContent>
        </Card>

        {/* タスク追加フォーム */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>新しいタスクを追加</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Input
                placeholder="タスク名"
                value={newTaskTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTaskTitle(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    addTask();
                  }
                }}
                className="flex-1"
              />
              <select
                value={newTaskGoalId}
                onChange={(e) => setNewTaskGoalId(e.target.value)}
                className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm sm:w-40"
              >
                <option value="">目標なし</option>
                {mockGoals
                  .filter((g) => !g.isArchived)
                  .map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.title}
                    </option>
                  ))}
              </select>
              <Input
                type="number"
                placeholder="所要時間（分）"
                value={newTaskEstimatedTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTaskEstimatedTime(e.target.value)
                }
                className="sm:w-32"
              />
              <Button onClick={addTask}>追加</Button>
            </div>
          </CardContent>
        </Card>

        {/* タスク一覧 */}
        <Card>
          <CardHeader>
            <CardTitle>タスク一覧（{tasks.length}件）</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                タスクがありません。新しいタスクを追加してください。
              </p>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => {
                  const goal = getGoalById(task.goalId);
                  return (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <Checkbox
                        checked={task.completed}
                        onChange={() => toggleTaskComplete(task.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {task.title}
                          </div>
                          {goal && (
                            <Badge variant="outline" className="text-xs">
                              {goal.title}
                            </Badge>
                          )}
                        </div>
                        {task.description && (
                          <div className="text-sm text-muted-foreground">{task.description}</div>
                        )}
                        {task.estimatedTime && (
                          <div className="text-xs text-muted-foreground mt-1">
                            所要時間: {task.estimatedTime}分
                          </div>
                        )}
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>
                        削除
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
