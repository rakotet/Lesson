setTimeout(function() { // запускает ф-ю переданную в первый аргумент через время переданное во второй аргумент в миллисекундах 
    console.log('Hello Timeout');
}, 2000);

let counter = 0;

let interval = setInterval(function() { // запускает ф-ю переданную в первом аргументе, каждые N секунд указанные во втором аргументе
    console.log(++counter);
}, 3000);

setTimeout(() => {
    clearInterval(interval); // останавливаем выполнение setInterval через 7 секунд
}, 7000);