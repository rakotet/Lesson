import AppService from '../modules/app.service' // импортируем класс из другого файла (по дефолту)
import {config} from '../modules/config' // импортируем модуль (config) из другого js файла указывая его относительный путь (обычный экпорт)
import '../modules/header.component' // импортируем файл в котором нет ни одного экспорта
import './css/index.css' // подключаем css файл в наш проэкт

console.log('Config key:', config.key)

const service = new AppService('Hello world!')
service.log()
