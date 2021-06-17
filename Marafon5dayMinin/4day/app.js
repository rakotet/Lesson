const board = document.querySelector('#board')
const colors = ['rgb(150, 43, 43)', 'rgb(131, 177, 88)', 'rgb(92, 164, 197)', 'rgb(179, 92, 206)', 'rgb(216, 90, 159)']
const SQUARES_NUMBER = 450

for(let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div')
    square.classList.add('square')

    square.addEventListener('mouseover', () => setColor(square))
    square.addEventListener('mouseleave', () => removeColor(square))

    board.append(square)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = '0 0 2px #111'
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}