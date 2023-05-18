### Запуск проекта

```
  1. запустить Docker
  2. в файл .env добавить DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
  3. выполнить yarn bootstrap
  4. если postgres не установлен локально, запустить postgres в контейнере: docker compose up postgres
  5. сгенерировать таблицы базы данных: npx prisma migrate dev
  6. запустить сервер: yarn dev:server
```

Клиент запускать не надо, так как у нас ssr, заходим по порту где запустился сервер

Таблицы для базы данных прописываем в prisma/schema.prisma. После чего генерируем их в базе через создание миграций npx prisma migrate dev
