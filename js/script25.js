var person = {
    age: 28,
    name: 'Max',
    job: 'Frontend',
    displayInfo: function(ms) {

        var self = this //this = person = self

        setTimeout(function() { //функция задержки(таймаута) первый параметр исполняемая функция, второй время через сколько исполнить
        console.log('Name: ', self.name) //обращаемся именно к salf потому как внутри функции у функции объект person уже не доступен через this
        console.log('Job: ', self.job)
        console.log('Age: ', self.age)
        }, ms)
    }
}

person.displayInfo(5000)

//ниже тоже самое но другим способом

var person1 = {
    age1: 281,
    name1: 'Max1',
    job1: 'Frontend1',
    displayInfo1: function(ms1) {

        setTimeout(function() { //функция задержки(таймаута) первый параметр исполняемая функция, второй время через сколько исполнить
        console.log('Name1: ', this.name1) //обращаемся именно к salf потому как внутри функции у функции объект person уже не доступен через this
        console.log('Job1: ', this.job1)
        console.log('Age1: ', this.age1)
        }.bind(this), ms1) //Метод bind привязывает (контекст) функцию к объекту (person через this)
    }
}

person1.displayInfo1(5000)

console.log('\n');
console.log('\n');
console.log('\n');
console.log('\n');


//Урок привязка контекста

function printObject(objName) {
    console.log('Printing object: ', objName)
    for(var key in this) {
        if(this.hasOwnProperty(key)) {
            console.log('[' + key + ']', this[key])
        }
    }
}

var person3 = {
    firstName3: 'Max3',
    job3: 'Backend3',
    age3: 23,
    friends3: ['Elena3', 'Igor3']
}

var car3 = {
    name3: 'Ford3',
    model3: 'Focus3',
    year3: 2013
} 


var printPerson = printObject.bind(person3)//bind привязывает контекст
printPerson('Person3')

printObject.call(car3, 'Car3')//делает тоже что и bind но при этом сразу вызывает футкцию

printObject.apply(car3, ['Car3'])//делает тоже что и call