import {Component} from '../core/component'

export class Chat extends Component {
    constructor(id) {
        super(id)
        this.init()
    }


    init() {
        this.chat = this.$el.querySelector('.field__content')
        this.button = this.$el.querySelector('.field__textarea_button button')
        this.textarea = this.$el.querySelector('.field__textarea textarea')

        this.button.addEventListener('click', (event) => this.sendChatMessageTextarea(event, this.textarea))
        this.textarea.addEventListener('keyup', (event) => this.sendChatMessageTextarea(event, this.textarea))
        this.chat.addEventListener('DOMNodeInserted', (event) => this.mutationEventScrollDown(this.chat))

        this.chat.innerHTML = ''
    }
}


