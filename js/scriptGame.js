var $start = document.querySelector('#start')//Получаем доступ к элементу с id start
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')

var score = 0 //переменная для записи счета сликнутых квадратов
var isGameStarted = false //изначальное состояние игры

$start.addEventListener('click', startGame)//Вешаем слушатель на нажатие на этот элемент (button)
$game.addEventListener('click', handleBoxClick)

function startGame() {
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    $start.classList.add('hide')//Добавляем в элемент еще один класс (hide - описан в css файле)

    var interval = setInterval(function() {//Выполнять код функции через указанное время во втором аргументе в мили секундах
        var time = parseFloat($time.textContent) //Получаем значение элемента span id time в формате float

        if(time <= 0) {// если время 0 то заканчиваем игру, если нет обновляем таймер
            clearInterval(interval) //останавливаем переданный интервал
            endGame() //end game
        } else {
            $time.textContent = (time - 0.1).toFixed(1) //обратный отсчет на таймере, toFixed оставляет столько знаков после запятой, сколько указанно в аргументе метода
        }
    }, 100)

    renderBox()
}

function endGame() {
    isGameStarted = false
    $start.classList.remove('hide') //Удаляем класс из атрибутов элемента
    $game.style.backgroundColor = '#ccc' // Возвращаем цвет элементу game
    $game.innerHTML = '' // очищаем контейнер (блок div#game)

}

function handleBoxClick(event) {
    if (isGameStarted) {
        if(event.target.dataset.box) { //Если нажали на созданный div то возвращает true
        score++ //При клике на квадрат увеличиваем переменную на 1
        renderBox()
    }
}
    
}

function renderBox() {//функция которая создаёт квадраты(элементы div)
    
    $game.innerHTML = '' // очищаем контейнер (блок div#game)
    var box = document.createElement('div')//Метод глобального элемента, который создает новые html элементы
    var boxSize = getRandom(30, 100)//случайная сторона квадрата div
    var gameSize = $game.getBoundingClientRect()//Возвращает объект с полями свойств блока game
    var maxTop = gameSize.height - boxSize //Максимально возможное и случайное отклонение внутри блока game
    var maxLeft = gameSize.width - boxSize
    

    box.style.height = box.style.width = boxSize + 'px'//ширина и высота блока div
    box.style.position = 'absolute'//Положение в блоке родителя
    box.style.backgroundColor = '#000'//цвет блока
    box.style.top = getRandom(0, maxTop) + 'px'// отступы от родительского элемента
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'//изменяет курсор при наведении на элемент
    box.setAttribute('data-box', 'true')//добавляем атрибут в созданный блок div

    $game.insertAdjacentElement('afterbegin', box)//метод добавляет элемент в DOM дерево
}

function getRandom(min, max) {//метод возвращает случайное целое число между заданным диапазоном
    return Math.floor(Math.random() * (max - min) + min)//округляем случайное число
}