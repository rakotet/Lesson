import {Block} from '../core/block.js'

export class Ant extends Block {
    constructor(id, left = 0, topAnt = 0) {
        super(id)
        this.left = left
        this.topAnt = topAnt
    }

    init() {
        console.log('До', this.left, this.topAnt)
        this.$el.addEventListener('keydown', antMov.bind(this))
    }
}

function antMov(event) {
    if(event.key == 'd') {
        //mov()
        this.left += 20
        this.left <= 480
        ? ant.style.left = this.left + 'px'
        : this.left = 480
        console.log('После', this.left, this.topAnt)
    }

    if(event.key == 'a') {
        this.left -= 20
        this.left >= 0 
        ? ant.style.left = this.left + 'px'
        : this.left = 0
        console.log('После', this.left, this.topAnt)
        
    }

    if(event.key == 'w') {
        this.topAnt -= 20
        this.topAnt >= 0
        ? ant.style.top = this.topAnt + 'px'
        : this.topAnt = 0
        console.log('После', this.left, this.topAnt)
    }

    if(event.key == 's') {
        this.topAnt += 20
        this.topAnt <= 280
        ? ant.style.top = this.topAnt + 'px'
        : this.topAnt = 280
        console.log('После', this.left, this.topAnt)
    }
}
