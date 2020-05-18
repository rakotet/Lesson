//Ниже создаём класс(конструктор) в js, название класса(конструктора) пишется с большой буквы в отличии от метода
//Сначала свойства ищутся у объекта, если нужно свойства нет, оно ищится у прототипа объекта
function Car (name, year) {
    this.name = name
    this.year = year
}

Car.prototype.getAge = function() {//добавляем в прототип Car метод getAge и всем дочерним его объектам
    return new Date().getFullYear() - this.year//Вычисляем возраст машины 
}

Car.prototype.color = 'black'//задали еще одно свойство(поле) протопипу класса Car, и это свойство теперь есть у всех прототипов созданных от Car

var ford = new Car('Ford', 2015) //Создали объет ford экземпляр класса Car
ford.color = 'red'//меняем свойства объекта ford
console.log(ford)
var bmw = new Car('BMW', 2017)
console.log(bmw)







