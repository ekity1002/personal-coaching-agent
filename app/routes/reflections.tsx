import { useState } from "react";
import { Header } from "~/components/layout/header";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Task } from "~/types/task";
import type { Goal } from "~/types/goal";
import type { Reflection } from "~/types/reflection";

// モックデータ
const mockGoals: Goal[] = [
  {
    id: "1",
    title: "英語力向上",
    description: "TOEICスコア800点を目指す",
    priority: "high",
    isArchived: false,
    timeWeight: 3,
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
    timeWeight: 2,
    userId: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockTasks: Task[] = [
  {
    id: "1",
    title: "朝のウォーキング30分",
    estimatedTime: 30,
    completed: true,
    date: new Date().toISOString(),
    userId: "user1",
    goalId: "2",
    isAIGenerated: false,
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
    isAIGenerated: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Reflections() {
  const [dailyReflection, setDailyReflection] = useState<Partial<Reflection>>({
    moodScore: 3,
    busynessScore: 3,
    comment: "",
  });

  const [weeklyReflection, setWeeklyReflection] = useState<Partial<Reflection>>({
    achievements: "",
    challenges: "",
    nextActions: "",
  });

  const [monthlyReflection, setMonthlyReflection] = useState<Partial<Reflection>>({
    achievements: "",
    challenges: "",
    nextActions: "",
  });

  const completedTasks = mockTasks.filter((t) => t.completed);
  const completionRate = mockTasks.length > 0
    ? Math.round((completedTasks.length / mockTasks.length) * 100)
    : 0;

  const totalTime = completedTasks.reduce((sum, t) => sum + (t.estimatedTime || 0), 0);

  // 目標ごとの統計
  const goalStats = mockGoals.map((goal) => {
    const goalTasks = mockTasks.filter((t) => t.goalId === goal.id);
    const goalCompleted = goalTasks.filter((t) => t.completed);
    const goalTime = goalCompleted.reduce((sum, t) => sum + (t.estimatedTime || 0), 0);
    return {
      goal,
      taskCount: goalTasks.length,
      completedCount: goalCompleted.length,
      totalTime: goalTime,
    };
  });

  const saveDailyReflection = () => {
    // TODO: API実装時にバックエンドに保存
    console.log("Saving daily reflection:", dailyReflection);
    alert("日次振り返りを保存しました");
  };

  const saveWeeklyReflection = () => {
    // TODO: API実装時にバックエンドに保存
    console.log("Saving weekly reflection:", weeklyReflection);
    alert("週次振り返りを保存しました");
  };

  const saveMonthlyReflection = () => {
    // TODO: API実装時にバックエンドに保存
    console.log("Saving monthly reflection:", monthlyReflection);
    alert("月次振り返りを保存しました");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">振り返り</h1>
        <p className="text-muted-foreground mb-8">Phase 5 - 進捗の可視化とモチベーション維持</p>

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="daily">日次</TabsTrigger>
            <TabsTrigger value="weekly">週次</TabsTrigger>
            <TabsTrigger value="monthly">月次</TabsTrigger>
          </TabsList>

          {/* 日次振り返り */}
          <TabsContent value="daily" className="space-y-6">
            {/* 今日の統計 */}
            <Card>
              <CardHeader>
                <CardTitle>今日の進捗</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-primary">{completedTasks.length}</div>
                    <div className="text-sm text-muted-foreground">完了したタスク</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-primary">{completionRate}%</div>
                    <div className="text-sm text-muted-foreground">達成率</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-primary">{totalTime}分</div>
                    <div className="text-sm text-muted-foreground">活動時間</div>
                  </div>
                </div>

                {/* 目標ごとの進捗 */}
                {goalStats.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h3 className="font-semibold">目標ごとの進捗</h3>
                    {goalStats.map((stat) => (
                      <div key={stat.goal.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{stat.goal.title}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {stat.completedCount}/{stat.taskCount}件完了
                          </span>
                        </div>
                        <span className="text-sm font-medium">{stat.totalTime}分</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 日次振り返り入力 */}
            <Card>
              <CardHeader>
                <CardTitle>今日の振り返り</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">気分スコア</label>
                    <span className="text-sm text-muted-foreground">
                      {dailyReflection.moodScore}/5
                    </span>
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[dailyReflection.moodScore || 3]}
                    onValueChange={(value) =>
                      setDailyReflection({ ...dailyReflection, moodScore: value[0] })
                    }
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>とても悪い</span>
                    <span>とても良い</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">忙しさスコア</label>
                    <span className="text-sm text-muted-foreground">
                      {dailyReflection.busynessScore}/5
                    </span>
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[dailyReflection.busynessScore || 3]}
                    onValueChange={(value) =>
                      setDailyReflection({ ...dailyReflection, busynessScore: value[0] })
                    }
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>余裕あり</span>
                    <span>とても忙しい</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">コメント（任意）</label>
                  <textarea
                    className="w-full min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="今日の感想や気づいたことを記入してください"
                    value={dailyReflection.comment || ""}
                    onChange={(e) =>
                      setDailyReflection({ ...dailyReflection, comment: e.target.value })
                    }
                  />
                </div>

                <Button onClick={saveDailyReflection} className="w-full">
                  保存
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 週次振り返り */}
          <TabsContent value="weekly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>今週の振り返り</CardTitle>
                <p className="text-sm text-muted-foreground">
                  今週の活動を振り返り、次週の計画を立てましょう
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">今週達成したこと</label>
                  <textarea
                    className="w-full min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="達成したこと、進捗があったことを記入してください"
                    value={weeklyReflection.achievements || ""}
                    onChange={(e) =>
                      setWeeklyReflection({ ...weeklyReflection, achievements: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">今週の課題・困難</label>
                  <textarea
                    className="w-full min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="うまくいかなかったこと、改善が必要なことを記入してください"
                    value={weeklyReflection.challenges || ""}
                    onChange={(e) =>
                      setWeeklyReflection({ ...weeklyReflection, challenges: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">来週のアクション</label>
                  <textarea
                    className="w-full min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="来週どうするか、増やす・減らす・維持など"
                    value={weeklyReflection.nextActions || ""}
                    onChange={(e) =>
                      setWeeklyReflection({ ...weeklyReflection, nextActions: e.target.value })
                    }
                  />
                </div>

                <Button onClick={saveWeeklyReflection} className="w-full">
                  保存
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 月次振り返り */}
          <TabsContent value="monthly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>今月の振り返り</CardTitle>
                <p className="text-sm text-muted-foreground">
                  今月の活動を振り返り、来月の方針を考えましょう
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">今月達成したこと</label>
                  <textarea
                    className="w-full min-h-32 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="大きな達成、進んだ目標について記入してください"
                    value={monthlyReflection.achievements || ""}
                    onChange={(e) =>
                      setMonthlyReflection({ ...monthlyReflection, achievements: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">今月の課題・困難</label>
                  <textarea
                    className="w-full min-h-32 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="停滞した目標、改善が必要なパターンなど"
                    value={monthlyReflection.challenges || ""}
                    onChange={(e) =>
                      setMonthlyReflection({ ...monthlyReflection, challenges: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">来月のアクション</label>
                  <textarea
                    className="w-full min-h-32 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="来月の重点目標、新しく始めること、やめることなど"
                    value={monthlyReflection.nextActions || ""}
                    onChange={(e) =>
                      setMonthlyReflection({ ...monthlyReflection, nextActions: e.target.value })
                    }
                  />
                </div>

                <Button onClick={saveMonthlyReflection} className="w-full">
                  保存
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
