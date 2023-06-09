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