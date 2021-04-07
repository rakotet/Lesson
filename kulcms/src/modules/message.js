import {Component} from '../core/component'
import {ws} from '../core/websocket'

export class Message extends Component {
    constructor(id, select, user) {
        super(id)
        this.idMessage
        this.select = select
        this.user = user
        this.init()
    }

    init() {
        this.select.selectCreate('.field__messages select') // заполнили select пользователями

        this.messageFild = this.$el.querySelector('.field__messages_container')
        this.messageFildPrivat = this.$el.querySelector('.field__messages_userPrivatMessage')

        this.selectUsers = this.$el.querySelector('.field__messages select')
        let textAreaMessage = this.$el.querySelector('.field__messages textarea')
        let buttonSentMessage = this.$el.querySelector('.field__messages_button')
        this.buttonBack = this.$el.querySelector('.field__messages_buttonBack')

        ws.send(JSON.stringify({action: 'privateMessageLoadingClient'}))

        buttonSentMessage.addEventListener('click', (event) => this.sendPrivateMessageTextarea(event, this.selectUsers, textAreaMessage))
        textAreaMessage.addEventListener('keyup', (event) => this.sendPrivateMessageTextarea(event, this.selectUsers, textAreaMessage))
        this.messageFildPrivat.addEventListener('DOMNodeInserted', (event) => this.mutationEventScrollDown(this.messageFildPrivat))

        this.messageFild.addEventListener('click', (event) => {
            if(event.target.hasAttribute('data-message')) {
                this.idMessage = event.target.getAttribute('data-message')
                ws.send(JSON.stringify({action: 'userPrivateMessageLoadingClient', id: event.target.getAttribute('data-message'), userTo: event.target.getAttribute('data-user'), user: this.user}))

                this.messageFild.classList.add('hide')
                this.selectUsers.classList.add('hide')
                this.selectUsers.value = event.target.getAttribute('data-user')
                this.messageFildPrivat.classList.remove('hide')
                this.buttonBack.classList.remove('hide')

                ws.send(JSON.stringify({action: 'privateMessageLoadingClient'}))
            }
        })

        this.buttonBack.addEventListener('click', this.back.bind(this))
    }

    back(event) {
        ws.send(JSON.stringify({action: 'backPrivateMessageLoadingClient', id: this.idMessage, user: this.user}))
            
        this.messageFild.classList.remove('hide')
        this.selectUsers.classList.remove('hide')
        this.messageFildPrivat.classList.add('hide')
        this.buttonBack.classList.add('hide')
    }

}