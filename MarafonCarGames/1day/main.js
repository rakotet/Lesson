'use strict';

const game = document.querySelector('.game');
const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
gameArea.classList.add('hide');
const car = document.createElement('div');
car.classList.add('car');
const audio = new Audio('audio.mp3');
const enemyAutos = ['onibus-muito-ruim.png', 'glibersat_Sapuar.png', 'glibersat_Nioubiteul.webp', 'car_black.png'];

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 10,
    traffic: 3
};

function getQuantityElements(heightElement) {
    return gameArea.offsetHeight / heightElement + 1;
}

function playGame() {
    if(setting.start) {
        setting.score += setting.speed;
        score.innerHTML = 'SCORE<br>' + setting.score;
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }

        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }

        if(keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
}

function startGame() {
    gameArea.classList.remove('hide');
    score.classList.remove('hide');
    gameArea.classList.remove('hide');
    gameArea.innerHTML = '';
    score.style.top = '0px';
    audio.play();

    for(let i = 0; i < getQuantityElements(50); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for(let i = 0; i < getQuantityElements(100 * setting.traffic); i ++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url(./image/${enemyAutos[randomAutos(0, (enemyAutos.length - 1))]}) center / cover no-repeat`;
        gameArea.appendChild(enemy);
    }

    setting.score = 0;
    setting.start = true;
    gameArea.append(car);
    car.style.left = (gameArea.offsetWidth / 2 - car.offsetWidth / 2) + 'px';
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function startRun(event) {
    if(keys.hasOwnProperty(event.key)) {
        event.preventDefault();
        keys[event.key] = true;
    }
}

function stopRun(event) {
    if(keys.hasOwnProperty(event.key)) {
        event.preventDefault();
        keys[event.key] = false;
    }
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if(line.y >= gameArea.offsetHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item) {
        let carRect = car.getBoundingClientRect(); // возвращает объект с координатами элемента
        let enemyRect = item.getBoundingClientRect();

        if(carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left && 
            carRect.left <= enemyRect.right && 
            carRect.bottom >= enemyRect.top) {
            setting.start = false;
            audio.pause();

            if(localStorage.getItem('score') === null) {
                localStorage.setItem('score', setting.score);
            } else {
                let scoreLocal = localStorage.getItem('score');
                if(scoreLocal < setting.score) {
                    alert('Вы побили свой предыдущий рекорд!!!');
                    localStorage.setItem('score', setting.score);
                }
                
            }

            start.classList.remove('hide');
            score.style.top = start.offsetHeight + 'px';
        }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if(item.y >= gameArea.offsetHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
        }
    });
}

function randomAutos(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function choiceOfDifficulty() {
    start.classList.add('hide');
    score.classList.add('hide');
    gameArea.classList.add('hide');

    game.insertAdjacentHTML('afterbegin', '<div class="buttonVeryHard"><span>Сложно</span></div>');
    game.insertAdjacentHTML('afterbegin', '<div class="buttonHard"><span>Средне</span></div>');
    game.insertAdjacentHTML('afterbegin', '<div class="buttonEasy"><span>Легко</span></div>');

    const buttonEasy = document.querySelector('.buttonEasy');
    const buttonHard = document.querySelector('.buttonHard');
    const buttonVeryHard = document.querySelector('.buttonVeryHard');

    function getSettingButton(number) {
        setting.speed = number;
        buttonEasy.classList.add('hide');
        buttonHard.classList.add('hide');
        buttonVeryHard.classList.add('hide');
        startGame();
    }

    buttonEasy.addEventListener('click', () => {
        getSettingButton(3);
    });

    buttonHard.addEventListener('click', () => {
        getSettingButton(6);
    });

    buttonVeryHard.addEventListener('click', () => {
        getSettingButton(10);
    });
}

start.addEventListener('click', choiceOfDifficulty);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
