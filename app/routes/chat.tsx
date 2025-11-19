import { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "~/components/layout/header";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { ChatMessage, GoalSuggestion } from "~/types/chat";
import type { Goal } from "~/types/goal";

const priorityLabels = {
  high: { label: "高", variant: "destructive" as const },
  medium: { label: "中", variant: "default" as const },
  low: { label: "低", variant: "secondary" as const },
};

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "こんにちは！パーソナルコーチのAIです。あなたの目標設定をお手伝いします。\n\nまず、現在の状況や達成したいことについて教えていただけますか？",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedGoals, setSuggestedGoals] = useState<GoalSuggestion[]>([]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: data.message,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.goals && data.goals.length > 0) {
        setSuggestedGoals(data.goals);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        id: `${Date.now()}-error`,
        role: "assistant",
        content: "申し訳ございません。エラーが発生しました。もう一度お試しください。",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const adoptGoal = async (goal: GoalSuggestion) => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goals: [goal] }),
      });

      if (!response.ok) {
        throw new Error("Failed to save goal");
      }

      // 目標一覧ページに遷移
      navigate("/goals");
    } catch (error) {
      console.error("Error adopting goal:", error);
      alert("目標の保存に失敗しました。もう一度お試しください。");
    }
  };

  const adoptAllGoals = async () => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goals: suggestedGoals }),
      });

      if (!response.ok) {
        throw new Error("Failed to save goals");
      }

      // 目標一覧ページに遷移
      navigate("/goals");
    } catch (error) {
      console.error("Error adopting goals:", error);
      alert("目標の保存に失敗しました。もう一度お試しください。");
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AIコーチとの対話</h1>
          <p className="text-muted-foreground">Phase 3 - 目標設定をAIがサポート</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* チャット画面 */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>チャット</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* メッセージ一覧 */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="text-sm">入力中...</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 入力フォーム */}
                <div className="flex gap-2">
                  <Input
                    placeholder="メッセージを入力..."
                    value={inputMessage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputMessage(e.target.value)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    disabled={isLoading}
                  />
                  <Button onClick={sendMessage} disabled={isLoading || !inputMessage.trim()}>
                    送信
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 提案された目標 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>提案された目標</CardTitle>
              </CardHeader>
              <CardContent>
                {suggestedGoals.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    AIが目標を提案すると、ここに表示されます
                  </p>
                ) : (
                  <div className="space-y-4">
                    {suggestedGoals.map((goal, index) => (
                      <Card key={index} className="bg-accent/20">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-sm">{goal.title}</CardTitle>
                            <Badge variant={priorityLabels[goal.priority].variant} className="text-xs">
                              {priorityLabels[goal.priority].label}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground mb-3">{goal.description}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => adoptGoal(goal)}
                            className="w-full"
                          >
                            この目標を採用
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    <Button onClick={adoptAllGoals} className="w-full">
                      すべての目標を採用
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
