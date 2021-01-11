import {Block} from '../core/block.js'

export class Ant extends Block {
    constructor(id, left = 0, topAnt = 0) {
        super(id)
        this.left = left
        this.topAnt = topAnt
    }

    init() {
        document.addEventListener('keydown', antMov.bind(this))
    }
}

function antMov(event) {
    if(event.key == 'd' || event.key == 'в') {
        // this.left += 20
        // this.left <= 480
        // ? this.$el.style.left = this.left + 'px'
        // : this.left = 480

        this.$el.classList.add('mov')
    }

    if(event.key == 'a' || event.key == 'ф') {
        this.left -= 20
        this.left >= 0 
        ? this.$el.style.left = this.left + 'px'
        : this.left = 0
    }

    if(event.key == 'w' || event.key == 'ц') {
        this.topAnt -= 20
        this.topAnt >= 0
        ? this.$el.style.top = this.topAnt + 'px'
        : this.topAnt = 0
    }

    if(event.key == 's' || event.key == 'ы') {
        this.topAnt += 20
        this.topAnt <= 280
        ? this.$el.style.top = this.topAnt + 'px'
        : this.topAnt = 280
    }
}
