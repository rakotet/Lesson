// Client -> Server -> DataBase -> Server -> Client

console.log('Клиент: хочу получить список пользователей');
console.log('...');

setTimeout(() => {
    console.log('Сервер: запрашиваю список пользователей в БД');
    console.log('...');

    setTimeout(() => {
        console.log('БД: формирую список пользователей');
        console.log('...');

        setTimeout(() => {
            console.log('Сервер: трансформирую данные для клиента');
            console.log('...');

            setTimeout(() => {
                console.log('Клиент: получил данные и отображаю их');
                console.log('...');
            }, 1000);
        }, 500);
    }, 500);
}, 1000);

