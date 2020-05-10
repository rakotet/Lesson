var str1 = 'Hello World'
var str2 = 'Hello World 2'

var personName = 'Виктор'
var message = 'Человека зовут "' + personName + '"'
var message2 = 'Человека зовут \'' + personName + '\'' // обратный слешь \ экранирует следуший символ после себя

console.log(str1)
console.log(message)
console.log(message2)

var newMessage = "Hello World!!!!!!"

console.log(newMessage.length) // Метод объекта (в js всё объект, даже строка) возвращающий длину строки. 
console.log(newMessage.toUpperCase()) //Метод переводит все символы в верхний регистр
console.log(newMessage.toLowerCase()) //Метод переводит все символы в нижний регистр
console.log(newMessage.charAt(1)) // Возвращает символ номер которого указан в аргументе метода (нумерация идет с 0)
console.log(newMessage.indexOf('World')) // Возвращает номер символа с которого начинается аргумент метода, если такого нет, вернёт -1
console.log(newMessage.substr(1, 4)) // Первый аргумент номер символа с которого начинаем, второй которым заканчиваем, символы между ними возвращаем.
console.log(newMessage.substr(newMessage.indexOf('World'), 5)) // Вернет World
console.log(newMessage.substring(1)) // Аргумент номер символа с которого начинаем, и возвращаем всю строку начиная от него