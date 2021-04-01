import {ws} from './websocket'
import {Chat} from '../modules/chat'
import {Select} from '../modules/select'
import {Message} from '../modules/message'

export class WsOnMessage {
    constructor(list) {
        this.list = list
        this.init()
    }

    init() {
        const select = new Select(this.list)
        const chat = new Chat('field__chat')
        const message = new Message('field__messages', select)


        ws.onmessage = async function(event) {
            let data = await JSON.parse(event.data)

            if(data['action'] == 'massageChatServer') {
                console.log('chat')
                const date = new Date()
                chat.chat.insertAdjacentHTML('beforeend', `<p>${data['userName']} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} </br> ${data['text']}</p></br>`)

            } else if(data['action'] == 'privateMessageLoadingServer') {
                console.log('message')
            }
        }
    }
}