### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`

Чтобы server смог подключиться к postgres внутри контейнера, замените в .env POSTGRES_HOST на 'postgres'.

`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Отчет об утечках памяти
Отчет по исследованию веб-приложения [galaxian-game](https://galaxian-game.vercel.app/) на наличие утечек памяти.

Для тестирования использовался инструмент Chrome DevTools. Были открыты следующие вкладки: "Memory", "Performance", "Network".

1. Вкладка "Memory".
Был произведен первый снимок памяти при запуске приложения, после 3-х минут игры и после 10 минут игры. 
В результате не было обнаружено значительного роста потребления памяти после продолжительной игры. После тестирования приложенния скриншотами была попытка обнаружения утечек памяти при помощи записи
распределения пятми на определенном интервале. Потребление памяти было на нормальном уровне.
2. Вкладка "Performance".
Были произведены замеры производительности приложения при запуске и во время игры.
Наблюдался стабильный FPS и время рендеринга в пределах допустимого значения.
3. Вкладка "Network".
С помощью данного инструмента были произведены измерения времени загрузки страницы и файлов приложения.
Не было обнаружено долгих запросов или повторяющихся запросов на сервер.

Общее количество запросов при запуске приложениия: 132, из них 3.3 MB занимают ресурсы.

Исходя из проведенного исследования, можно сделать вывод о том, что приложение [galaxian-game](https://galaxian-game.vercel.app/) не имеет выраженных утечек памятии и работает на уровне, соответствующем общим требованиям безопасности и производительности.
