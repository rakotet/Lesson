// Новый способ создания функций (стрелочных функций) (старый через ключевое слово function)
//Можно через let но лучше const

const calculateAge = (year) => {
    const current = new Date().getFullYear()
    return current - year
}

console.log(calculateAge(1993))

//Тоже самое но короче

const getAge = year => new Date().getFullYear() - year //если функция принимает только 1 параметр можн оне писать (), если далее только одна строчка кода можно не писать {}

console.log(getAge(1970))

//Отличие стрелочных функций, ОНИ НЕ СОЗДАЮТ СВОЕГО КОНТЕКСТА (можно обращаться к объекту из функции в функции через this)

const person = {
    age: 25,
    firstName: 'Maxim',
    logNameWithTimeout() {
        setTimeout( () => { //через 1 секунду выводим имя 
            console.log(this.firstName)
        }, 1000)
    }
}

