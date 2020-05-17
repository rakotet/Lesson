console.log(Math.random())// Возвращает случайное число

var num = 2.4

console.log(Math.floor(num)) // округляет число
console.log(Math.ceil(num))// Округляет число в большую сторону

//Json глобальный объект позволяющий перводить объекты в строки

var person = {
    name:'Max',
    age:18,
    car: {
        model:'Ford'},
    job:'Frontend',
    friends:['Elena','Igor']
}
console.log(JSON.stringify(person))//С помощью глобального объекта JSON и его метода stringify переводим объект person в строку

var str = JSON.stringify(person)

console.log(JSON.parse(str))// Переводим строку обратно в объект (формат JSON)




