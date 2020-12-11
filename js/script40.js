// ф-я sleep делает задержку выполнения скрипта на значение переданное в аргументе в миллисекундах

function sleep(ms) {
    return new Promise(function(resolve) { // возвращаем промис как результат работы ф-и sleep
        setTimeout(function() {
            resolve()
        }, ms)
    })
}

sleep(1500).then(function() {
    console.log('1500')
})

sleep(3000).then(function() {
    console.log('3000')
})

Promise.all([sleep(1500), sleep(3000)]) // метод all глабального объекта Promise принимает в себя массив промиссов и возвращает так же промисс, нужет для того что бы переданные промисы закончили свою работу одновременно
.then(function() {
    console.log('All')
})

Promise.race([sleep(1500), sleep(3000)]) // метод race глабального объекта Promise принимает в себя массив промиссов и возвращает так же промисс, отрабатывает только тот промисс который выполнился первым
.then(function() {
    console.log('race')
})

let p1 = sleep(3500).then(function() {
    return {
        name: 'Promise 3500'
    }
})

let p2 = sleep(4500).then(function() {
    return {
        name: 'Promise 4500'
    }
})

async function start() {
    
}

Promise.all([p1, p2]).then(function(data) { // data это массив объектов с результатами выполнения всех промисов 
    console.log('All', data)
})

Promise.race([p1, p2]).then(function(data) { // data это массив объектов с результатом выполнения первого выполневшегося раньше всех промиса
    console.log('race', data)
})