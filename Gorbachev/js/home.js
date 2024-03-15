let wrap = document.querySelector('.four')
let input = wrap.querySelector('input')
let list = wrap.querySelector('ul')
let listElems = wrap.querySelectorAll('li')
let btnArr = wrap.querySelectorAll('.four-item-btn')
let fiveRow = document.querySelector('.five-row')
let arrImg = fiveRow.querySelectorAll('a')



//5 блок
let heightImg = (861 / (arrImg.length - 1)).toFixed(1)

for(let i = 0; i < arrImg.length; i++) {
  arrImg[i].style.height = heightImg + 'px'
}
//5 блок конец

//Карусель 4 блок
input.max = listElems.length
let width = 362 
let count = 1 
let position = 0 

wrap.querySelector('.four-item-btn-right').onclick = function() {
  position -= width * count
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = position + 'px'

  input.value = Number(input.value) + 1
}

wrap.querySelector('.four-item-btn-left').onclick = function() {
  position += width * count
  position = Math.min(position, 0)
  list.style.marginLeft = position + 'px'

  input.value = Number(input.value) - 1 < 1 ? 1 : Number(input.value) - 1
}

wrap.addEventListener('mousemove', function(event) {
  const x = event.clientX; 

  if(x <= 100 || (window.innerWidth - x) <= 100) {
    btnArr[0].classList.remove('four-hide')
    btnArr[1].classList.remove('four-hide')
  } else {
    btnArr[0].classList.add('four-hide')
    btnArr[1].classList.add('four-hide')
  }
})
//Карусель 4 блок конец

//6 блок
$(document).ready(function () {
  var carousel = $("#carousel").waterwheelCarousel({
    // number tweeks to change apperance
    startingItem:               1,   // item to place in the center of the carousel. Set to 0 for auto
    separation:                 200, // distance between items in carousel
    separationMultiplier:       0.8, // multipled by separation distance to increase/decrease distance for each additional item //умножается на расстояние разделения, чтобы увеличить/уменьшить расстояние для каждого дополнительного элемента
    horizonOffset:              0,   // offset each item from the "horizon" by this amount (causes arching) //смещает каждый элемент от «горизонта» на эту величину (вызывает изгиб)
    horizonOffsetMultiplier:    1,   // multipled by horizon offset to increase/decrease offset for each additional item //умножается на смещение горизонта для увеличения/уменьшения смещения для каждого дополнительного элемента
    sizeMultiplier:             0.8, // determines how drastically the size of each item changes //определяет, насколько сильно меняется размер каждого элемента
    opacityMultiplier:          0.9, // determines how drastically the opacity of each item changes //определяет, насколько сильно меняется непрозрачность каждого элемента
    horizon:                    0,   // how "far in" the horizontal/vertical horizon should be set from the container wall. 0 for auto //насколько «далеко» должен быть установлен горизонтальный/вертикальный горизонт от стенки контейнера. 0 для авто
    flankingItems:              4,   // the number of items visible on either side of the center //количество предметов, видимых по обе стороны от центра                  

    // animation
    speed:                      150,      // speed in milliseconds it will take to rotate from one to the next
    animationEasing:            'linear', // the easing effect to use when animating
    quickerForFurther:          true,     // set to true to make animations faster when clicking an item that is far away from the center //установите значение true, чтобы анимация ускорялась при нажатии на элемент, находящийся далеко от центра.
    edgeFadeEnabled:            true,    // when true, items fade off into nothingness when reaching the edge. false to have them move behind the center image

    // misc
    linkHandling:               2,                 // 1 to disable all (used for facebox), 2 to disable all but center (to link images out) //1, чтобы отключить все (используется для Facebook), 2, чтобы отключить все, кроме центра (чтобы связать изображения)
    autoPlay:                   0,                 // indicate the speed in milliseconds to wait before autorotating. 0 to turn off. Can be negative //укажите скорость в миллисекундах, с которой необходимо подождать перед авторотацией. 0, чтобы выключить. Может быть отрицательным
    orientation:                'horizontal',      // indicate if the carousel should be 'horizontal' or 'vertical' //укажите, должна ли карусель быть «горизонтальной» или «вертикальной»
    activeClassName:            'carousel-center', // the name of the class given to the current item in the center //имя класса, присвоенное текущему элементу в центре
    keyboardNav:                false,             // set to true to move the carousel with the arrow keys //установите значение true, чтобы перемещать карусель с помощью клавиш со стрелками
    keyboardNavOverride:        true,              // set to true to override the normal functionality of the arrow keys (prevents scrolling) //установите значение true, чтобы переопределить обычную функциональность клавиш со стрелками (предотвращает прокрутку)
    imageNav:                   true,              // clicking a non-center image will rotate that image to the center //щелчок по изображению, расположенному не по центру, повернет это изображение в центр

    // preloader
    preloadImages:              true,  // disable/enable the image preloader. //отключить/включить предзагрузчик изображений.
    forcedImageWidth:           340,     // specify width of all images; otherwise the carousel tries to calculate it //  указать ширину всех изображений; в противном случае карусель попытается вычислить это
    forcedImageHeight:          460,     // specify height of all images; otherwise the carousel tries to calculate it // указать длину всех изображений; в противном случае карусель попытается вычислить это

    // callback functions
    movingToCenter:             $.noop, // fired when an item is about to move to the center position
    movedToCenter:              $.noop, // fired when an item has finished moving to the center
    clickedCenter:              $.noop, // fired when the center item has been clicked
    movingFromCenter:           $.noop, // fired when an item is about to leave the center position
    movedFromCenter:            $.noop  // fired when an item has finished moving from the center
  });

  $('#prev').bind('click', function () {
    carousel.prev();
    return false
  });

  $('#next').bind('click', function () {
    carousel.next();
    return false;
  });
});


//6 блок конец