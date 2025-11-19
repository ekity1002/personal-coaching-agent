import type { ActionFunctionArgs } from "react-router";
import { json } from "react-router";
import type { GoalSuggestion } from "~/types/chat";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { goals } = body as { goals: GoalSuggestion[] };

    if (!goals || !Array.isArray(goals)) {
      return json({ error: "Invalid goals format" }, { status: 400 });
    }

    // Phase 3では、モックデータのため実際のDB保存は行わない
    // Phase 4以降でPrismaを使った実装に置き換える予定
    console.log("Goals to be created:", goals);

    // ここでは成功レスポンスのみ返す
    // 実際のアプリケーションではPrismaを使ってDBに保存する
    // 例:
    // await prisma.goal.createMany({
    //   data: goals.map(g => ({
    //     title: g.title,
    //     description: g.description,
    //     priority: g.priority,
    //     userId: "user1", // 認証実装後は実際のユーザーIDを使用
    //   })),
    // });

    return json({ success: true, count: goals.length });
  } catch (error) {
    console.error("Goals API error:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}
