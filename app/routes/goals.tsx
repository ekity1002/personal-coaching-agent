import { useState } from "react";
import { Link } from "react-router";
import { Header } from "~/components/layout/header";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { Goal } from "~/types/goal";

// モックデータ（Phase 2ではstateで管理）
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

const priorityLabels = {
  high: { label: "高", variant: "destructive" as const },
  medium: { label: "中", variant: "default" as const },
  low: { label: "低", variant: "secondary" as const },
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [newGoalPriority, setNewGoalPriority] = useState<"high" | "medium" | "low">("medium");

  const addGoal = () => {
    if (!newGoalTitle.trim()) return;

    const newGoal: Goal = {
      id: `${Date.now()}`,
      title: newGoalTitle,
      description: newGoalDescription || undefined,
      priority: newGoalPriority,
      isArchived: false,
      userId: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setGoals([...goals, newGoal]);
    setNewGoalTitle("");
    setNewGoalDescription("");
    setNewGoalPriority("medium");
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const toggleArchive = (id: string) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, isArchived: !goal.isArchived } : goal)),
    );
  };

  const activeGoals = goals.filter((g) => !g.isArchived);
  const archivedGoals = goals.filter((g) => g.isArchived);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">目標管理</h1>
          <p className="text-muted-foreground">Phase 2 - 複数目標の並行管理</p>
        </div>

        {/* 目標追加フォーム */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>新しい目標を追加</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="目標タイトル"
                value={newGoalTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewGoalTitle(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    addGoal();
                  }
                }}
              />
              <Input
                placeholder="説明（目的・Why）"
                value={newGoalDescription}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewGoalDescription(e.target.value)
                }
              />
              <div className="flex gap-2 items-center">
                <label htmlFor="priority-select" className="text-sm font-medium">
                  優先度:
                </label>
                <select
                  id="priority-select"
                  value={newGoalPriority}
                  onChange={(e) => setNewGoalPriority(e.target.value as "high" | "medium" | "low")}
                  className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
                <Button onClick={addGoal} className="ml-auto">
                  追加
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アクティブな目標 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>アクティブな目標（{activeGoals.length}件）</CardTitle>
          </CardHeader>
          <CardContent>
            {activeGoals.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                目標がありません。新しい目標を追加してください。
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeGoals.map((goal) => (
                  <Card key={goal.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link to={`/goals/${goal.id}`}>
                            <CardTitle className="hover:underline cursor-pointer">
                              {goal.title}
                            </CardTitle>
                          </Link>
                        </div>
                        <Badge variant={priorityLabels[goal.priority].variant}>
                          {priorityLabels[goal.priority].label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {goal.description && (
                        <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => toggleArchive(goal.id)}>
                          アーカイブ
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteGoal(goal.id)}>
                          削除
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* アーカイブ済み目標 */}
        {archivedGoals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>アーカイブ済み（{archivedGoals.length}件）</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {archivedGoals.map((goal) => (
                  <Card key={goal.id} className="opacity-60">
                    <CardHeader>
                      <CardTitle className="text-muted-foreground">{goal.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {goal.description && (
                        <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => toggleArchive(goal.id)}>
                          復元
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteGoal(goal.id)}>
                          削除
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
