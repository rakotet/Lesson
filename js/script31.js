// Оператор Spread (записывается как ...) разворачивает объект показывая все его свойства, сколько бы их не было
// Оператор Rest (записывается так же...) но используется в качестве аргумента метода когда мы не знаем сколько аргументов нам придет, он создает масив из всех пришедших

const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault(); // отменяем стандартное действие браузера

    const title = form.title.value; // получаем значения полей ввода
    const text = form.text.value;
    const description = form.description.value;

    saveFormS({title, text, description}); // передаём объект используя деструктуризацию (всё равно что {title: title, text: text, description: description})
    saveFormR({title, text, description});
});

//Spread
function saveFormS(data) {
    const formData = { // создаем объект
        date: new Date().toLocaleDateString(), // местое время клиента
        ...data // используя оператор ... разворачиваем объект и перечисляем все его свойства (более краткая запись, и нам не важно сколько будет свойств в объекте)
    };

    console.log('Form data:', formData);
}

//Rest
function saveFormR(...args) { // используем Rest (...) когда количество агрументов метода не известно
    const formData = {
        date: new Date().toLocaleDateString(),
    };

    for(a of args){
        Object.assign(formData, a) // добавляем свойства объекта 'a' в объект formData
    }


    console.log('Form data:', formData);
};