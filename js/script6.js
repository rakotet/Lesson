var carColor = 'green'

// if (carColor === 'green') {
//     console.log('Цвет машины зеленый')
// } else if (carColor === 'yellow') {
//     console.log('Цвет машины жельый')
// } else if (carColor === 'red') {
//     console.log('Цвет машины красный')
// } else {
//     console.log('Цвет машины не определён')
// }
// Аналогичная запись, только через оператор switch
switch (carColor) {
    case 'green':
        console.log('Цвет машины зеленый')
        break
    case 'yellow':
        console.log('Цвет машины жельый')
        break
    case 'red':
        console.log('Цвет машины красный')
        break
    default:
        console.log('Цвет машины не определён')
}