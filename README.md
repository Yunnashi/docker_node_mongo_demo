# Docker Node MongoDB DEMO

この API の説明

TODO アプリの基本 CRUD API サーバーです

## RUST の内容

GET /todos - ToDo 一覧を取得

POST /todos - 新しい ToDo を作成

GET /todos/:id - 特定の ToDo を一つ取得

PUT /todos/:id - 特定の ToDo を更新

DELETE /todos/:id - 特定の ToDo を削除

## Quick Start 起動方法

```bash
# Build in Docker
docker compose up -d --build
# use -d flag to run in background

# Tear down
docker compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker compose build
```

## mongoDB の使い方メモ

Docker 起動後、mongo コンテナ内に入る

```
docker exec -it mongo bash
```

mongo shell の起動、以下のコマンドを実行

```
mongosh
```
