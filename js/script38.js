document.querySelector('#load').addEventListener('click', load) // получаем доступ к элементу и вешаем обработчик события клик

function load() {
    let url = 'https://jsonplaceholder.typicode.com/users'
    
    fetch(url) // делает запрос на сервер у возвращает промис
    .then(function(response) { // response это то что пришло из ответа сервера
        return response.json() // возвращаем декодированный json который пришел из ответа сервера
    })
    .then(function(data) { // data результат работы предыдущего then (в нашем случае data это массив с объектами)
        let ul = document.querySelector('#list')
        let html = data.map(function(item) { // преобразуем каждый элемент массива data через map 
            return `<li>${item.id} ${item.name} (${item.email})</li>` // возвращаем просто строку с свойствами item
        }).join(' ') // join превращает массив в строку используя разделитель указанный в аргументе (в нашем случае пробел)
        
        ul.insertAdjacentHTML('afterbegin', html) // вставляем HTML код внутрь элемента
    })
}