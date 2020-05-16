//Кликаем по элементу 'p' и он красится в синий
//Но это медленный способ через цикл
/*
var p = document.querySelectorAll('p')

for (var i = 0; i < p.length; i++) {
    p[i].addEventListener('click', function(event) {
        event.target.style.color = 'blue'
    })

}
*/
//Ниже более быстрый (в скорости работы программы) способ этой же задачи

var wrapper = document.getElementById('wrapper') //Старый метод обращения к элементу, но самый быстрый
wrapper.addEventListener('click', function (event) {

    var tagName = event.target.tagName.toLowerCase() // Возвращает имя тега на который мы щелкнули мышью в нижнем регистре

    if (tagName === 'p') { // Если мы кликнули ра элемент 'p' то true
        event.target.style.color = 'blue' // и сменить его цвет на синий
    }

    if (event.target.classList.contains('color')) { // Если кликлуни на элемент с классом 'color' то true
        event.target.style.color = 'red'
    }

    console.log(tagName)
    
})