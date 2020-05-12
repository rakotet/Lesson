var a = document.querySelector('a')
var oldHref = a.getAttribute("href") //получаем значение атребута ссылки href

a.setAttribute('href', 'https://ya.ru') // меняем значение атребута на другое (любого указанного атребута)
a.setAttribute('title', 'Go Yandex')
a.textContent = 'Yandex' // меняем наполнение внутри тега <a></a>

console.log()
