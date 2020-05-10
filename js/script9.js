console.log(42)
console.log(-42)
console.log(1.5)
console.log(-8 / 3)
console.log(0xab) // Шестнадцатиричное число.
console.log(2e3) // 2000 (основание 2 умножаем на 10 три раза)
console.log(NaN) // not a number (является числом) (можно получить при неправильном делении)
console.log(123 / 0) // infinity (получаем бесконечность)

var fortyTwo = 42
var delta = -8 / 3

console.log(fortyTwo.toString()) // Переводит число в строку
console.log(delta.toFixed(3)) //Округляет количество знаков после запятой, до заданного значения аргумента метода, и переводит в строку
console.log(+delta.toFixed(3)) // + Перед вызовом означает, что нужно привести результат к числу а не к строке
console.log(parseFloat(delta.toFixed(2))) // Метод переводит строку в float число

console.log(isNaN(NaN)) // True, метод определяет not a number
console.log(isNaN('34')) // false, для всего кроме NaN

console.log(isFinite(1 / 0)) //False Метод определяющий бесконечность
console.log(isFinite(999999)) //True