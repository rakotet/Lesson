var divs = document.querySelectorAll('div')
var link = document.querySelector('a')

for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', function(event) /**Создаём массив с параметрами этого клика мыши*/ {
        event.stopPropagation()//останавливаем событие клика на первом элементе
        console.log(this.getAttribute('id'))
    }, false) // Третий параметр если true отменяет погружение и делает всплытие (в js все события по умолчанию работают от верхнего элемента к нижниму - погружение)
}

link.addEventListener('click', handleLinkClick)

function handleLinkClick(event) {
    event.preventDefault() //Метод обнуляет ссылку и она ни куда не видет

    var div = divs[0]

    //Проверяем стиль блока, если стиля нет присваеваем flex, если есть убираем стиль.
    if (div.style.display === 'none') {
        div.style.display = 'flex'
    } else {
        div.style.display = 'none' 
    }

    console.log(div.style.display)
}
