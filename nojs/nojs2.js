// Что бы запустить js код в node.js нужно открыть терминал в папке где находится js файл и ввести команду: node имя файла (в нашем случае node nojs2.js)
// Большинство глобальных объектов которые присутствовали в браузере так же есть и в node.js
// В node.js есть встроенные модули которые можно импортировать сразу в наш скрипт


const now = new Date().toLocaleString() // записуем в переменную локальную дату клиента

console.log(now)
console.log(Math.random())

const data = ` 
    Hello from NodeJS
    I am random text!
`

const fs = require('fs') // импортирование втроенного модуля node.js, через метод require где fs это название модуля, fs отвечает за работу с файлами, у него есть свои ф-и

fs.writeFileSync('nodejs.txt', data) // ф-я создает файл, где 1 это имя файла, 2 его содержание

const result = fs.readFileSync('nodejs.txt', {encoding: 'utf-8'}) // ф-я читает содержимое файла и возвращает значение, 1 имя файла, 2 объект конфигурации (encoding - в каком формате читать файл)
console.log(result)

// В node.js есть свои глобальные переменные 

console.log(__dirname) // __dirname глабальная переменная которая обозначает путь до текущей папки
console.log(__filename) // __filename глабальная переменная которая обозначает путь и имя текущего файла