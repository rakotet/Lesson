import {Component} from '../core/component'
import {ws} from '../core/websocket'

export class Chat extends Component {
    constructor(id) {
        super(id)
        this.init()
    }

    init() {
        let chat = this.$el.querySelector('.field__content')
        this.chat = this.$el.querySelector('.field__content')
        // this.button = this.$el.querySelector('.field__textarea_button button')
        let button = this.$el.querySelector('.field__textarea_button button')
        this.fieldTextarea = this.$el.querySelector('.field__textarea')
        this.textarea = this.$el.querySelector('.field__textarea textarea')

        button.addEventListener('click', send.bind(this))
        this.fieldTextarea.addEventListener('keyup', send.bind(this))
        this.chat.addEventListener('DOMNodeInserted', mutationEvent.bind(this))

        this.chat.innerHTML = ''

        ws.onmessage = async function(event) {
            let data = await JSON.parse(event.data)
                if(data['action'] == 'massageChatServer') {
                    const date = new Date()
                    chat.insertAdjacentHTML('beforeend', `<p>${data['userName']} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} </br> ${data['text']}</p></br>`)
                }
        }
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

