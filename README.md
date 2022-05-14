# ゆめみ フロントエンドコーディング試験

詳細：https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d

## スタートガイド

### 必要条件

node.js の v16 系を使用します。nodenv を使用している場合は、自動的にバージョンが切り替わります。

```sh
node -v
# v16.14.2

yarn -v
# 1.22.18
```

### インストール

依存モジュールを解決します。

```sh
yarn install
```

### 開発

ローカルサーバーを起動します。

```sh
yarn dev
# http://localhost:3000/
```

## テストの実行

### ユニットテスト

Vitest を使ったユニットテストを実行します。

```
yarn test
```

### リント & フォーマット

Prettier, ESLint, Stylelint を使った静的構文解析と自動フォーマットを実行します。

```sh
# チェックのみ

## Prettier
yarn lint:prettier

## ESLint
yarn lint:script

## Stylelint
yarn lint:style

# 自動修正込みの全部入り
yarn lintfix
```

## 環境変数

`.env.*` ファイルに環境変数を設定できます。`.env.local` はローカル開発時に優先的に読み込まれるので、ローカル開発環境でのみ使用する環境変数は、このファイルに指定してください（`.env.local.example` を複製後リネームしてください）。

## ビルド

```sh
yarn build
```
