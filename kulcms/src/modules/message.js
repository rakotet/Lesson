import {Component} from '../core/component'
import {ws} from '../core/websocket'

export class Message extends Component {
    constructor(id, select, user) {
        super(id)
        this.select = select
        this.user = user
        this.init()
    }

    init() {
        const user = this.user
        let idMessage
        this.select.selectCreate('.field__messages select') // заполнили select пользователями

        this.messageFild = this.$el.querySelector('.field__messages_container')
        this.messageFildPrivat = this.$el.querySelector('.field__messages_userPrivatMessage')

        let selectUsers = this.$el.querySelector('.field__messages select')
        let textAreaMessage = this.$el.querySelector('.field__messages textarea')
        let buttonSentMessage = this.$el.querySelector('.field__messages_button')
        let buttonBack = this.$el.querySelector('.field__messages_buttonBack')

        ws.send(JSON.stringify({action: 'privateMessageLoadingClient'}))

        buttonSentMessage.addEventListener('click', (event) => this.sendPrivateMessageTextarea(event, selectUsers, textAreaMessage))
        textAreaMessage.addEventListener('keyup', (event) => this.sendPrivateMessageTextarea(event, selectUsers, textAreaMessage))
        this.messageFildPrivat.addEventListener('DOMNodeInserted', (event) => this.mutationEventScrollDown(this.messageFildPrivat))

        this.messageFild.addEventListener('click', (event) => {
            if(event.target.hasAttribute('data-message')) {
                idMessage = event.target.getAttribute('data-message')
                ws.send(JSON.stringify({action: 'userPrivateMessageLoadingClient', id: event.target.getAttribute('data-message'), userTo: event.target.getAttribute('data-user'), user: user}))

                this.messageFild.classList.add('hide')
                selectUsers.classList.add('hide')
                selectUsers.value = event.target.getAttribute('data-user')
                this.messageFildPrivat.classList.remove('hide')
                buttonBack.classList.remove('hide')

                ws.send(JSON.stringify({action: 'privateMessageLoadingClient'}))
            }
        })

        buttonBack.addEventListener('click', (event) => {
            ws.send(JSON.stringify({action: 'backPrivateMessageLoadingClient', id: idMessage, user: user}))
            
            this.messageFild.classList.remove('hide')
            selectUsers.classList.remove('hide')
            this.messageFildPrivat.classList.add('hide')
            buttonBack.classList.add('hide')
        })



    }

}