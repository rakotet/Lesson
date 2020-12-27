export class Component {
    constructor(id) {
        this.$el = document.getElementById(id) // с $ принято называть переменные которые содержат в себе DOM элемент
        this.init() // при создании объекта, вызывается метод init который будет переопределён в каждом классе наследнике
    }

    init() {}

    hide() {
        this.$el.classList.add('hide')
    }

    show() {
        this.$el.classList.remove('hide')
    }
}