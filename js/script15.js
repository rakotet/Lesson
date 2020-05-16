var button = document.querySelector('button')//Получаем доступ до элементов
var h1 = document.querySelector('h1')
var input = document.querySelector('input')

function buttonHeandler() {
    console.log('Кликаю!!!!')
    h1.textContent = input.value
}

button.addEventListener('click', buttonHeandler)//вызываем слушатель событий с свойством "click" и метод который будет исполняться по событию, метод без () иначе вызовится без нажатия

h1.addEventListener('mouseenter', function() {//Еще один способ вызова функции в событии (создается анонимная функция)
    console.log('Mouse has entered h1')
    this.style.color = 'red'
    this.style.backgroundColor = 'black'
})

h1.addEventListener('mouseleave', function() {
    console.log('Mouse has left h1')
    this.style.color = 'black'
    this.style.backgroundColor = 'transparent'
})