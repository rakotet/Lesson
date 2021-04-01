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

        ws.send(JSON.stringify({action: 'privateMessageLoadingClient'}))

    }

}