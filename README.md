# Docker Node MongoDB DEMO

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
