// В js в массиве могут лежать любые типы данных (строки, числа, другие массивы, объекты....)

var cars = [
    'Ford',
    'Mazda',
    'Kia',
    'BMW'
]

var any = [42, 'Apple', { a: 1 }]

console.log(cars)
console.log(any)
console.log(cars[1]) // выводим определенный элемент массива

console.log(cars.length) // Возвращает длину массива

cars.push('Audi') //Метод добавляющий новый элемент в конец массива
console.log(cars)

var audi = cars.pop() //Удаляет последний элемент массива и возвращает его
console.log(cars, audi)

var ford = cars.shift() //Удаляет и возвращает первый элемент массива
console.log(cars, ford)

cars.unshift(audi) //Додавляет элемент в начало массива
console.log(cars)

var index = cars.indexOf('Kia') // Находим индекс элемента Kia в массиве
var kia = cars[index]
console.log(kia)