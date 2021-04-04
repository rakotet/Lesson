import {Component} from '../core/component'
import {ws} from '../core/websocket'

export class Message extends Component {
    constructor(id, select) {
        super(id)
        this.select = select
        this.init()
    }

    init() {
        this.select.selectCreate('.field__messages select') // заполнили select пользователями

        this.messageFild = this.$el.querySelector('.field__messages_container')
        let selectUsers = this.$el.querySelector('.field__messages select')
        let textAreaMessage = this.$el.querySelector('.field__messages textarea')
        let buttonSentMessage = this.$el.querySelector('.field__messages button')

        ws.send(JSON.stringify({action: 'privateMessageLoadingClient'}))

        buttonSentMessage.addEventListener('click', (event) => this.sendPrivateMessageTextarea(event, selectUsers, textAreaMessage))
        textAreaMessage.addEventListener('keyup', (event) => this.sendPrivateMessageTextarea(event, selectUsers, textAreaMessage))

        this.messageFild.addEventListener('click', function(event) {
            if(event.target.hasAttribute('data-message')) {
                ws.send(JSON.stringify({action: 'userPrivateMessageLoadingClient', id: event.target.getAttribute('data-message')}))
            }
        })

    }

}