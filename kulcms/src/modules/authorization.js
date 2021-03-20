import {Component} from '../core/component'
import {ws} from '../core/websocket'
import {Main} from './main'

export class Authorization extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('submit', authorization.bind(this))
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
            password: Number(password.value)
        }
        ws.send(JSON.stringify(user))

        login.value = ''
        password.value = ''

        ws.onmessage = async function(event) {
            let data = await JSON.parse(event.data)
                if(data['action'] == 'authorized') {
                    if(data['logon'] == true) {
                        new Main('main')
                    } else {
                        alert('Не верный логин или пароль')
                    }
                }
        }
    }
}