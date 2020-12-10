document.querySelector('#load').addEventListener('click', load)

function load() {
    let url = 'https://jsonplaceholder.typicode.com/users'
    
    fetch(url) // делает запрос на сервер у возвращает промис
    .then(function(response) {
        console.log('Response', response)
    })
}