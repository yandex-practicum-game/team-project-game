# Запуск проекта

## Запуск в production

1. Проверить .env:

```
  CLIENT_PORT=3001
  SERVER_PORT=3000
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=postgres
  POSTGRES_DB=postgres
  POSTGRES_HOST=postgres
  POSTGRES_PORT=5432
  DATABASE_URL="postgresql://postgres:postgres@${POSTGRES_HOST}:5432/postgres"
```

2. docker-compose build
3. docker-compose up

## Запуск в dev

1. Проверить .env:

```
  CLIENT_PORT=3001
  SERVER_PORT=3000
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=postgres
  POSTGRES_DB=postgres
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  DATABASE_URL="postgresql://postgres:postgres@${POSTGRES_HOST}:5432/postgres"
```

2. выполнить команду yarn bootstrap
3. docker-compose up
4. если postgres не установлен локально, запустить postgres в контейнере: docker compose up postgres , перед этим запустить Docker
5. применить миграцию к базе данных: npx prisma migrate dev
6. сгенерировать модели: npx prisma generate
7. запустить сервер: yarn dev:server

Клиент запускать не надо, так как у нас ssr, заходим по порту где запустился сервер

Таблицы для базы данных прописываем в prisma/schema.prisma. После чего cоздаем их в базе через создание миграций npx prisma migrate dev. npx prisma generate сгенерирует модели для @prisma/client, после чего должна быть подсветка синтаксиса. Если ее нет, значит глючит vscode, либо закройте откройте файл, либо закройте откройте vscode, либо зайдите в @prisma/client в модели и сохранитесь.
