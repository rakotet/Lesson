//Это называют замыкание функции, то есть для каждой функции CounterA и CounterB свой createCounter со своим отдельным counter

var createCounter = function(counterName) {

    var counter = 0

    return {
        increment: function() {
            counter++
        },

        decrement: function() {
            counter--
        },

        getCounter: function() {
            return counter
        }
    }
}

var counterA = createCounter('Counter A')
var counterB = createCounter('Counter B')

console.log(counterA.increment())
console.log(counterA.increment())
console.log(counterA.increment())
console.log('-------------------------')
console.log(counterB.decrement())
console.log(counterB.decrement())

