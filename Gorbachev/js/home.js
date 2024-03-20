let wrap = document.querySelector('.four')
let input = wrap.querySelector('input')
let list = wrap.querySelector('ul')
let listElems = wrap.querySelectorAll('li')
let btnArr = wrap.querySelectorAll('.four-item-btn')
let fiveRow = document.querySelector('.five-row')
let arrImg = fiveRow.querySelectorAll('a')
let searchBtn = document.querySelector('.one-search-btn')
let oneNavbar = document.querySelector('.one-navbar')
let oneSearchRow = document.querySelector('.one-search-row')
let onePanelSearch = document.querySelector('.one-panel-search')
let onePanelSearchBtnCancel = document.querySelector('.one-panel-search-btn-cancel')

//1 блок
searchBtn.addEventListener('click', (e) => {
  searchBtn.classList.add('one-hide')
  oneNavbar.classList.add('one-hide')
  oneSearchRow.classList.remove('one-hide')
  onePanelSearch.classList.remove('one-hide')
})

onePanelSearchBtnCancel.addEventListener('click', (e) => {
  searchBtn.classList.remove('one-hide')
  oneNavbar.classList.remove('one-hide')
  oneSearchRow.classList.add('one-hide')
  onePanelSearch.classList.add('one-hide')
})

//1 блок конец

//5 блок
let heightImg = (861 / (arrImg.length - 1)).toFixed(1)

for(let i = 0; i < arrImg.length; i++) {
  arrImg[i].style.height = heightImg + 'px'
}
//5 блок конец

//Карусель 4 блок
input.max = 7
let width = 362 
let count = 1 
let position = 0 
let objYearLength = {
  1985: 0,
  1986: 0,
  1987: 0,
  1988: 0,
  1989: 0,
  1990: 0,
  1991: 0,
}

let objYearCount = {
  1985: 0,
  1986: 0,
  1987: 0,
  1988: 0,
  1989: 0,
  1990: 0,
  1991: 0,
}

let objYearVisibl = false
let objYearClickOn = 1958

let fourYearList = document.querySelector('.four-year-list')
let fourItems = document.querySelectorAll('.four-item')
fourItems = [...fourItems]

fourItems.map(item => {
  if(item.dataset.header == 1985) {
    objYearLength['1985'] += 1 
  } else if(item.dataset.header == 1986) {
    objYearLength['1986'] += 1 
  } else if(item.dataset.header == 1987) {
    objYearLength['1987'] += 1 
  } else if(item.dataset.header == 1988) {
    objYearLength['1988'] += 1 
  } else if(item.dataset.header == 1989) {
    objYearLength['1989'] += 1 
  } else if(item.dataset.header == 1990) {
    objYearLength['1990'] += 1 
  } else if(item.dataset.header == 1991) {
    objYearLength['1991'] += 1 
  }
})

fourItems.map(item => {
  if(item.dataset.header == 1985) {
    objYearCount['1985'] += 1 
    if(objYearCount['1985'] == objYearLength['1985']) item.classList.add('last-item-1985')
  } else if(item.dataset.header == 1986) {
    objYearCount['1986'] += 1 
    if(objYearCount['1986'] == objYearLength['1986']) item.classList.add('last-item-1986')
  } else if(item.dataset.header == 1987) {
    objYearCount['1987'] += 1 
    if(objYearCount['1987'] == objYearLength['1987']) item.classList.add('last-item-1987')
  } else if(item.dataset.header == 1988) {
    objYearCount['1988'] += 1 
    if(objYearCount['1988'] == objYearLength['1988']) item.classList.add('last-item-1988')
  } else if(item.dataset.header == 1989) {
    objYearCount['1989'] += 1 
    if(objYearCount['1989'] == objYearLength['1989']) item.classList.add('last-item-1989')
  } else if(item.dataset.header == 1990) {
    objYearCount['1990'] += 1 
    if(objYearCount['1990'] == objYearLength['1990']) item.classList.add('last-item-1990')
  } else if(item.dataset.header == 1991) {
    objYearCount['1991'] += 1 
    if(objYearCount['1991'] == objYearLength['1991']) item.classList.add('last-item-1991')
  }
})

function fourHideItem(number) {
  let fourItems = document.querySelectorAll('.four-item')
  fourItems = [...fourItems]
  fourItems.map(item => {
    if(item.dataset.header == number) {
      item.classList.remove('one-hide')
    } else {
      item.classList.add('one-hide')
    }
  })

  list.style.marginLeft = 0
  position = 0 

}

fourHideItem(1985)

fourYearList.addEventListener('click', (e) => {
  if(e.target.classList.contains('four-year')) {
    if(e.target.innerText == 1985) {
      input.value = 1
      fourHideItem(1985)
      objYearVisibl = false
      objYearClickOn = 1985
      document.querySelector('.four-item-list').scrollTo({left: 0})
    }
    else if(e.target.innerText == 1986) {
      input.value = 2
      fourHideItem(1986)
      objYearVisibl = false
      objYearClickOn = 1986
      document.querySelector('.four-item-list').scrollTo({left: 0})
    }
    else if(e.target.innerText == 1987) {
      input.value = 3
      fourHideItem(1987)
      objYearVisibl = false
      objYearClickOn = 1987
      document.querySelector('.four-item-list').scrollTo({left: 0})
    }
    else if(e.target.innerText == 1988) {
      input.value = 4
      fourHideItem(1988)
      objYearVisibl = false
      objYearClickOn = 1988
      document.querySelector('.four-item-list').scrollTo({left: 0})
    }
    else if(e.target.innerText == 1989) {
      input.value = 5
      fourHideItem(1989)
      objYearVisibl = false
      objYearClickOn = 1989
      document.querySelector('.four-item-list').scrollTo({left: 0})
    }
    else if(e.target.innerText == 1990) {
      input.value = 6
      fourHideItem(1990)
      objYearVisibl = false
      objYearClickOn = 1990
      document.querySelector('.four-item-list').scrollTo({left: 0})
    }
    else if(e.target.innerText == 1991) {
      input.value = 7
      fourHideItem(1991)
      objYearVisibl = false
      objYearClickOn = 1991
      document.querySelector('.four-item-list').scrollTo({left: 0})
    }
  }
})

function fourVisibleElem2() {
  let last1985 = document.querySelector('.last-item-1985');
  let last1986 = document.querySelector('.last-item-1986');
  let last1987 = document.querySelector('.last-item-1987');
  let last1988 = document.querySelector('.last-item-1988');
  let last1989 = document.querySelector('.last-item-1989');
  let last1990 = document.querySelector('.last-item-1990');
  let last1991 = document.querySelector('.last-item-1991');

  if(last1985 && !last1985.classList.contains('one-hide')) {
    let rect = last1985.getBoundingClientRect();
    let isVisible = (rect.top >= 0) && (rect.left >= 0) && (rect.right <= window.innerWidth);
    if(isVisible) {
      objYearVisibl = 1985
    } else objYearVisibl = false
  } 

  else if(last1986 && !last1986.classList.contains('one-hide')) {
    let rect = last1986.getBoundingClientRect();
    let isVisible = (rect.top >= 0) && (rect.left >= 0) && (rect.right <= window.innerWidth);
    if(isVisible) {
      objYearVisibl = 1986
    } else objYearVisibl = false
  } 

  else if(last1987 && !last1987.classList.contains('one-hide')) {
    let rect = last1987.getBoundingClientRect();
    let isVisible = (rect.top >= 0) && (rect.left >= 0) && (rect.right <= window.innerWidth);
    if(isVisible) {
      objYearVisibl = 1987
    } else objYearVisibl = false
  } 

  else if(last1988 && !last1988.classList.contains('one-hide')) {
    let rect = last1988.getBoundingClientRect();
    let isVisible = (rect.top >= 0) && (rect.left >= 0) && (rect.right <= window.innerWidth);
    if(isVisible) {
      objYearVisibl = 1988
    } else objYearVisibl = false
  } 

  else if(last1989 && !last1989.classList.contains('one-hide')) {
    let rect = last1989.getBoundingClientRect();
    let isVisible = (rect.top >= 0) && (rect.left >= 0) && (rect.right <= window.innerWidth);
    if(isVisible) {
      objYearVisibl = 1989
    } else objYearVisibl = false
  } 

  else if(last1990 && !last1990.classList.contains('one-hide')) {
    let rect = last1990.getBoundingClientRect();
    let isVisible = (rect.top >= 0) && (rect.left >= 0) && (rect.right <= window.innerWidth);
    if(isVisible) {
      objYearVisibl = 1990
    } else objYearVisibl = false
  } 

  else if(last1991 && !last1991.classList.contains('one-hide')) {
    let rect = last1991.getBoundingClientRect();
    let isVisible = (rect.top >= 0) && (rect.left >= 0) && (rect.right <= window.innerWidth);
    if(isVisible) {
      objYearVisibl = 1991
    } else objYearVisibl = false
  } 
  
  else objYearVisibl = false

  setTimeout(() => {
    fourVisibleElem2()
  }, 100)
}

fourVisibleElem2()

let click1985 = document.querySelector('.four-year-list .four-year:nth-child(1)')
let click1986 = document.querySelector('.four-year-list .four-year:nth-child(2)')
let click1987 = document.querySelector('.four-year-list .four-year:nth-child(3)')
let click1988 = document.querySelector('.four-year-list .four-year:nth-child(4)')
let click1989 = document.querySelector('.four-year-list .four-year:nth-child(5)')
let click1990 = document.querySelector('.four-year-list .four-year:nth-child(6)')
let click1991 = document.querySelector('.four-year-list .four-year:nth-child(7)')

function returnNumberFartherRight (year) {
  let arr = [[1985, click1985, objYearCount['1985']], [1986, click1986, objYearCount['1986']], [1987, click1987, objYearCount['1987']], [1988, click1988, objYearCount['1988']], [1989, click1989, objYearCount['1989']], [1990, click1990, objYearCount['1990']], [1991, click1991, objYearCount['1991']]]

  for(let i = 0; i < arr.length; i++) {
    if(year == arr[i][0]) {
      if(arr[i + 1]) {
        if(arr[i + 1][2] > 0 && i != (arr.length - 1)) {
          return arr[i + 1][1]
        } else if(i = (arr.length - 1)) {
          return arr[0][1]
        } else {
          let j = i + 1
          for(j; j < arr.length; j++) {
            if(arr[j][2] > 0 && j != (arr.length - 1)) {
              return arr[j][1]
            } 
          }
  
          for(let s = 0; s < arr.length; s++) {
            if(arr[s][2] > 0) {
              return arr[s][1]
            } 
          }
        }
      } else {
        return arr[0][1]
      }
    }
  }
}

wrap.querySelector('.four-item-btn-right').onclick = function() {
  if(objYearVisibl == 1985) {
    returnNumberFartherRight(1985).click()
  } else if(objYearVisibl == 1986) {
    returnNumberFartherRight(1986).click()
  } else if(objYearVisibl == 1987) {
    returnNumberFartherRight(1987).click()
  } else if(objYearVisibl == 1988) {
    returnNumberFartherRight(1988).click()
  } else if(objYearVisibl == 1989) {
    returnNumberFartherRight(1989).click()
  } else if(objYearVisibl == 1990) {
    returnNumberFartherRight(1990).click()
  } else if(objYearVisibl == 1991) {
    returnNumberFartherRight(1991).click()
  } else {
    position -= width * count
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px'
  }
  
  
}

wrap.querySelector('.four-item-btn-left').onclick = function() {
  position += width * count
  position = Math.min(position, 0)
  list.style.marginLeft = position + 'px'

  if(position == 0 && input.value != 1) {
    let count = Number(input.value) - 1

    if(count == 1) click1985.click()
    if(count == 2) click1986.click()
    if(count == 3) click1987.click()
    if(count == 4) click1988.click()
    if(count == 5) click1989.click()
    if(count == 6) click1990.click()
  }
}

if(Number(window.innerWidth) > 810) {
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
}

let startXFour = 0;
let endXFour = 0;

const sliderFour = document.querySelector(".four-item-list");

sliderFour.addEventListener('touchstart', (e) => {
  startXFour = e.touches[0].clientX;
});

sliderFour.addEventListener('touchmove', (e) => {
  endXFour = e.touches[0].clientX;
});

sliderFour.addEventListener('touchend', () => {
  const diff = startXFour - endXFour;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      if(objYearVisibl == 1985) {
        returnNumberFartherRight(1985).click()
      } else if(objYearVisibl == 1986) {
        returnNumberFartherRight(1986).click()
      } else if(objYearVisibl == 1987) {
        returnNumberFartherRight(1987).click()
      } else if(objYearVisibl == 1988) {
        returnNumberFartherRight(1988).click()
      } else if(objYearVisibl == 1989) {
        returnNumberFartherRight(1989).click()
      } else if(objYearVisibl == 1990) {
        returnNumberFartherRight(1990).click()
      } else if(objYearVisibl == 1991) {
        returnNumberFartherRight(1991).click()
      }

    } else {
      if(document.querySelector('.four-item-list').scrollLeft == 0 && input.value != 1) {
        let count = Number(input.value) - 1

        if(count == 1) click1985.click()
        if(count == 2) click1986.click()
        if(count == 3) click1987.click()
        if(count == 4) click1988.click()
        if(count == 5) click1989.click()
        if(count == 6) click1990.click()
      }
    }
  }
})

//Карусель 4 блок конец

//6 блок
if(Number(window.innerWidth) > 1070) {
  let sixWrap = document.querySelector('.six')
  let btnArrSix = document.querySelectorAll('.six-btn')

  sixWrap.addEventListener('mousemove', function(event) {
    const x = event.clientX; 

    if(x <= 200 || (window.innerWidth - x) <= 200) {
      btnArrSix[0].classList.remove('six-btn-hide')
      btnArrSix[1].classList.remove('six-btn-hide')
    } else {
      btnArrSix[0].classList.add('six-btn-hide')
      btnArrSix[1].classList.add('six-btn-hide')
    }
  })
}

let sixBooksWrap = document.querySelector('.six-books-wrap')
let sixH3 = document.querySelector('.six-h3')
let sixH2 = document.querySelector('.six-h2')
sixH3.innerHTML = sixBooksWrap.querySelector('#item-1').dataset.header
sixH2.innerHTML = sixBooksWrap.querySelector('#item-1').dataset.body

function sixItemUpdateLabel() {
  let sixBooksWrap = document.querySelector('.six-books-wrap')
  if(sixBooksWrap.querySelector('.carousel-center')) {
    sixH3.innerHTML = sixBooksWrap.querySelector('.carousel-center').dataset.header
    sixH2.innerHTML = sixBooksWrap.querySelector('.carousel-center').dataset.body
  }

  setTimeout(() => {
    sixItemUpdateLabel()
  }, 500)
}
  
sixItemUpdateLabel()


let currentBook = Number(window.innerWidth)
let widthBook = 340
let heightBook = 460
let distanceBook = 230

const fullScreen = 1980
let differenceBook = fullScreen - currentBook
let differencePercentBook = (((differenceBook / fullScreen) * 100) / 2).toFixed(0)

widthBook = (widthBook - (widthBook * (differencePercentBook / 100))).toFixed(0)
heightBook = (heightBook - (heightBook * (differencePercentBook / 100))).toFixed(0)
let distanceBook1 = (distanceBook - (distanceBook * (differencePercentBook / 100))).toFixed(0)

if(currentBook < 1690 && currentBook > 1425) {
  distanceBook = 196
} else if(currentBook < 1425 && currentBook > 1190) {
  distanceBook = 166
} else if(currentBook < 1190 && currentBook > 1070) {
  distanceBook = 138
} else if(currentBook < 1070) {
  distanceBook = 138
}

var carouselSix = $("#carousel").waterwheelCarousel({
  // number tweeks to change apperance
  startingItem:               1,   // item to place in the center of the carousel. Set to 0 for auto
  separation:                 distanceBook, // distance between items in carousel
  separationMultiplier:       0.8, // multipled by separation distance to increase/decrease distance for each additional item //умножается на расстояние разделения, чтобы увеличить/уменьшить расстояние для каждого дополнительного элемента
  horizonOffset:              0,   // offset each item from the "horizon" by this amount (causes arching) //смещает каждый элемент от «горизонта» на эту величину (вызывает изгиб)
  horizonOffsetMultiplier:    1,   // multipled by horizon offset to increase/decrease offset for each additional item //умножается на смещение горизонта для увеличения/уменьшения смещения для каждого дополнительного элемента
  sizeMultiplier:             0.8, // determines how drastically the size of each item changes //определяет, насколько сильно меняется размер каждого элемента
  opacityMultiplier:          1, // determines how drastically the opacity of each item changes //определяет, насколько сильно меняется непрозрачность каждого элемента
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
  forcedImageWidth:           widthBook,     // specify width of all images; otherwise the carousel tries to calculate it //  указать ширину всех изображений; в противном случае карусель попытается вычислить это
  forcedImageHeight:          heightBook,     // specify height of all images; otherwise the carousel tries to calculate it // указать длину всех изображений; в противном случае карусель попытается вычислить это

  // callback functions
  movingToCenter:             $.noop, // fired when an item is about to move to the center position
  movedToCenter:              $.noop, // fired when an item has finished moving to the center
  clickedCenter:              $.noop, // fired when the center item has been clicked
  movingFromCenter:           $.noop, // fired when an item is about to leave the center position
  movedFromCenter:            $.noop  // fired when an item has finished moving from the center
});

$('#prev').bind('click', function () {
  carouselSix.prev();
  return false
});

$('#next').bind('click', function () {
  carouselSix.next();
  return false;
});

let startX = 0;
let endX = 0;

const sliderSix = document.querySelector(".six-books-wrap");

sliderSix.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

sliderSix.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

sliderSix.addEventListener('touchend', () => {
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      carouselSix.next();
    } else {
      carouselSix.prev();
    }
  }
})
//6 блок конец

//7 блок

let sevenH3 = document.querySelector('.seven-h3')
let sevenP = document.querySelector('.seven-p')
let sevenWrapData = document.querySelector('.seven-photo-wrap')
sevenH3.innerHTML = sevenWrapData.querySelector('#item-1').dataset.header
sevenP.innerHTML = sevenWrapData.querySelector('#item-1').dataset.body

if(Number(window.innerWidth) > 1000) {
  let sevenWrap = document.querySelector('.seven')
  let btnArrSeven = document.querySelectorAll('.seven-btn')

  sevenWrap.addEventListener('mousemove', function(event) {
    const x = event.clientX; 

    if(x <= 200 || (window.innerWidth - x) <= 200) {
      btnArrSeven[0].classList.remove('seven-btn-hide')
      btnArrSeven[1].classList.remove('seven-btn-hide')
    } else {
      btnArrSeven[0].classList.add('seven-btn-hide')
      btnArrSeven[1].classList.add('seven-btn-hide')
    }
  })
}

let currentSeven = Number(window.innerWidth)
let widthSeven = 1054
let heightSeven = 794
let distanceSeven = 200

const fullScreenSeven = 1980
let differenceSeven = fullScreen - currentSeven
let differencePercentSeven = (((differenceSeven / fullScreen) * 100) / 1).toFixed(0)

widthSeven = (widthSeven - (widthSeven * (differencePercentSeven / 100))).toFixed(0)
heightSeven = (heightSeven - (heightSeven * (differencePercentSeven/ 100))).toFixed(0)
let distanceSeven1 = (distanceSeven - (distanceSeven * (differencePercentSeven / 100))).toFixed(0)

if(currentSeven < 700) {
  widthSeven = 396
  heightSeven = 282
} 

var carouselSeven = $("#carousel-photo").waterwheelCarousel({
  // number tweeks to change apperance
  startingItem:               1,   // item to place in the center of the carousel. Set to 0 for auto
  separation:                 200, // distance between items in carousel
  separationMultiplier:       0.8, // multipled by separation distance to increase/decrease distance for each additional item //умножается на расстояние разделения, чтобы увеличить/уменьшить расстояние для каждого дополнительного элемента
  horizonOffset:              0,   // offset each item from the "horizon" by this amount (causes arching) //смещает каждый элемент от «горизонта» на эту величину (вызывает изгиб)
  horizonOffsetMultiplier:    1,   // multipled by horizon offset to increase/decrease offset for each additional item //умножается на смещение горизонта для увеличения/уменьшения смещения для каждого дополнительного элемента
  sizeMultiplier:             0.8, // determines how drastically the size of each item changes //определяет, насколько сильно меняется размер каждого элемента
  opacityMultiplier:          1, // determines how drastically the opacity of each item changes //определяет, насколько сильно меняется непрозрачность каждого элемента
  horizon:                    0,   // how "far in" the horizontal/vertical horizon should be set from the container wall. 0 for auto //насколько «далеко» должен быть установлен горизонтальный/вертикальный горизонт от стенки контейнера. 0 для авто
  flankingItems:              2,   // the number of items visible on either side of the center //количество предметов, видимых по обе стороны от центра                  

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
  imageNav:                   false,              // clicking a non-center image will rotate that image to the center //щелчок по изображению, расположенному не по центру, повернет это изображение в центр

  // preloader
  preloadImages:              true,  // disable/enable the image preloader. //отключить/включить предзагрузчик изображений.
  forcedImageWidth:           widthSeven,     // specify width of all images; otherwise the carousel tries to calculate it //  указать ширину всех изображений; в противном случае карусель попытается вычислить это
  forcedImageHeight:          heightSeven,     // specify height of all images; otherwise the carousel tries to calculate it // указать длину всех изображений; в противном случае карусель попытается вычислить это

  // callback functions
  movingToCenter:             $.noop, // fired when an item is about to move to the center position
  movedToCenter:              $.noop, // fired when an item has finished moving to the center
  clickedCenter:              $.noop, // fired when the center item has been clicked
  movingFromCenter:           $.noop, // fired when an item is about to leave the center position
  movedFromCenter:            $.noop  // fired when an item has finished moving from the center
});

$('#prev-photo').bind('click', function () {
  carouselSeven.prev();

  setTimeout(()=> {
    let sevenWrapData = document.querySelector('.seven-photo-wrap')
    sevenH3.innerHTML = sevenWrapData.querySelector('.carousel-center').dataset.header
    sevenP.innerHTML = sevenWrapData.querySelector('.carousel-center').dataset.body
  }, 500)

  return false
});

$('#next-photo').bind('click', function () {
  carouselSeven.next();

  setTimeout(()=> {
    let sevenWrapData = document.querySelector('.seven-photo-wrap')
    sevenH3.innerHTML = sevenWrapData.querySelector('.carousel-center').dataset.header
    sevenP.innerHTML = sevenWrapData.querySelector('.carousel-center').dataset.body
  }, 500)



  return false;
});

let startXSeven = 0;
let endXSeven = 0;

const sliderSeven = document.querySelector(".seven-wrap");

sliderSeven.addEventListener('touchstart', (e) => {
  startXSeven = e.touches[0].clientX;
});

sliderSeven.addEventListener('touchmove', (e) => {
  endXSeven = e.touches[0].clientX;
});

sliderSeven.addEventListener('touchend', () => {
  const diff = startXSeven - endXSeven;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      carouselSeven.next();
      setTimeout(()=> {
        let sevenWrapData = document.querySelector('.seven-photo-wrap')
        sevenH3.innerHTML = sevenWrapData.querySelector('.carousel-center').dataset.header
        sevenP.innerHTML = sevenWrapData.querySelector('.carousel-center').dataset.body
      }, 500)
    } else {
      carouselSeven.prev();
      setTimeout(()=> {
        let sevenWrapData = document.querySelector('.seven-photo-wrap')
        sevenH3.innerHTML = sevenWrapData.querySelector('.carousel-center').dataset.header
        sevenP.innerHTML = sevenWrapData.querySelector('.carousel-center').dataset.body
      }, 500)
    }
  }
})

//7 блок конец

//8 блок 
let eightVideo = document.querySelector('.eight-video')
let eightVideoBtn = document.querySelector('.eight-play')

let eightH3 = document.querySelector('.eight-h3')
let eightP = document.querySelector('.eight-p')
let eightWrapData = document.querySelector('.eight-photo-wrap')
eightH3.innerHTML = eightWrapData.querySelector('#item-1').dataset.header
eightP.innerHTML = eightWrapData.querySelector('#item-1').dataset.body
eightVideo.src = eightWrapData.querySelector('#item-1').dataset.video

if(Number(window.innerWidth) > 1000) {
  let eightWrap = document.querySelector('.eight')
  let btnArrEight = document.querySelectorAll('.eight-btn')

  eightWrap.addEventListener('mousemove', function(event) {
    const x = event.clientX; 

    if(x <= 200 || (window.innerWidth - x) <= 200) {
      btnArrEight[0].classList.remove('eight-btn-hide')
      btnArrEight[1].classList.remove('eight-btn-hide')
    } else {
      btnArrEight[0].classList.add('eight-btn-hide')
      btnArrEight[1].classList.add('eight-btn-hide')
    }
  })
}

let currentEight = Number(window.innerWidth)
let widthEight = 1054
let heightEight = 794
let distanceEight = 200

const fullScreenEight = 1980
let differenceEight = fullScreen - currentEight
let differencePercentEight = (((differenceEight / fullScreen) * 100) / 1).toFixed(0)

widthEight = (widthEight - (widthEight * (differencePercentEight / 100))).toFixed(0)
heightEight = (heightEight - (heightEight * (differencePercentEight/ 100))).toFixed(0)
let distanceEight1 = (distanceEight - (distanceEight * (differencePercentEight / 100))).toFixed(0)

if(currentEight < 700) {
  widthEight = 396
  heightEight = 282
} 

eightVideo.width = Number(widthEight) + (Number(widthEight) * 0.06)
eightVideo.height = Number(heightEight) + (Number(heightEight)  * 0.06)

var carouselEight = $("#carousel-eight").waterwheelCarousel({
  // number tweeks to change apperance
  startingItem:               1,   // item to place in the center of the carousel. Set to 0 for auto
  separation:                 200, // distance between items in carousel
  separationMultiplier:       0.8, // multipled by separation distance to increase/decrease distance for each additional item //умножается на расстояние разделения, чтобы увеличить/уменьшить расстояние для каждого дополнительного элемента
  horizonOffset:              0,   // offset each item from the "horizon" by this amount (causes arching) //смещает каждый элемент от «горизонта» на эту величину (вызывает изгиб)
  horizonOffsetMultiplier:    1,   // multipled by horizon offset to increase/decrease offset for each additional item //умножается на смещение горизонта для увеличения/уменьшения смещения для каждого дополнительного элемента
  sizeMultiplier:             0.8, // determines how drastically the size of each item changes //определяет, насколько сильно меняется размер каждого элемента
  opacityMultiplier:          1, // determines how drastically the opacity of each item changes //определяет, насколько сильно меняется непрозрачность каждого элемента
  horizon:                    0,   // how "far in" the horizontal/vertical horizon should be set from the container wall. 0 for auto //насколько «далеко» должен быть установлен горизонтальный/вертикальный горизонт от стенки контейнера. 0 для авто
  flankingItems:              1,   // the number of items visible on either side of the center //количество предметов, видимых по обе стороны от центра                  

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
  imageNav:                   false,              // clicking a non-center image will rotate that image to the center //щелчок по изображению, расположенному не по центру, повернет это изображение в центр

  // preloader
  preloadImages:              true,  // disable/enable the image preloader. //отключить/включить предзагрузчик изображений.
  forcedImageWidth:           widthEight,     // specify width of all images; otherwise the carousel tries to calculate it //  указать ширину всех изображений; в противном случае карусель попытается вычислить это
  forcedImageHeight:          heightEight,     // specify height of all images; otherwise the carousel tries to calculate it // указать длину всех изображений; в противном случае карусель попытается вычислить это

  // callback functions
  movingToCenter:             $.noop, // fired when an item is about to move to the center position
  movedToCenter:              $.noop, // fired when an item has finished moving to the center
  clickedCenter:              $.noop, // fired when the center item has been clicked
  movingFromCenter:           $.noop, // fired when an item is about to leave the center position
  movedFromCenter:            $.noop  // fired when an item has finished moving from the center
});

$('#prev-eight').bind('click', function () {
  carouselEight.prev();

  setTimeout(()=> {
    let eightWrapData = document.querySelector('.eight-photo-wrap')
    if(eightWrapData.querySelector('.eight-btn-hide')) eightWrapData.querySelector('.eight-btn-hide').classList.remove('eight-btn-hide')
    eightH3.innerHTML = eightWrapData.querySelector('.carousel-center').dataset.header
    eightP.innerHTML = eightWrapData.querySelector('.carousel-center').dataset.body
    eightVideo.src = eightWrapData.querySelector('.carousel-center').dataset.video

    eightVideo.classList.add('eight-btn-hide')
    eightVideo.pause()
  }, 500)

  return false
});

$('#next-eight').bind('click', function () {
  carouselEight.next();

  setTimeout(()=> {
    let eightWrapData = document.querySelector('.eight-photo-wrap')
    if(eightWrapData.querySelector('.eight-btn-hide')) eightWrapData.querySelector('.eight-btn-hide').classList.remove('eight-btn-hide')
    eightH3.innerHTML = eightWrapData.querySelector('.carousel-center').dataset.header
    eightP.innerHTML = eightWrapData.querySelector('.carousel-center').dataset.body
    eightVideo.src = eightWrapData.querySelector('.carousel-center').dataset.video

    eightVideo.classList.add('eight-btn-hide')
    eightVideo.pause()
  }, 500)



  return false;
});

let startXEight = 0;
let endXEight = 0;

const sliderEight = document.querySelector(".eight-wrap");

sliderEight.addEventListener('touchstart', (e) => {
  startXEight = e.touches[0].clientX;
});

sliderEight.addEventListener('touchmove', (e) => {
  endXEight = e.touches[0].clientX;
});

sliderEight.addEventListener('touchend', (e) => {
  const diff = startXEight - endXEight;

  if (Math.abs(diff) > 100 && !e.target.classList.contains('eight-play-btn')) {
    if (diff > 0) {
      carouselEight.next();
      setTimeout(()=> {
        let eightWrapData = document.querySelector('.eight-photo-wrap')
        if(eightWrapData.querySelector('.eight-btn-hide')) eightWrapData.querySelector('.eight-btn-hide').classList.remove('eight-btn-hide')
        eightH3.innerHTML = eightWrapData.querySelector('.carousel-center').dataset.header
        eightP.innerHTML = eightWrapData.querySelector('.carousel-center').dataset.body
        eightVideo.src = eightWrapData.querySelector('.carousel-center').dataset.video

        eightVideo.classList.add('eight-btn-hide')
        eightVideo.pause()
      }, 500)
    } else {
      carouselEight.prev();
      setTimeout(()=> {
        let eightWrapData = document.querySelector('.eight-photo-wrap')
        if(eightWrapData.querySelector('.eight-btn-hide')) eightWrapData.querySelector('.eight-btn-hide').classList.remove('eight-btn-hide')
        eightH3.innerHTML = eightWrapData.querySelector('.carousel-center').dataset.header
        eightP.innerHTML = eightWrapData.querySelector('.carousel-center').dataset.body
        eightVideo.src = eightWrapData.querySelector('.carousel-center').dataset.video

        eightVideo.classList.add('eight-btn-hide')
        eightVideo.pause()
      }, 500)
    }
  }
})

eightVideoBtn.addEventListener('click', (e) => {
  let eightWrapData = document.querySelector('.eight-photo-wrap')
  eightWrapData.querySelector('.carousel-center').classList.add('eight-btn-hide')
  eightVideo.classList.remove('eight-btn-hide')
  eightVideo.play()
  
})

//8 блок конец