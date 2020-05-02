//Условные операторы

//Создаём переменный
var currentYear = 2018
var carName = 'Ford'
var carYear = 2008
var carAge = currentYear - carYear
    //Задаём условия
if (carAge < 5) {
    console.log(carName + ' младше 5 лет')
} else if (carAge >= 5 && carAge <= 10) {
    console.log(carName + ' больше или равен 5 годам, но меньше или равен 10 годам')
} else {
    console.log(carName + ' не в ходит в заданный диапозон')
}

//Некоторые моменты с условными операторами
//С 0 в условии получаем false, с 1 true, null false, undefined false, Пустая строка false, NaN false, Текст true, число тоже true
if (0) {
    console.log('Значение true')
} else {
    console.log('Значение false')
}

if (1) {
    console.log('Значение true')
} else {
    console.log('Значение false')
}

if (null) {
    console.log('Значение true')
} else {
    console.log('Значение false')
}

if (undefined) {
    console.log('Значение true')
} else {
    console.log('Значение false')
}

if ('') {
    console.log('Значение true')
} else {
    console.log('Значение false')
}
if (NaN) {
    console.log('Значение true')
} else {
    console.log('Значение false')
}

//Тернарные операторы (краткая запись if else)
4 ? console.log('Значение true') : console.log('Значение false')