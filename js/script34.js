class Dropdown { // создаем класс
    constructor(selector, options) { // создаем конструктор (переденные элемент HTML и его свойства)
        this.$el = document.querySelector(selector); // получаем доступ к переданнаму элементу
        this.items = options.items; // в переменную заносим значение (массив значений из переданного объекта)
        this.$el.querySelector('.dropdown__label').textContent = this.items[0].label; //меняем значение элемента

        this.$el.addEventListener('click', event => {
            if(event.target.classList.contains('dropdown__label')) { // если кликнули по элементу в котором есть класс dropdown__label
                if(this.$el.classList.contains('open')) { // если класс open есть в элементе то вызвать close если нет, вызвать open
                    this.close();
                } else {
                    this.open();
                }
            } else if(event.target.tagName.toLowerCase() === 'li') { // если мы сделали клик на тег <li>
                this.select(event.target.dataset.id); // передаем в метод значение data-* (в нашем случае * = id)

            }
        });

        const itemsHTML = this.items.map(i => { // вызываем map у массива items и спомощью стрелочной ф-и 
            return `<li data-id="${i.id}">${i.label}</li>` // преобразуем каждый элемент в HTML код 
        }).join(' '); // преобразует элементы массива в строки и разделяет их символом указанным в аргументе метода

        this.$el.querySelector('.dropdown__menu').insertAdjacentHTML('afterbegin', itemsHTML); // вставляем массив из HTML блоков <li> внутрь <ul>
    }

    select(id) {
        const item = this.items.find(i => i.id === id); // записываем в переменную объект, из массива items у которого id совпадает c переданным id в ф-ю
        this.$el.querySelector('.dropdown__label').textContent = item.label; // меняем содержание элемента на свойство label объекта item
        this.close();
    }

    open() {
        this.$el.classList.add('open'); // добавляем класс в атрибут элемента
    }

    close() {
        this.$el.classList.remove('open'); // удаляем класс из атрибута элемента
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