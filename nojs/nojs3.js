// Что бы запустить сервер в консоле папки проэкта пишем node nojs3 (имя нашего скрипта)
// Но если мы внесем изменение в скрипт сервера, то что бы изменения приминились
// Сервер надо остановить нажав ctr + C и запустить его заново node nojs3
// Это не удобно, и для автоперезапуска сервера с изменениями нами уже установлен пакет nodemon
// Для запуска сервера через nodemon в консоле пишем команду nodemon nojs3 (имя нашего скрипта)

// У нас есть файл package-lock.json в нем есть поле scripts в которое мы можем заносить команды управления нашем сервером
// Сейчас мы занести две команды "start": "nodemon nojs3.js", "prod": "node nojs3.js"
// Что бы выполнять эти команды в консоле папки проэкта надо писать npm run start или prod или любое имя команды которое мы потом добавим
// Это очень удобно и сильно сокращает время набора команд, по сути любую длинную команду можно вызвать одним словом

// Что бы запустить наш сервер пишем npm run start и в браузере открываем http://localhost:3000/




// Код ниже и есть наш написанный сервер на node.js

const express = require('express') // подключаем модуль в наш скрипт (сервер обрабатывающий запросы)
const bodyParser = require('body-parser') // подключаем модуль body-parser
const weatherRequest = require('./requests/weather.requests') // импортируем написанный нами модуль в данный скрипт (через относительный путь)

const app = express() // переменная отвечающая за всё приложение, в неё записывается результат работы ф-и express

app.set('view engine', 'ejs') // это настройки express, где мы говорим что по умолчанию у нас идут файлы ejs
app.use(express.static('public')) // указываем express в какой папке лежат статические файлы (в нашем случае css) и только теперь в файле ejs заработает подключенный css файл
app.use(bodyParser.urlencoded({extended: true})) // подключаем функционал для парсинга body

app.get('/', (req, res) => { // Обрабатываем GET запрос! 1 передаём роут, 2 передаём ф-ю которая будет отвечать на запрос пользователя (в нашем случае просто браузера который делает GET запрос)
    res.render('index', {weather: null, error: null}) // любая страница с роутом "/" будет рендерится через index.ejs (res.render по умолчанию ищет файлы ejs в папке views)
})

app.post('/', async (req, res) => { // обрабатываем POST запрос
    const {city} = req.body // использую деструктаризацию записываем в переменную значение нашей формы отправленное на сервер

    const {weather, error} = await weatherRequest(city) // передаем в нашу импортированную ф-ю значение полученное из формы (город)
    
    res.render('index', {weather, error}) // возвращает отрендеренную страницу
}) 

app.listen(3000, () => { // 1 указываем порт который будет слушать наше приложение, 2 передаем ф-ю
    console.log('Server has started on port 3000...')
}) 




