//Object самый глобальный объект в JS 
//Особенности данного метода создания объектов: Поля меняют значение только через get и set
var ford = Object.create({ //оба параметра являются объектами, первый параметр прототип объекта, второй его описание и свойства
    calculateDistancePerYear: function() { //функция считает пробег машины за год
        Object.defineProperty(this, 'distancePerYear', { //Способ добавить объекту ford свойство distancePerYear через глобальный объект Object.  1 параметр иия объекта, 2 название нового свойства, 3 значение этого свойства задается через объект с ключами value и так далее 
            
            value: this.distance / this.age,
            enumerable: false, //делаем свойство не видимым для цикла внизу 
            writable: false,
            configurable: false
        })
    }
}, { //описание свойств идет тоже щерез объект (можно указывать дополнительные свойства value, enumerable, writable, configurable, get и set) (более тонкая настройка объекта)
    name: {
        value: 'Ford',//значение поля объекта
        enumerable: true,//делает поля видимыми (false не видимыми)
        writable: false,//не можем изменять (tru что бы могли)
        configurable: false //не можем удалить это поле (tru что бы могли)
    },
    model: {
        value: 'Focus',
        enumerable: true,
        writable: false,
        configurable: false
    },
    year: {
        value: 2015,
        enumerable: true,
        writable: false,
        configurable: false
    },
    distance: {
        value: 120500,
        enumerable: true,
        writable: true,
        configurable: false
    },
    age: {
        enumerable: true,
        get: function() { //возвращаем актуальный возраст ford в зависимости от значения ключа year
            console.log('Получаем возраст');
            return new Date().getFullYear() - this.year
        },
        set: function() {
            console.log('Устанавливаем значение');
            
        }
    }
})

ford.calculateDistancePerYear() //вызываем метод который добавляет еще одно поле объекта ford 

for (var key in ford) { //Пройтись по всем полям объекта в том числе и по прототипу (можно использовать в масссивах)
    if (ford.hasOwnProperty(key)) { //Метод проверяет есть ли указанное поле в объекте, но не в прототипе (Убираем из проходки поля прототипа)
        console.log(key, ford[key]) //Выводим ключ - значение объекта 
    }
    
}
//Более новый способ обращаться к ключам объектов

var keys = Object.keys(ford)//Возвращаем массив ключей объекта
console.log(keys)

Object.keys(ford).forEach(function(kye) {//возвращает значение ключей массива// не идет по протатипу
    console.log(ford[kye]);
})

