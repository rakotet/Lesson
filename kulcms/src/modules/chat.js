import {Component} from '../core/component'
import {ws} from '../core/websocket'

export class Chat extends Component {
    constructor(id) {
        super(id)
        this.init()
    }

    init() {
        const chat = this.$el.querySelector('.field__content')
        const button = this.$el.querySelector('.field__textarea_button button')

        button.addEventListener('click', send.bind(this))

        chat.innerHTML = ''

        ws.onmessage = async function(event) {
            let data = await JSON.parse(event.data)
                if(data['action'] == 'massageChatServer') {
                    chat.innerHTML += `<p>${data['userName']}: ${data['text']}</p>`
                }
        }
    }

}

function send(event) {
    // event.preventDefault()

    const input = this.$el.querySelector('.field__textarea textarea')

    if(input.value == '') {
        alert('Сообщение пустое')
    } else {
        let massage = {
            action: 'massageChatClient',
            text: input.value
        }
        ws.send(JSON.stringify(massage))
    }

    input.value = ''
}