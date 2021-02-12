const elLogin = document.querySelector('.login')

let ws = new WebSocket('ws://localhost:8001')

ws.onopen = function(event) {
    console.log('Соединение установленно')
  
    const login = {
        action: 'login',
        login: elLogin.innerHTML
    }
    ws.send(JSON.stringify(login))
}

ws.onerror = function(error) {
    console.log("Ошибка при соединении: " + error)
}

ws.onclose = function(event) {
    console.log('Соединение закрыто: ' + event.code)
}

ws.onmessage = async function(event) {
    let data = await JSON.parse(event.data)
    // for(let key in data){
    //     console.log('с сервера: ' + key + '->' + data[key])
    // }
    

}