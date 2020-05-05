function sayHelloTo (name) {
    console.log('Привет ' + name)
}

sayHelloTo('Елена')

//Другой способ создания функции через переменную. Но есть разница, до объявления функции в переменной её нельзя вызвать.
var sayHello = function (name) {
    console.log('Привет ' + name)
}

sayHello('Игорь')