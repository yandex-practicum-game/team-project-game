### Запуск проекта

```
  1. в файл .env добавить DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
  2. выполнить команду yarn bootstrap
  3. если postgres не установлен локально, запустить postgres в контейнере: docker compose up postgres , перед этим запустить Docker
  4. применить миграцию к базе данных: npx prisma migrate dev
  5. сгенерировать модели: npx prisma generate
  6. запустить сервер: yarn dev:server
```

Клиент запускать не надо, так как у нас ssr, заходим по порту где запустился сервер

Таблицы для базы данных прописываем в prisma/schema.prisma. После чего cоздаем их в базе через создание миграций npx prisma migrate dev. npx prisma generate сгенерирует модели для @prisma/client, после чего должна быть подсветка синтаксиса. Если ее нет, значит глючит vscode, либо закройте откройте файл, либо закройте откройте vscode, либо зайдите в @prisma/client в модели и сохранитесь.
