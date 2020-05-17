var str = '1,3,5,2,4'

var array = str.split(',') //Создаёт массив из строки, в аргументе метода указываем знак разделяющий элементы массива в строке

console.log(array)
var s = array.join(';')// Создаёт из массива строку, разделяя элементы знаком указанном в аргументе метода
console.log(s)
console.log(array.reverse())//Меняет порядок элементов массива (от последнего к первому)
array.splice(1, 2) // Вырезает элементы массива, первый аргумент индекс массива с которого начинаем, второй количество элементов
array.splice(1, 0, '33')//Вставляет 33 на 1 индекс элемента в массив
console.log(array)

var newArray = array.concat([1, 2])// Без аргументов просто кланирует массив, с аргументами объединяет массивы
console.log(newArray)

var objArr = [
    {name: 'Max', age: 27},
    {name: 'Elena', age: 18},
    {name: 'Vector', age: 20}
]

var foundPerson = objArr.find(function(person) { //Поиск объекта в массиве по заданному полю объекта
    return person.name === 'Elena'
})
console.log(foundPerson);

var oddArray = [1,2,3,4,5,6,7,8,9].filter(function(i) {// Если условие true возвращает этот элемент массива
    return i % 2 !== 0
})
console.log(oddArray)

console.log(array)

var numArray = array.map(function(i){//Переводм каждый элемент массива в int и умножаем его на 2
    return parseInt(i) * 2    
})

console.log(numArray)


