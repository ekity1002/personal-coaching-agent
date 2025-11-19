# Personal Coaching Agent

AIパーソナルコーチングエージェント - 目標達成をサポートするWebアプリケーション

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
- **開発ツール**:
  - Vite
  - Vitest (テスト)
  - Biome (Lint/Format)

## セットアップ

### 依存関係のインストール

```bash
npm install
```

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

### Phase 2: 目標とタスクの紐づけ (実装予定)

- 目標のCRUD
- タスクと目標の紐づけ
- 目標ごとのタスク表示

### Phase 3: AIヒアリング (実装予定)

- チャット画面
- AIによる目標作成支援

### Phase 4: AIスケジュール調整 (実装予定)

- AIによるタスク自動生成
- 目標ごとの時間配分

### Phase 5: 振り返り機能 (実装予定)

- 日次/週次/月次の振り返り
- 進捗の可視化
