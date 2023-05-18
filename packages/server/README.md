### Запуск проекта

```
  1. в файл .env добавить DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
  2. выполнить команду yarn bootstrap
  3. если postgres не установлен локально, запустить postgres в контейнере: docker compose up postgres , перед этим запустить Docker
  4. сгенерировать таблицы базы данных: npx prisma migrate dev
  5. запустить сервер: yarn dev:server
```

Клиент запускать не надо, так как у нас ssr, заходим по порту где запустился сервер

Таблицы для базы данных прописываем в prisma/schema.prisma. После чего генерируем их в базе через создание миграций npx prisma migrate dev
