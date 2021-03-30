import {Component} from '../core/component'
import {Navigation} from './navigation'
import {ws} from '../core/websocket'
import {Main} from './main'
import {Chat} from './chat'
import {Message} from './message'
import {Select} from './select'

export class Authorization extends Component {
    constructor(id) {
        super(id)
        this.init()
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
                      const select = new Select(data['userList'])
                      new Chat('field__chat')
                      new Message('field__messages', select)
                      
                    } else {
                        alert('Не верный логин или пароль')
                    }
                }
        }
    }
}