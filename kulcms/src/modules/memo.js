import {Component} from '../core/component'
import {ws} from '../core/websocket'

export class Memo extends Component {
    constructor(id, select) {
        super(id)
        this.select = select
        this.init()
    }

    init() {

    }

}