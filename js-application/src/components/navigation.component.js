import {Component} from '../core/component'

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)

        this.tabs = [] // массив с доступами к табам
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this))
    }

    registerTabs(tabs) {
        this.tabs = tabs
    }
}

function tabClickHandler(event) {
    event.preventDefault() // отменяем стандартное поведение
    if(event.target.classList.contains('tab')) {
        Array.from(this.$el.querySelectorAll('.tab')).forEach(tab => { // преобразовываем в массив элементы полученные с querySelectorAll и через цикл forEach удаляем у каждого элемента класс css active
            tab.classList.remove('active')
        })
        event.target.classList.add('active')

        const activeTab = this.tabs.find(t => t.name === event.target.dataset.name) // перебираем массив через find до выполнения условия callback ф-ии
        this.tabs.forEach(t => t.component.hide()) // перебираем элементы массива и к каждому применяем метод hide()
        activeTab.component.show() // вызываем метод show() у элемента на который мы кликнули
        
    }
}