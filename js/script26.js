var a = [1, 2, 3]
var b = [5, 'Hello', 6]

Array.prototype.double = function() {
    var newArray = this.map(function(item) { //функция map проводит итерацию массива и возвращает при каждой итерации следующий элемент массива (item)
        if(typeof item === 'number') { // typeof определяет тип переменной, если переменная число то выполняем код
            return Math.pow(item, 2) // Удваиваем item и возвращаем его (pow - возведение в степень)
        }

        else if (typeof item === 'string') {
            return item += item
        }
    })

    return newArray
}

var newA = a.double()
var newB = b.double()

console.log('A', newA)
console.log('B', newB)

