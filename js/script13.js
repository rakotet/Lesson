// Получаем доступ к элементам HTML через глобальный объект document и его методы (устаревшие способы)
// var div = document.getElementById('playground')
// var p = document.getElementsByClassName('text')
// var h1 = document.getElementsByTagName('h1')

// console.log(div)
// console.log(p)
// console.log(h1)


// Более новые методы (правила как в CSS)
var div = document.querySelector('#playground')
var p = document.querySelectorAll('.text')
var h1 = document.querySelector('h1')
var ul = document.querySelector('#playground > div ul') // Получаем доступ ко второму списку на странице

console.log(div)
console.log(p)
console.log(h1);
console.log(ul);