import $ from 'jquery' // подключаем библтотеку jquery в наш js файл
// ниже нипишем простой код на jquery

$('<h1/>')
    .text('Hello world from JQuery')
    .css({
        textAlign: 'center',
        color: 'blue'
    })
    .appendTo($('header'))