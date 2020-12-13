// Пример промиса

// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(2)
//     }, 2000)
// })

// promise
//     .then(num => num *= 2)
//     .catch(err => console.log(err))
//     .then(num => numm *= 3)
//     .finally(() => console.log('fimally'))

// Реализуем свой класс с таким же функционалом как у класса промис

class MyPromise {
    constructor(callback) {

        function resolver() {}

        function rejecter() {}

        callback(resolver, rejecter)
    }

    then(cb) {

    }

    catch(cb) {

    }

    finally(cb) {

    }
}