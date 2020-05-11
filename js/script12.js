var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

numbers.push('Not a number')

for (i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        console.log(numbers[i])
    }
}

numbers.push('String')

for (i = 0; i < numbers.length; i++) {
    if (typeof numbers[i] === "string") { //Выводим только числовые элементы массива, а строковые пропускаем через continue
        continue
    }
    console.log(numbers[i])
}