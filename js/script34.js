class Dropdown { // создаем класс
    constructor(selector, options) { // создаем конструктор (переденные элемент HTML и его свойства)
        this.$el = document.querySelector(selector); // получаем доступ к переданнаму элементу
        this.items = options.items; // в переменную заносим значение (массив значений из переданного объекта)
        this.$el.querySelector('.dropdown__label').textContent = this.items[0].label; //меняем значение элемента

        this.$el.addEventListener('click', event => {
            if(event.target.classList.contains('dropdown__label')) { // если кликнули по элементу в котором есть класс dropdown__label

            }
        });
    }

    open() {
        this.$el.classList.add('open');
    }

    close() {
        this.$el.classList.remove('open');
    }

}


const dropdown = new Dropdown('#dropdown', { // создаем объект класса с свойствами
    items: [
        {label: 'Москва', id: 'msk'},
        {label: 'Санкт-Петербург', id: 'spb'},
        {label: 'Новосибирск', id: 'nsk'},
        {label: 'Краснодар', id: 'krdr'}
    ]
});