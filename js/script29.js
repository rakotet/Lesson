const creatPost = (title, text, date = new Date().toLocaleDateString() /**параметр по умолчанию, сработает если не был передан параметр в функцию */) => {
    return {
        title: title,
        text: text, 
        date: date
    }
}

const post = creatPost('Скоро новый год', 'Скоро будет 2020')

console.log(post)
