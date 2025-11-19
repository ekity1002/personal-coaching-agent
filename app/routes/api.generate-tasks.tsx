import type { ActionFunctionArgs } from "react-router";
import { json } from "react-router";
import { mastra } from "~/lib/mastra/agent";
import type { Goal } from "~/types/goal";
import type { UserSettings } from "~/types/userSettings";

interface GenerateTasksRequest {
  date: string; // ISO 8601 format
  goals: Goal[];
  settings: UserSettings;
}

interface GeneratedTask {
  goalId: string;
  title: string;
  description: string;
  estimatedTime: number;
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { date, goals, settings } = body as GenerateTasksRequest;

    if (!date || !goals || !settings) {
      return json({ error: "Invalid request body" }, { status: 400 });
    }

    // 日付から曜日を判定（平日 or 休日）
    const targetDate = new Date(date);
    const dayOfWeek = targetDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const availableHours = isWeekend
      ? settings.weekendHoursPerDay
      : settings.weekdayHoursPerDay;

    // アクティブな目標のみをフィルタリング
    const activeGoals = goals.filter((g) => !g.isArchived);

    if (activeGoals.length === 0) {
      return json({
        tasks: [],
        message: "アクティブな目標がありません。まず目標を設定してください。",
      });
    }

    // AIエージェントへのプロンプト作成
    const prompt = `
以下の条件で、${targetDate.toLocaleDateString("ja-JP")}（${isWeekend ? "休日" : "平日"}）のタスクを生成してください。

## 利用可能な時間
${availableHours}時間（${availableHours * 60}分）

## 目標一覧
${activeGoals
  .map(
    (g, i) => `
${i + 1}. 【ID: ${g.id}】${g.title}
   - 説明: ${g.description || "なし"}
   - 優先度: ${g.priority}
   - 時間配分の重み: ${g.timeWeight}/5
`,
  )
  .join("\n")}

## 要件
- 各目標の時間配分の重みに応じてタスクを配分してください
- 合計所要時間が利用可能な時間（${availableHours * 60}分）を超えないようにしてください
- 各タスクには必ずgoalId、title、description、estimatedTimeを含めてください
- タスクは具体的で実行可能な内容にしてください
`;

    // タスク生成エージェントを実行
    const agent = mastra.getAgent("taskGeneratorAgent");
    const response = await agent.generate([
      {
        role: "user",
        content: prompt,
      },
    ]);

    const messageText = response.text || "";

    // JSON形式のタスクを抽出
    let tasks: GeneratedTask[] = [];
    const jsonMatch = messageText.match(/```json\n([\s\S]*?)\n```/);

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed.tasks && Array.isArray(parsed.tasks)) {
          tasks = parsed.tasks.map((t: any) => ({
            goalId: t.goalId || "",
            title: t.title || "",
            description: t.description || "",
            estimatedTime: t.estimatedTime || 60,
          }));
        }
      } catch (e) {
        console.error("Failed to parse tasks JSON:", e);
      }
    }

    if (tasks.length === 0) {
      return json({
        error: "タスクの生成に失敗しました",
        message: messageText,
      }, { status: 500 });
    }

    return json({
      tasks,
      message: `${tasks.length}件のタスクを生成しました`,
    });
  } catch (error) {
    console.error("Generate tasks API error:", error);
    return json(
      {
        error: "Internal server error",
        message: "タスクの生成中にエラーが発生しました。",
      },
      { status: 500 },
    );
  }
}
