let ant = document.querySelector('.ant')
let playingField = document.querySelector('.playing-field')

let left = 0
let topAnt = 0

document.addEventListener('keydown', function(event) {
    if(event.key == 'd') {
        //mov()
        left += 20
        left <= 480
        ? ant.style.left = left + 'px'
        : left = 480
        console.log(left)
        console.log(topAnt)
    }

    if(event.key == 'a') {
        left -= 20
        left >= 0 
        ? ant.style.left = left + 'px'
        : left = 0
        console.log(left)
        console.log(topAnt)
        
    }

    if(event.key == 'w') {
        topAnt -= 20
        topAnt >= 0
        ? ant.style.top = topAnt + 'px'
        : topAnt = 0
        console.log(left)
        console.log(topAnt)
    }

    if(event.key == 's') {
        topAnt += 20
        topAnt <= 280
        ? ant.style.top = topAnt + 'px'
        : topAnt = 280
        console.log(left)
        console.log(topAnt)
    }

})

function mov () {
    if(ant.classList !== 'mov')
    ant.classList.add('mov')

    setTimeout(function() {
        ant.classList.remove('mov')
    }, 300)
}