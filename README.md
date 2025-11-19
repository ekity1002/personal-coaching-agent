# Personal Coaching Agent

AIパーソナルコーチングエージェント - 目標達成をサポートするWebアプリケーション

**全フェーズ実装完了（Phase 0 - Phase 5）**

## 技術スタック

- **Node.js**: 22.x
- **言語**: TypeScript
- **フロントエンド**:
  - React 18
  - React Router v7
  - Tailwind CSS
  - shadcn/ui
- **バックエンド/データ層**:
  - PostgreSQL (Prisma)
  - Redis
- **AI/エージェント**:
  - Mastra (AIエージェントフレームワーク)
  - AI SDK (Anthropic Claude / OpenAI GPT / Google Gemini / DeepSeek)
- **開発ツール**:
  - Vite
  - Vitest (テスト)
  - Biome (Lint/Format)

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### 環境変数の設定

`.env.example`をコピーして`.env`ファイルを作成し、必要な環境変数を設定します:

```bash
cp .env.example .env
```

#### AIプロバイダーの設定

使用するAIプロバイダーを選択できます:

1. **AI_PROVIDER** を設定 (選択肢: `anthropic`, `openai`, `google`, `deepseek`)
2. 対応するAPIキーを設定
3. (オプション) **AI_MODEL** でカスタムモデルを指定

例:
```bash
# Anthropic Claude を使用する場合
AI_PROVIDER="anthropic"
ANTHROPIC_API_KEY="your-api-key-here"

# OpenAI GPT を使用する場合
AI_PROVIDER="openai"
OPENAI_API_KEY="your-api-key-here"

# Google Gemini を使用する場合
AI_PROVIDER="google"
GOOGLE_GENERATIVE_AI_API_KEY="your-api-key-here"

# DeepSeek を使用する場合
AI_PROVIDER="deepseek"
DEEPSEEK_API_KEY="your-api-key-here"
```

デフォルトモデル:
- Anthropic: `claude-3-5-sonnet-20241022`
- OpenAI: `gpt-4o`
- Google: `gemini-1.5-pro`
- DeepSeek: `deepseek-chat`

### データベース (Docker)

PostgreSQLとRedisをDockerで起動:

```bash
docker compose up -d
```

### Prismaのセットアップ

```bash
npx prisma generate
npx prisma db push
```

## 開発

### 開発サーバーの起動

```bash
npm run dev
```

開発サーバーは http://localhost:5173/ で起動します。

### その他のコマンド

```bash
# ビルド
npm run build

# 型チェック
npm run typecheck

# Lint
npm run lint

# Lintの自動修正
npm run lint:fix

# コードフォーマット
npm run format

# テスト実行
npm test
```

## 実装フェーズ

### Phase 0: 環境＆骨組み ✅ 完了

- React Router v7 + TypeScript プロジェクトのセットアップ
- Tailwind CSS + shadcn/ui の設定
- Docker (PostgreSQL + Redis) の設定
- Prisma のセットアップ
- Biome (Lint/Format) の設定
- Vitest (テスト) の設定
- Hello Dashboard 画面の実装

### Phase 1: 日々のタスク管理 ✅ 完了

- Prisma Taskモデルの定義
- 今日のタスク画面のレイアウト
- タスクの追加・編集・削除機能
- タスク完了チェック機能
- 日付切り替え UI（前日/翌日）
- shadcn/ui コンポーネント（Button, Card, Input, Checkbox）
- モックデータを使用したフロントエンド実装

### Phase 2: 目標とタスクの紐づけ ✅ 完了

- Prisma Goalモデルの定義（優先度、アーカイブ機能）
- 目標一覧画面（アクティブ/アーカイブ）
- 目標追加フォーム（タイトル、説明、優先度）
- 目標詳細画面（タスク履歴、統計情報）
- タスクと目標の紐づけ機能
- ダッシュボードに目標ラベル表示
- ナビゲーションヘッダー実装
- shadcn/ui Badgeコンポーネント追加
- モックデータを使用したフロントエンド実装

### Phase 3: AIヒアリング ✅ 完了

- Mastraフレームワークによるゴールコーチエージェント
- 複数AIプロバイダー対応（Anthropic Claude / OpenAI GPT / Google Gemini / DeepSeek）
- チャット画面UI（メッセージ履歴、リアルタイム会話）
- AIによる目標提案機能
- 目標提案からの採用機能（個別/一括）
- チャットAPI実装
- 環境変数による柔軟なプロバイダー切り替え

### Phase 4: AIスケジュール調整 ✅ 完了

- Prisma UserSettingsモデルの定義（平日/休日の可処分時間）
- Task.isAIGeneratedフィールドの追加
- Goal.timeWeightフィールドの追加（時間配分の重み）
- 設定画面の実装（可処分時間、目標の時間配分調整）
- shadcn/ui Sliderコンポーネント追加
- タスク生成AIエージェントの作成（Mastraフレームワーク）
- タスク生成APIエンドポイントの実装
- ダッシュボードにAIタスク生成ボタン追加
- AI生成タスクのバッジ表示
- 合計所要時間の表示

### Phase 5: 振り返り機能 ✅ 完了

- Prisma Reflectionモデルの定義（日次・週次・月次）
- 振り返り・統計関連のTypeScript型定義作成
- shadcn/ui Tabsコンポーネント追加
- 振り返り統合画面の実装（タブで日次・週次・月次切り替え）
- 日次振り返り（気分スコア、忙しさスコア、コメント）
- 週次振り返り（達成、課題、次週アクション）
- 月次振り返り（達成、課題、来月アクション）
- 日次進捗統計の表示（完了タスク数、達成率、活動時間）
- 目標ごとの進捗内訳表示
