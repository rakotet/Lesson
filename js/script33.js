// RootElement <= Box <= instances (иерархия наследования)

class RootElement { // создаем новый класс
    constructor(tagName = 'div') { // создаём конструктор класса, с параметром по умолчанию (при создании экземпляра класса)
        this.$el = document.createElement(tagName); // инициализируем переменную $el = (создать элемент указанный в конструкторе)
        this.$el.style.marginBottom = '20px';
    }

    hide() {
        this.$el.style.opacity = '0'; // скрываем элемент (делаем прозрачным)
    }

    showe(){
        this.$el.style.opacity = '1';
    }

    append() {
        document.querySelector('.wrapper').insertAdjacentElement('beforeend', this.$el); // вставляем элемент в HTML
    }
}

class Box extends RootElement { // создаём новый класс и наследуем его от другого класса
    constructor(color, size = 150, tagName) {
        super(tagName); // обращаемся к конструктору класса родителя
        this.color = color;
        this.size = size;
    }

    create() { // создаем метод класса
        console.log(this.$el);
        this.$el.style.background = this.color; // задаем стили элемента
        this.$el.style.width = this.$el.style.height = `${this.size}px`;
        this.append();
        return this; // возвращаем созданный объект который вызвал этот метод
    }
}

class Circle extends RootElement {
    constructor(color) {
        super();
        this.color = color;
    }

    create() {
        this.$el.style.borderRadius = '50%';
        this.$el.style.width = this.$el.style.height = `120px`;
        this.$el.style.background = this.color;
        this.append();

        return this;
    }
}

const redBox = new Box('red', 100, 'div').create(); // создаём экземпляр класса (объект) и вызываем его метод
console.log(redBox);

const blueBox = new Box('blue').create(); // остальные параметры берутся из конструктора (параметры по умолчанию)

const circle = new Circle('green').create();

circle.$el.addEventListener('mouseenter', () => { // обработчик наведения мыши на элемент (скрыть элемент)
    circle.hide();
});

circle.$el.addEventListener('mouseleave', () => { 
    circle.showe();
});