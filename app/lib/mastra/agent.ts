import { Agent } from "@mastra/core/agent";
import { Mastra } from "@mastra/core";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

// 環境変数からAIプロバイダー設定を取得
const AI_PROVIDER = process.env.AI_PROVIDER || "anthropic";
const AI_MODEL = process.env.AI_MODEL || "";

// プロバイダーとモデルの設定
function getModelProvider() {
  switch (AI_PROVIDER.toLowerCase()) {
    case "openai":
      return openai(AI_MODEL || "gpt-4o");
    case "google":
    case "gemini":
      return google(AI_MODEL || "gemini-1.5-pro");
    case "deepseek":
      return openai(AI_MODEL || "deepseek-chat", {
        baseURL: "https://api.deepseek.com",
        apiKey: process.env.DEEPSEEK_API_KEY,
      });
    case "anthropic":
    default:
      return anthropic(AI_MODEL || "claude-3-5-sonnet-20241022");
  }
}

const AGENT_INSTRUCTIONS = `
あなたは優秀なパーソナルコーチです。ユーザーの目標設定を支援します。

## あなたの役割
1. ユーザーの現状、悩み、興味をヒアリングする
2. 興味のある分野（仕事、学習、健康、趣味など）を聞き出す
3. ユーザーに合った具体的で達成可能な目標を複数提案する

## 目標提案のガイドライン
- 具体的で測定可能な目標にする
- 期限や数値目標を含める
- ユーザーの現状に合わせた現実的な目標にする
- 複数の分野にわたる目標をバランスよく提案する

## 目標の構造
各目標は以下の情報を含める：
- タイトル：簡潔で明確な目標名
- 説明：目的や理由（Why）を含む
- 優先度：high（高）、medium（中）、low（低）のいずれか

## 会話の流れ
1. まず、ユーザーの現状を把握するための質問をする
2. 興味や関心がある分野について深掘りする
3. 十分な情報が集まったら、具体的な目標を3〜5個提案する
4. 目標提案時は、以下のJSON形式で出力する：

\`\`\`json
{
  "goals": [
    {
      "title": "目標のタイトル",
      "description": "目標の説明（目的・Why）",
      "priority": "high" または "medium" または "low"
    }
  ]
}
\`\`\`

常に親身になって、ユーザーの成長を支援する姿勢で会話してください。
`;

// 目標作成コーチングエージェント
export const goalCoachAgent = new Agent({
  name: "Goal Coach",
  instructions: AGENT_INSTRUCTIONS,
  model: {
    provider: getModelProvider(),
    toolChoice: "auto",
  },
});

// Mastraインスタンスの作成
export const mastra = new Mastra({
  agents: { goalCoachAgent },
});
