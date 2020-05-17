var date = new Date
console.log(date.getFullYear()) //Можем получать через геттеры любые параметры времени и дат, а так же менять их через сеттеры

//localStorage

document.querySelector('button').addEventListener('click', function(event){

    var value = document.querySelector('input').value//Получаем введенную строку в текстовое поле

    var obj = {
        text: value
    }

//Метод setItem глобального объекта localStorage сохраняет в себе информацию в string формате
//первый агрумент метода это название сохраняемой строки, второй то что сохраняем
    localStorage.setItem('headerText', JSON.stringify(obj))// переводи объект в строку
})

document.addEventListener('DOMContentLoaded', function(event){//аргумент слушателя который срабатывает сразу после загрузки DOM дерева
    
   var obj
//Ниже проверка на ошибки, если parse выдаёт ошибку то переходим в блок catch
   try {
       obj = JSON.parse(localStorage.getItem('headerText'))// переводим строку в объект
   } catch (e) {
       obj = {}
   }
   

    if (obj && obj.text && obj.text.trim()) {//проверяем обект(есть ли он), проверяем строку на пустоту, метод trim убирает все лишние пробелы, и если там что то осталось то true
        document.querySelector('h1').textContent = obj.text//Меняем задержимое h1 на сохраненную строку
    }
})

