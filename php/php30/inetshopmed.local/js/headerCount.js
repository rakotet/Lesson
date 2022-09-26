document.addEventListener('DOMContentLoaded', function (event) { 
  let basketCountHeader = document.querySelector('.header-basket__count');
  
  if(JSON.parse(localStorage.getItem('basket'))) {
    let count = JSON.parse(localStorage.getItem('basket'));
    basketCountHeader.innerHTML = count.length;
  }
});