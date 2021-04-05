import {ws} from './websocket'
import {Chat} from '../modules/chat'
import {Select} from '../modules/select'
import {Message} from '../modules/message'

export class WsOnMessage {
    constructor(list, user) {
        this.list = list
        this.user = user
        this.init()
    }

    init() {
        const user = this.user
        const select = new Select(this.list)
        const chat = new Chat('field__chat')
        const message = new Message('field__messages', select)

        ws.onmessage = async function(event) {
            let data = await JSON.parse(event.data)

            if(data['action'] == 'massageChatServer') {
                const date = new Date()
                chat.chat.insertAdjacentHTML('beforeend', `<p>${data['userName']} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} </br> ${data['text']}</p></br>`)

            } else if(data['action'] == 'privateMessageLoadingServer') {
                message.messageFild.innerHTML = ''

                for(let i = 0; i < data['listPrivateMessage'].length; i++) {
                    let twoUser = data['listPrivateMessage'][i].users.split(',')
                    let userOne = user == twoUser[0] ? userOne = twoUser[1] : userOne = twoUser[0]

                    message.messageFild.insertAdjacentHTML('beforeend', `<p class="field__messages_p" data-user="${userOne}" data-message="${data['listPrivateMessage'][i].id}">${userOne}</br>${data['listPrivateMessage'][i].last_message}</br></br></p>`)
                }

            } else if(data['action'] == 'userPrivateMessageLoadingServer') {
                message.messageFildPrivat.innerHTML = ''
                message.messageFildPrivat.insertAdjacentHTML('beforeend', `${data['data'].message}</br>`)

            } else if(data['action'] == 'privateMessageUserServer') {
                message.messageFildPrivat.insertAdjacentHTML('beforeend', `${data.privateMessage}`)
            }
        }

        
    }
}