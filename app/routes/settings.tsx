import { useState } from "react";
import { Header } from "~/components/layout/header";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import type { Goal } from "~/types/goal";
import type { UserSettings } from "~/types/userSettings";

export default function Settings() {
  // モックデータ（後でAPI実装時に置き換え）
  const [settings, setSettings] = useState<UserSettings>({
    id: "1",
    userId: "user1",
    weekdayHoursPerDay: 2,
    weekendHoursPerDay: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "英語学習",
      description: "TOEIC 800点を目指す",
      priority: "high",
      isArchived: false,
      timeWeight: 3,
      userId: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "健康管理",
      description: "体重を5kg減らす",
      priority: "medium",
      isArchived: false,
      timeWeight: 2,
      userId: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "副業プロジェクト",
      description: "Webアプリ開発",
      priority: "high",
      isArchived: false,
      timeWeight: 5,
      userId: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const handleSaveSettings = () => {
    // TODO: API実装時にバックエンドに保存
    console.log("Saving settings:", settings);
    console.log("Saving goal weights:", goals.map((g) => ({ id: g.id, timeWeight: g.timeWeight })));
    alert("設定を保存しました");
  };

  const handleWeekdayHoursChange = (value: number[]) => {
    setSettings({ ...settings, weekdayHoursPerDay: value[0] });
  };

  const handleWeekendHoursChange = (value: number[]) => {
    setSettings({ ...settings, weekendHoursPerDay: value[0] });
  };

  const handleGoalWeightChange = (goalId: string, value: number[]) => {
    setGoals(
      goals.map((g) => (g.id === goalId ? { ...g, timeWeight: value[0] } : g)),
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">設定</h1>

        <div className="space-y-6">
          {/* 可処分時間の設定 */}
          <Card>
            <CardHeader>
              <CardTitle>1日の可処分時間</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    平日（月〜金）
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {settings.weekdayHoursPerDay}時間/日
                  </span>
                </div>
                <Slider
                  min={0}
                  max={12}
                  step={0.5}
                  value={[settings.weekdayHoursPerDay]}
                  onValueChange={handleWeekdayHoursChange}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    休日（土・日）
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {settings.weekendHoursPerDay}時間/日
                  </span>
                </div>
                <Slider
                  min={0}
                  max={12}
                  step={0.5}
                  value={[settings.weekendHoursPerDay]}
                  onValueChange={handleWeekendHoursChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* 目標ごとの時間配分 */}
          <Card>
            <CardHeader>
              <CardTitle>目標の時間配分</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                各目標にどのくらい時間を割くかの重み（1〜5）を設定します。
                AIがこの重みを考慮してタスクを生成します。
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {goals
                .filter((g) => !g.isArchived)
                .map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">{goal.title}</label>
                      <span className="text-sm text-muted-foreground">
                        重み: {goal.timeWeight}
                      </span>
                    </div>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[goal.timeWeight]}
                      onValueChange={(value) =>
                        handleGoalWeightChange(goal.id, value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {goal.description}
                    </p>
                  </div>
                ))}

              {goals.filter((g) => !g.isArchived).length === 0 && (
                <p className="text-sm text-muted-foreground">
                  アクティブな目標がありません。まず目標を作成してください。
                </p>
              )}
            </CardContent>
          </Card>

          {/* 保存ボタン */}
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} size="lg">
              設定を保存
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
