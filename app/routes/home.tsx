import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import type { Task } from "~/types/task";

// モックデータ（Phase 1では実際のDBの代わりに使用）
const mockTasks: Task[] = [
  {
    id: "1",
    title: "朝のウォーキング30分",
    description: "健康のため",
    estimatedTime: 30,
    completed: false,
    date: new Date().toISOString(),
    userId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "プロジェクトの資料作成",
    description: "明日の会議用",
    estimatedTime: 60,
    completed: false,
    date: new Date().toISOString(),
    userId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskEstimatedTime, setNewTaskEstimatedTime] = useState("");
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskEstimatedTime("");
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">今日のタスク</h1>
          <p className="text-muted-foreground">Phase 1 - タスク管理</p>
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
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      checked={task.completed}
                      onChange={() => toggleTaskComplete(task.id)}
                    />
                    <div className="flex-1">
                      <div
                        className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
