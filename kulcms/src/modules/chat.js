import {Component} from '../core/component'
import {ws} from '../core/websocket'

export class Chat extends Component {
    constructor(id) {
        super(id)
        this.init()
    }


    init() {
        this.chat = this.$el.querySelector('.field__content')
        let button = this.$el.querySelector('.field__textarea_button button')
        this.fieldTextarea = this.$el.querySelector('.field__textarea')
        this.textarea = this.$el.querySelector('.field__textarea textarea')
        button.addEventListener('click', send.bind(this))
        this.fieldTextarea.addEventListener('keyup', send.bind(this))
        this.chat.addEventListener('DOMNodeInserted', mutationEvent.bind(this))

        this.chat.innerHTML = ''

    }

}

function send(event) {
    if(event.key == 'Enter' || event.type == 'click') {

        if(this.textarea.value == '' || this.textarea.value == ' ') {
            alert('Сообщение пустое')
        } else {
            let massage = {
                action: 'massageChatClient',
                text: this.textarea.value
            }
            ws.send(JSON.stringify(massage))
        }

        this.textarea.value = ''

    }
}


function mutationEvent(event) {
    this.chat.scrollTop = this.chat.scrollHeight
}

