[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/ShcherbinaNick/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/ShcherbinaNick/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

Разработка сервера для проекта Mesto, задействующая Express.js и MongoDB.
Ссылка на репозиторий для автотестов: https://github.com/ShcherbinaNick/express-mesto-gha

## Upd: 14-я проектная работа

В 14-й работе добавлены централизованная обработка ошибок, регистрация и авторизация пользователей, доработаны контроллеры, осуществлена валидация при помощи Joi и Celebrate

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
