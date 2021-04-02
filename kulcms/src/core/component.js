import {ws} from './websocket'
export class Component {
    constructor(id) {
        this.$el = document.getElementById(id) 
    }

    init() {}

    sendChatMessageTextarea(event, textarea) {
        if(event.key == 'Enter' || event.type == 'click') {
            if(textarea.value == '' || textarea.value == ' ') {
                alert('Сообщение пустое')
            } else {
                let massage = {
                    action: 'massageChatClient',
                    text: textarea.value.trim()
                }
                ws.send(JSON.stringify(massage))
            }
    
            textarea.value = ''
        }
    }

    sendPrivateMessageTextarea(event, select, textarea) {
        if(event.key == 'Enter' || event.type == 'click') {
            if(textarea.value == '' || textarea.value == ' ') {
                alert('Сообщение пустое')
            } else {
                let massage = {
                    action: 'massagePrivateClient',
                    text: textarea.value.trim(),
                    select: select.value
                }
                ws.send(JSON.stringify(massage))
            }
    
            textarea.value = ''
        }
    }

    mutationEventScrollDown(element) {
        element.scrollTop = element.scrollHeight
    }
}