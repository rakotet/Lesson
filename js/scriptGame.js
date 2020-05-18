var $start = document.querySelector('#start')//Получаем доступ к элементу с id start
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var colors = ['red', 'blue', 'green', 'yellow', 'pink', 'black']//список цветов (массив)
var score = 0 //переменная для записи счета кликнутых квадратов
var isGameStarted = false //изначальное состояние игры

$start.addEventListener('click', startGame)//Вешаем слушатель на нажатие на этот элемент (button)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)//слушаем поле ввода input

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0 //обнуляем счет
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')//блокируем окно ввода
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)//Добавляем в элемент еще один класс (hide - описан в css файле)

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

function setGameScore() {
    $result.textContent = score.toString()//записываем счет в элемент 
}

function setGameTime() {
    var time = parseInt($gameTime.value)//Приводим число с input в int и записываем в переменную time
    $time.textContent = time.toFixed(1) //округляем до одного знака после запятой
    show($timeHeader)//делаем элемент видимым
    hide($resultHeader)//делаем элемент не видимым
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')//разблокируем окно ввода
    show($start) //Удаляем класс из атрибутов элемента
    $game.style.backgroundColor = '#ccc' // Возвращаем цвет элементу game
    $game.innerHTML = '' // очищаем контейнер (блок div#game)
    hide($timeHeader)
    show($resultHeader)

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
    var randomColorIndex = getRandom(0, colors.length)//случайный индекс массива

    box.style.height = box.style.width = boxSize + 'px'//ширина и высота блока div
    box.style.position = 'absolute'//Положение в блоке родителя
    box.style.backgroundColor = colors[randomColorIndex]//цвет блока
    box.style.top = getRandom(0, maxTop) + 'px'// отступы от родительского элемента
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'//изменяет курсор при наведении на элемент
    box.setAttribute('data-box', 'true')//добавляем атрибут в созданный блок div

    $game.insertAdjacentElement('afterbegin', box)//метод добавляет элемент в DOM дерево
}

function getRandom(min, max) {//метод возвращает случайное целое число между заданным диапазоном
    return Math.floor(Math.random() * (max - min) + min)//округляем случайное число
}