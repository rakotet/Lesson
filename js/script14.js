var a = document.querySelector('a')
var oldHref = a.getAttribute("href") //получаем значение атребута ссылки href

a.setAttribute('href', 'https://ya.ru') // меняем значение атребута на другое (любого указанного атребута)
a.setAttribute('title', 'Go Yandex')
a.textContent = 'Yandex' // меняем наполнение внутри тега <a></a>

console.log()

//Классы

var box1 = document.querySelector('#box1')
var box2 = document.querySelector('#box2')

box1.classList.add('red') //Добавляем еще один класс в влок div
box2.classList.remove('blue')//Удаляем указанный класс и з блока div
var hasClass = box2.classList.contains('box')//Проверяем содержит ли блок указанынй класс
console.log(hasClass)//Получим True т.к. этот класс есть в блоке
