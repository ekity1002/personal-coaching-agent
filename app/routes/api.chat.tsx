import type { ActionFunctionArgs } from "react-router";
import { json } from "react-router";
import { mastra } from "~/lib/mastra/agent";
import type { ChatMessage, ChatResponse, GoalSuggestion } from "~/types/chat";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages)) {
      return json({ error: "Invalid messages format" }, { status: 400 });
    }

    // Convert chat messages to Mastra format
    const mastraMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Call the Mastra agent
    const agent = mastra.getAgent("goalCoachAgent");
    const response = await agent.generate(mastraMessages);

    // Extract the text response
    const messageText = response.text || "";

    // Try to extract JSON goals if present in the response
    let goals: GoalSuggestion[] | undefined;
    const jsonMatch = messageText.match(/```json\n([\s\S]*?)\n```/);

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed.goals && Array.isArray(parsed.goals)) {
          goals = parsed.goals.map((g: any) => ({
            title: g.title || "",
            description: g.description || g.why || "",
            priority: g.priority || "medium",
          }));
        }
      } catch (e) {
        console.error("Failed to parse goals JSON:", e);
      }
    }

    const chatResponse: ChatResponse = {
      message: messageText,
      goals,
    };

    return json(chatResponse);
  } catch (error) {
    console.error("Chat API error:", error);
    return json(
      { error: "Internal server error", message: "申し訳ございません。エラーが発生しました。" },
      { status: 500 },
    );
  }
}
