document.addEventListener('DOMContentLoaded', function (event) { 
  let items = document.querySelector('.content-categori__items');

  items.addEventListener('mouseover', mouseOver); 
  items.addEventListener('mouseout', mouseOut); 

  function mouseOver(event) {
    if(event.target.classList.contains('img')) {
      let btn = document.querySelector(`.b${event.target.getAttribute('data-id')}`);
      btn.style.opacity = 1;
    }
    
  }

  function mouseOut(event) {
    if(event.target.classList.contains('img')) {
      let btn = document.querySelector(`.b${event.target.getAttribute('data-id')}`);
      btn.style.opacity = 0;
    }
    
  }

});