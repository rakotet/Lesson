document.querySelector('#alert').addEventListener('click', function(event) {
    alert('Вы кликнули по кнопке!!!') // Глобальный метод который вызывает всплывающее окно с текстом написанном в атребуте 
})

document.querySelector('#confirm').addEventListener('click', function(event) {
    var decision = confirm('Вы уверены что хотите нажать?') //Всплывающее окно с кнопками 'да' и 'нет'

    console.log(decision) // При нажании да переменная получает значение true, при нет false

    if (decision) {
        alert('Выкликнули по кнопке')
    } else {
        alert('Выкликнули отменили клик по кнопке')
    }
})

document.querySelector('#prompt').addEventListener('click', function(event) {
    var age = prompt('Введите свой возраст:', 18) //Всплывающее окно с полем для ввода, второй параметр - значение по умолчанию

    if (age >= 18) {
        alert('Можете пройти')
    } else {
        alert('Вы слишком молоды')
    }
})

// Методы консоли

console.log('Вывод в консоль')
console.warn('Предупреждение в консоль')
console.info('Какая то информация в консоль')
console.error('Какая то ошибка')