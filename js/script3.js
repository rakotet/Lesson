//Создаем числовые переменные
var num1 = 12
var num2 = 8
//Выводим в консоль простые операции с этими переменными
console.log('num1 + num2 = ', num1 + num2)
console.log('num1 - num2 = ', num1 - num2)
console.log('num1 * num2 = ', num1 * num2)
console.log('num1 / num2 = ', num1 / num2)
//Создаём строковые переменные
var str1 = 'Hello'
var str2= 'World'

console.log('str1 + str2 = ', str1 + ' ' + str2)
//Складываем число и строку (получается строка)
console.log(1 + '2')
//Складываем Boolean и строку (получается строка)
console.log(true + str2)
//Складываем Boolean(true = 1, false = 0) и число (Получается число)
console.log(true + 1)
console.log(false + 1)

//Приоритет операций

var result = 12 - 6 / 3
console.log('Result = ', result)
// С Boolean переменной
var isGreater = 20 - 6 * 3 >= 4
console.log('isGreater = ', isGreater)

//Остаток от деления (С помощью него отпереляют четное или нечетное число)

console.log('8 % 3 = ', 8 % 3 )

//Синтаксис присвоения в js
var i = 1
i = i + 1 //Равносильно i++
console.log('i = ', i)
i = i - 1 //Равносильно i--
console.log('i = ', i)

i = i + 3 //Равносильно i += 3 (Работает с + - * /)

//Префикс и посфикс
console.log('i = ', i++)// Сначала выводит значение i, а только потом делает +1
console.log('i = ', ++i)// Сначала делает +1, потом выводит значение

