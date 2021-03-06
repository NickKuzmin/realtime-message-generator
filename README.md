**В текущей конфигурации генерация сообщений происходит каждые 5 секунд в количестве в 2 сообщения. Просмотр сообщений доступен по адресу `/messages`.**

**Technologies used:**
- .NET 5.0
- React + Redux
- Typescript
- SignalR

**Technical requirements:**
- *.NET 5.0*
- *NodeJS v.16.13.1*
------------------------------------
**Возможный рефакторинг и доработка:**
- Вынесение в отдельный проект `MessageGenerator.Core` API-модели, репозитория, генератора
- Создание проекта с Unit-тестами `MessageGenerator.UnitTests` (покрытие контроллера, сервиса, генератора)
- Исправление отображения формата даты
- Перенос функциональности страницы `/messages` на главную страницу
- Вынесение в конфигурационные настройки - переодичность генерации сообщений и их количество
- Добавление пейджинга на страницу сообщений
------------------------------------
**Анимированное превью работы страницы:**
![hippo](https://s10.gifyu.com/images/2021-12-24_09h31_00.gif)
