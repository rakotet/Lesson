document.querySelector('#load').addEventListener('click', load) // получаем доступ к элементу и вешаем обработчик события клик

async function load() { // async делает любую ф-ю асинхронной
    let url = 'https://jsonplaceholder.typicode.com/users'

    let response = await fetch(url) // ждем ответ от сервера используя await и записуем пришедший результат в переменную
    let data = await response.json() // записуем в переменную результат парсинга json объекта полученного из response

    let ul = document.querySelector('#list')
    
    let html = data.map(function(item) { // преобразуем каждый элемент массива data через map 
        return `<li>${item.id} ${item.name} (${item.email})</li>` // возвращаем просто строку с свойствами item
    }).join(' ') // join превращает массив в строку используя разделитель указанный в аргументе (в нашем случае пробел)
    
    ul.insertAdjacentHTML('afterbegin', html) // вставляем HTML код внутрь элемента
}