document.addEventListener('DOMContentLoaded', function (event) { 
  let basketItems = document.querySelector('.basket-content__items');

  basketItems.addEventListener('click', hideItems); 

  function hideItems(event) {
    if(event.target.closest('.remove-btn')) {
      let item = document.querySelector(`.${event.target.getAttribute('data-id')}`);
      item.style.display = 'none';

      let panel = document.querySelector(`.p${event.target.getAttribute('data-id')}`);
      panel.style.display = 'flex';
    }
    
  }

  if(JSON.parse(localStorage.getItem('basket'))) {
    let arrItems = JSON.parse(localStorage.getItem('basket'));
    let content = '';

    for(let i = 0; i < arrItems.length; i++) {
      content += `
        <div class="items-panel p${arrItems[i].med}${arrItems[i].number}">
          <div class="items-panel__left">
            Товар <b>${arrItems[i].nameMed}</b> был удален из корзины
          </div>
          <div class="items-panel__center" data-id="${arrItems[i].med}${arrItems[i].number}">
            Восстановить
          </div>
          <div class="items-panel__right" data-id="${arrItems[i].med}${arrItems[i].number}">
            <svg data-id="${arrItems[i].med}${arrItems[i].number}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L12 12M20 4L12 12M20 20L12 12M4 20L12 12" stroke="#B4B4B4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        </div>
        <div class="basket-content__item ${arrItems[i].med}${arrItems[i].number}">
          <img class="item-img" src="${arrItems[i].img}">
          <div class="item-name">
            ${arrItems[i].nameMed}
          </div>
          <div class="item-price">
            <div class="item-price__kg">
              цена за 1 кг
            </div>
            <div class="item-price__number">
              <span class="price${arrItems[i].med}${arrItems[i].number}">${arrItems[i].price}</span> руб.
            </div>
          </div>
          <div class="item-panel">
            <div class="item-panel__total">
              <button class="buy-panel__btn minus" data-id="${arrItems[i].med}${arrItems[i].number}"><span data-id="${arrItems[i].med}${arrItems[i].number}">-</span></button><input class="buy-panel__input input${arrItems[i].med}${arrItems[i].number}" type="text" min="1" value="${arrItems[i].volume}" maxquantity="9" ratio="1"><button class="buy-panel__btn plus" data-id="${arrItems[i].med}${arrItems[i].number}"><span data-id="${arrItems[i].med}${arrItems[i].number}">+</span></button>
              <div class="total">
                <span class="span${arrItems[i].med}${arrItems[i].number}">${arrItems[i].price * arrItems[i].volume}</span> руб.
              </div>
            </div>
            <div class="item-panel__remove">
              <button class="remove-btn" data-id="${arrItems[i].med}${arrItems[i].number}">
                <span class="remove-btn__span" data-id="${arrItems[i].med}${arrItems[i].number}">
                  <span class="remove-btn__svg" data-id="${arrItems[i].med}${arrItems[i].number}">
                  <svg data-id="${arrItems[i].med}${arrItems[i].number}" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="2" id="_2"><path d="M30,13H21.69L18.38,4.3,16.51,5l3,8h-7.1l3-8L13.63,4.3,10.31,13H2v2H3.13L5,28.14A1,1,0,0,0,6,29H26a1,1,0,0,0,1-.86L28.87,15H30ZM25.13,27H6.87L5.15,15h21.7Z" id="basket_empty_shop_buy"/></g></svg>
                  </span>
                  <span class="remove-btn__inscription" data-id="${arrItems[i].med}${arrItems[i].number}">
                    УДАЛИТЬ                        
                  </span>
                </span>
                </button>
            </div>
          </div>
        </div>
      `;
    }

    basketItems.insertAdjacentHTML('beforeend', content);

    let btnReestablish = document.querySelector('.basket-content__items');
    let itogo = document.querySelector('.total-items__number span');

    btnReestablish.addEventListener('click', reestablish); 

    function reestablish(event) {
      if(event.target.closest('.items-panel__center')) {
        let item = document.querySelector(`.${event.target.getAttribute('data-id')}`);
        item.style.display = 'flex';

        let panel = document.querySelector(`.p${event.target.getAttribute('data-id')}`);
        panel.style.display = 'none';

      } else if(event.target.closest('.items-panel__right')) {
        let panel = document.querySelector(`.p${event.target.getAttribute('data-id')}`);
        let span = document.querySelector(`.span${event.target.getAttribute('data-id')}`);
        span.innerHTML = 0;

        panel.style.display = 'none';

        let data = event.target.getAttribute('data-id');
        let arr = JSON.parse(localStorage.getItem('basket'));

        for(let i = 0; i < arr.length; i++) {
          if((arr[i].med + arr[i].number) == data) {
            arr.splice(i, 1);
            break;
          }
        }

        let countBasket = document.querySelector('.header-basket__count');
        countBasket.innerHTML = arr.length;

        if(arr.length > 0) {
          localStorage.setItem('basket', JSON.stringify(arr));
          setTimeout(() => {totalCount()}, 500);
        } else {
          localStorage.removeItem('basket');
          window.location.href = '/page/basket';
        }
        
      } else if(event.target.closest('.minus')) {
        let input = document.querySelector(`.input${event.target.getAttribute('data-id')}`);
        let price = document.querySelector(`.price${event.target.getAttribute('data-id')}`);
        let total = document.querySelector(`.span${event.target.getAttribute('data-id')}`);

        let inputNumber = Number(input.value);
        let priceSpan = Number(price.innerText);

        if(inputNumber >= 2) {
          inputNumber--;
          input.value = inputNumber;
          total.innerText = priceSpan * inputNumber;
          totalCount();
        }

      } else if(event.target.closest('.plus')) {
        let input = document.querySelector(`.input${event.target.getAttribute('data-id')}`);
        let price = document.querySelector(`.price${event.target.getAttribute('data-id')}`);
        let total = document.querySelector(`.span${event.target.getAttribute('data-id')}`);

        let inputNumber = Number(input.value);
        let priceSpan = Number(price.innerText);

        inputNumber++;
        if(inputNumber <= 99) {
          input.value = inputNumber;
          total.innerText = priceSpan * inputNumber;
          totalCount();
        }

      }
      
    }

    function totalCount() {
      let total = document.querySelectorAll('.total span');
      let result = 0;
      total.forEach(function(item) {
        result += Number(item.innerHTML);
      })
      
      itogo.innerHTML = result;
    }

    totalCount();
  

  } else {
    let basket = document.querySelector('.basket-content');
    basket.innerHTML = `
      <div class="basket-content__not">
        <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <path d="M127.211 26.6696C126.439 25.61 125.205 24.9829 123.893 24.9829H31.4871C31.308 24.9829 31.1293 24.9938 30.9571 25.017L27.1542 14.0544C26.76 12.9206 25.8921 12.0169 24.7766 11.5777L5.61054 4.04858C3.49823 3.22159 1.11464 4.25912 0.285072 6.36886C-0.543067 8.47974 0.494183 10.8648 2.60535 11.6943L20.0126 18.5326L41.3193 79.948C40.3789 80.2757 39.582 80.9973 39.2191 82.0068L33.0586 99.1193C32.681 100.169 32.8366 101.334 33.4791 102.246C34.1207 103.158 35.1643 103.701 36.2786 103.701H39.4422C37.4817 105.882 36.2786 108.756 36.2786 111.915C36.2786 118.709 41.8066 124.236 48.5996 124.236C55.3925 124.236 60.9205 118.709 60.9205 111.915C60.9205 108.756 59.7174 105.882 57.7569 103.701H84.6195C82.6581 105.882 81.4547 108.756 81.4547 111.915C81.4547 118.709 86.9816 124.236 93.776 124.236C100.57 124.236 106.097 118.709 106.097 111.915C106.097 108.756 104.894 105.882 102.934 103.701H106.782C108.672 103.701 110.204 102.169 110.204 100.278C110.204 98.3879 108.672 96.856 106.782 96.856H41.1483L44.9636 86.2583C45.4563 86.4657 45.9885 86.5883 46.5457 86.5883H106.781C108.566 86.5883 110.147 85.4348 110.691 83.7355L127.803 30.3442C128.205 29.0941 127.984 27.7292 127.211 26.6696ZM48.5996 117.391C45.5795 117.391 43.1237 114.935 43.1237 111.915C43.1237 108.895 45.5795 106.439 48.5996 106.439C51.6196 106.439 54.0754 108.895 54.0754 111.915C54.0754 114.935 51.6196 117.391 48.5996 117.391ZM93.7757 117.391C90.7556 117.391 88.2995 114.935 88.2995 111.915C88.2995 108.895 90.7556 106.439 93.7757 106.439C96.7955 106.439 99.2515 108.895 99.2515 111.915C99.2515 114.935 96.7955 117.391 93.7757 117.391ZM115.304 42.4377H94.3463V33.197H118.265L115.304 42.4377ZM109.269 61.2612H94.3463V50.6515H112.67L109.269 61.2612ZM67.1939 61.2612V50.6515H86.1322V61.2612H67.1939ZM86.1322 69.4758V78.3743H67.1939V69.4758H86.1322ZM39.8501 50.6515H58.9807V61.2612H43.5313L39.8501 50.6515ZM67.1939 42.4377V33.197H86.1322V42.4377H67.1939ZM58.9804 33.197V42.4377H36.9996L33.7939 33.197H58.9804ZM46.3815 69.4758H58.9804V78.3743H49.4684L46.3815 69.4758ZM94.3463 78.3745V69.4761H106.638L103.786 78.3745H94.3463Z" fill="#F2F2F2"></path>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="128" height="128" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
        <p class="not-basket">Ваша корзина пуста</p>
        <p class="not-katalog">
          Выберите нужный Вам товар из каталога </br>
          интернет-магазина и добавьте его в корзину
        </p>
        <a class="not-link" href="/page/catalog">Перейти в каталог</a>
      </div>
    `;
  }
});