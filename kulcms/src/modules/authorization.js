import {Component} from '../core/component'

export class Authorization extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('submit', authorization.bind(this))
    }
}

function authorization(event) {
    event.preventDefault()

    let ws = new WebSocket('ws://localhost:8001')
    // ws.onopen = function(event) {
    //     console.log('Соединение установленно')
    // }
    console.log(ws.onopen)
}