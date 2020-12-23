import React from 'react' // подключаем реакт
import {render} from 'react-dom'
import AppService from '../modules/app.service' // импортируем класс из другого файла (по дефолту)
import {config} from '../modules/config' // импортируем модуль (config) из другого js файла указывая его относительный путь (обычный экпорт)
import App from './App' // подключаем написанный нами модкль реакта
import '../modules/ts.module' // подключаем ts файл в наш проэкт
import './css/index.css' // подключаем css файл в наш проэкт
import './less/index.less' // подключаем less файл в наш проэкт
import './scss/index.scss' // подключаем scss файл в наш проэкт

console.log('Config key:', config.key)

const service = new AppService('Hello world!')
service.log()

render(<App/>, document.getElementById('app'))