// Client -> Server -> DataBase -> Server -> Client


// Промисы служат для того что бы оборачивать какой либо асинхронный код 


console.log('Клиент: хочу получить список пользователей');
console.log('...');

// setTimeout(() => {
//     console.log('Сервер: запрашиваю список пользователей в БД');
//     console.log('...');

//     setTimeout(() => {
//         console.log('БД: формирую список пользователей');
//         console.log('...');

//         setTimeout(() => {
//             console.log('Сервер: трансформирую данные для клиента');
//             console.log('...');

//             setTimeout(() => {
//                 console.log('Клиент: получил данные и отображаю их');
//                 console.log('...');
//             }, 1000);
//         }, 500);
//     }, 500);
// }, 1000);

let promise = new Promise(function(resolve, reject) { // создаем объект класса промис и передаем в него ф-ю для асинхронной работы, в ф-я принимает два параметра которые тоже ф-и, resolve вызывается когда завершается асинхронная операция, reject вызывается если произошла какая то ошибка (не ответил сервер или что то в этом духе)
    setTimeout(function() {
        console.log('Сервер: запрашиваю список пользователей в БД');
        console.log('...');
        resolve(); // вызывается когда завершается асинхронная операция без ошибок
    }, 1000);
});

promise.then(function() { // у любого промиса есть три основных метода, then можно последовательно вызывать сколько угодно раз выполняя внутри асинхронные операции
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            let users = [ // создаем массв из объектов (имитируем две записи в базе данных)
                {uid: 'id1', name: 'Maxim'},
                {uid: 'id2', name: 'Elena'}
            ]
            // reject('БД не смогла получить список пользователей') вызовет ошибку (как применять правильно пока не понятно)
            console.log('БД: формирую список пользователей', users)
            console.log('...');
            resolve(users) // передаём массив в ф-ю resolve что бы имет к нему доступ в следующих then
        }, 500)
    })
})
.then(function(dbUsers) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('Сервер: трансформирую данные для клиента')
            console.log('...');
            let users = dbUsers.map(function(user) { // map модифицирует каждый элемент массива через переданную в него ф-ю и возвращает новый уже модифицированный массив
                return {
                    id: user.uid,
                    firstName: user.name,
                    timestamp: Date.now()
                }
            }) 
            resolve(users)
        }, 500)
    })
})
.then(function(users) {
    setTimeout(function() {
        console.log('Клиент: получил данные и отображаю их', users);
    }, 1000)
})

.catch(function(error) { // метод catch служит для обработок ошибок, можно вызывать в любом месте
    console.error(error)
})

.finally(function() { // метод вызывается тогда когда закончатся все асинхронные операции, даже если были ошибки в последовательности then-нов
    console.log('Finally')
})