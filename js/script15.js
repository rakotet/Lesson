var button = document.querySelector('button')//Получаем доступ до элементов
var h1 = document.querySelector('h1')
var input = document.querySelector('input')

function buttonHeandler() {
    console.log('Кликаю!!!!')
    h1.textContent = input.value
}

button.addEventListener('click', buttonHeandler)//вызываем слушатель событий с свойством "click" и метод который будет исполняться по событию, метод без () иначе выховится без нажатия

