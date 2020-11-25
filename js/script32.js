//Шаблонизация это внутри синтаксиса `${переменная}` выводим переменные и методы js
// `` строки внутри сохраняют все табуляции и пробелы при выводе 

const createLink = ({path, name}) => {
    return `<a target="_blank" href="${path}">${name}</a>`;
}

const ul = document.querySelector('ul');

const google = `<li>${createLink({path: 'https://google.com', name: 'Google'})}</li>`;

const yandex = `<li>${createLink({path: 'https://yandex.ru', name: 'Yandex'})}</li>`;

ul.insertAdjacentHTML('afterbegin', google);
ul.insertAdjacentHTML('afterbegin', yandex);

const strToLog = `
    Hello
    World
        Iam
            Newtab
`;

console.log(strToLog);