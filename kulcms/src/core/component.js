export class Component {
    constructor(id) {
        this.$el = document.getElementById(id) // с $ принято называть переменные которые содержат в себе DOM элемент
         // при создании объекта, вызывается метод init который будет переопределён в каждом классе наследнике
    }

    init() {}

    onShow() {}

    onHide() {}

    hide() {
        this.$el.classList.add('hide')
        this.onHide()
    }

    show() {
        this.$el.classList.remove('hide')
        this.onShow()
    }
}