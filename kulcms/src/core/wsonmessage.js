import {ws} from './websocket'

export class WsOnMessage {
    constructor() {
        this.init()
    }

    init() {
        ws.onmessage = async function(event) {
            console.log('wwww')
            let data = await JSON.parse(event.data)

            if(data['action'] == 'massageChatServer') {
                console.log('chat')
            } else if(data['action'] == 'privateMessageLoadingServer') {
                console.log('message')
            }
        }
    }
}