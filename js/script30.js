const createCar = (name, model) => {
    // return { /*как писали раньше*/
    //     name: name,
    //     model: model
    // }
    return {name, model}; // если названия аргументов совпадают с названиями свойства объекта и его значением, то можно так записывать более кратко
};

const ford = createCar('Ford', 'Focus');

console.log(ford);

const yearField = 'year';

const bmw = {
    name: 'BMW',
    ['model']: 'X6 Sport', // димамическое поле объекта (можем генерировать название)
    [yearField]: 2018, // динамические поля в объекте можно задавать так же через переменные

    logFields() { // синтаксис ES6 для создание методов в объекте (вместо function название ф-и () {})
        //console.log(this.name, this.model, this.year);
        const {name, year, model} = this; // используем деструктаризацию (выносим this и применяем его к нужным полям, что бы дольше обращаться к ним без this)
        console.log(name, model, year);
    }
}

console.log(bmw);
bmw.logFields();

const {year} = bmw; // еще один пример деструктаризации (часто применяется в модулях)
console.log(year);