document.addEventListener('DOMContentLoaded', function (event) { 
  let btn = document.querySelector('.price-button');
  let btnClose = document.querySelector('.modal-btn__close');
  let modal = document.querySelector('.container-buy');
  let minus = document.querySelector('.minus');
  let plus = document.querySelector('.plus');
  let input = document.querySelector('.buy-panel__input');
  let basketBtn = document.querySelector('.basket-btn');
  let buy = document.querySelector('.basket-btn__buy');
  let buyPrice = document.querySelector('.buy-price');
  const buyPriceNumber = Number(buyPrice.innerHTML);
  let inputNumber = input.value;
  let basketCountHeader = document.querySelector('.header-basket__count');
  let nameMed = document.querySelector('.container-product h1').innerHTML;
  let img = document.querySelector('.product-main__photo img').getAttribute('src');
  var gets;

  btn.addEventListener('click', openModal); 
  btnClose.addEventListener('click', closeModal); 
  minus.addEventListener('click', btnMinus); 
  plus.addEventListener('click', btnPlus); 
  basketBtn.addEventListener('click', btnBasket); 
  buy.addEventListener('click', btnBuy); 
  input.addEventListener('input', setInput);
  // document.body.addEventListener('click', closeModalBody); 

  function openModal(event) {
    if(btn.innerHTML.trim() == 'Купить') {
      modal.classList.remove('close')
    
      gets = (function() {
        var a = window.location.search;
        var b = new Object();
        a = a.substring(1).split("&");
        for (var i = 0; i < a.length; i++) {
        c = a[i].split("=");
            b[c[0]] = c[1];
        }
        return b;
      })();
  
      if(JSON.parse(localStorage.getItem('basket'))) {
        let arr = JSON.parse(localStorage.getItem('basket'));
  
        for(let i = 0; i < arr.length; i++) {
          if(arr[i].med == gets.med && arr[i].number == gets.number) {
            setBtn();
          }
        }
      }
    } else {
      btn.innerHTML = 'Заявка отправлена!';
    }
  }

  function closeModal(event) {
    modal.classList.add('close')
  }

  // function closeModalBody(event) {
  //   console.log(event.target.classList);
  //   if(!event.target.classList.contains('container-buy__modal')) modal.classList.add('close')
  // }

  function btnMinus(event) {
    if(inputNumber >= 2) {
      inputNumber--;
      input.value = inputNumber;
      buyPrice.innerHTML = buyPriceNumber * Number(input.value)
    }
  }

  function btnPlus(event) {
    inputNumber++;
    if(inputNumber <= 99) {
      input.value = inputNumber;
      buyPrice.innerHTML = buyPriceNumber * Number(input.value)
    }
  }

  function btnBasket(event) {
    if(basketBtn.innerHTML.trim() == 'Выбрать') {
      setBtn();

      if(JSON.parse(localStorage.getItem('basket'))) {
        let arr = JSON.parse(localStorage.getItem('basket'))
        gets.volume = Number(input.value);
        gets.img = img;
        gets.price = buyPriceNumber;
        gets.nameMed = nameMed;
        arr.push(gets);
        localStorage.setItem('basket', JSON.stringify(arr))
      } else {
        gets.volume = Number(input.value);
        gets.img = img;
        gets.price = buyPriceNumber;
        gets.nameMed = nameMed;
        gets = [gets];
        localStorage.setItem('basket', JSON.stringify(gets))
      }

      let count = JSON.parse(localStorage.getItem('basket'));
      basketCountHeader.innerHTML = count.length;
    }
  }

  function btnBuy(event) {
    if(buy.getAttribute('data') == 1) {
      window.location.href = '/page/basket';
    }
  }

  function setInput(event) {
    inputNumber = input.value;
    buyPrice.innerHTML = buyPriceNumber * Number(input.value)
    if(input.value == 0 || !Number.isInteger(Number(input.value)) || input.value > 99) {
      input.value = 1;
      inputNumber = input.value;
      buyPrice.innerHTML = buyPriceNumber * Number(input.value)
    }
  }

  function setBtn() {
    basketBtn.style.background = '#fff';
    basketBtn.style.color = '#9D0606';
    basketBtn.innerHTML = 'В корзине';
    buy.style.cursor = 'pointer';
    buy.style.background = '#f68e0b';
    buy.style.color = '#fff';
    buy.setAttribute('data', 1);
    basketBtn.style.cursor = 'default';
  }
});