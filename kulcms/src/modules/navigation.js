import {Component} from '../core/component'

export class Navigation extends Component {
    constructor(id) {
        super(id)
        this.init()
    }

    init() {
        this.strongNew = this.$el.querySelector('.menu__item_strong')
        let menu = this.$el.querySelector('.menu')
        let instructions = this.$el.querySelector('.instructions')
        let chat = this.$el.querySelector('.field__chat')
        let messages = this.$el.querySelector('.field__messages')
        let service = this.$el.querySelector('.field__service')
        let tasks = this.$el.querySelector('.field__tasks')

        let tabs = [{data: 'instructions', tab: instructions}, {data: 'chat', tab: chat}, {data: 'message', tab: messages}, {data: 'service', tab: service}, {data: 'tasks', tab: tasks}]

        menu.addEventListener('click', function(event) {

        if(event.target.hasAttribute('data-tab')) {
            for(let i = 0; i < tabs.length; i++) {
                if(tabs[i].data == event.target.getAttribute('data-tab')) {
                    if(tabs[i].tab.classList.contains('hide')) {
                        tabs[i].tab.classList.remove('hide')
                    } 

                } else {
                    tabs[i].tab.classList.add('hide')
                }
            }
        }
        
        })
    }

}
