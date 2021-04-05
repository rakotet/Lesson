import {Component} from '../core/component'
import {Navigation} from './navigation'
import {ws} from '../core/websocket'
import {WsOnMessage} from '../core/wsonmessage'
import {Main} from './main'

export class Authorization extends Component {
    constructor(id) {
        super(id)
        this.init()
    }

    init() {
        this.$el.addEventListener('submit', authorization.bind(this))

        ws.onopen = function(event) {
            console.log('Соединение установленно')
        }

        ws.onerror = function(error) {
            console.log("Ошибка при соединении: " + error)
        }

        ws.onclose = function(event) {
            console.log('Соединение закрыто: ' + event.code)
            window.location.reload()
        }
    }
}

function authorization(event) {
    event.preventDefault()

    const login = document.getElementById('login')
    const password = document.getElementById('password')

    if(login.value !== '' && password.value !== '') {
        let user = {
            action: 'authorized',
            login: login.value,
            password: password.value
        }
        ws.send(JSON.stringify(user))

        login.value = ''
        password.value = ''

        ws.onmessage = async function(event) {
            let data = await JSON.parse(event.data)
                if(data['action'] == 'authorized') {
                    if(data['logon'] == true) {
                        new Main('main', data['userName'])
                        new Navigation('container')
                        new WsOnMessage(data['userList'], data['userName'])
                      
                    } else {
                        alert('Не верный логин или пароль')
                    }
                }
        }
    }
}