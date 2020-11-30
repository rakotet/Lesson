class Dropdown {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        console.log(this.$el);
    }

    open() {
        this.$el.classList.add('open');
    }

    close() {
        this.$el.classList.remove('open');
    }

    pus() {
        
    }
}





const dropdown = new Dropdown('#dropdown', {
    items: [
        {label: 'Москва', id: 'msk'},
        {label: 'Санкт-Петербург', id: 'spb'},
        {label: 'Новосибирск', id: 'nsk'},
        {label: 'Краснодар', id: 'krdr'}
    ]
});