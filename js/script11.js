// При создании объекта сначала пишем ключь, через двоеточие его значение. Объкт может содержать любые свойства в том числе и методы.

var person = {
    name: 'Василий',
    year: 1990,
    family: ['Елена', 'Игорь'],
    car: {
        year: 2010,
        model: 'Ford'
    },
    calculatAge: function() {
        var age = 2018 - this.year
        console.log('Возраст: ', age)
    }
}

console.log(person)
console.log(person.name) // обращаемся к одному из свойств объекта
console.log(person['year']) // обращаемся к одному из свойств объекта
var field = 'car'
console.log(person[field].year)

person.year = 1993 // меняем значение свойства объекта

console.log(person.year)

person.calculatAge()