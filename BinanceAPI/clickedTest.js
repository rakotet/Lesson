// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.binance.com/ru/nft/mystery-box/detail?number=1&productId=173304848325765120
// @icon         https://www.google.com/s2/favicons?domain=binance.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

const delay = ms => new Promise(res => setTimeout(res, ms));

let buyerInterval = setInterval(buyer, 1)

function buyer() {
const block = document.querySelector('.css-1qgfy5c'),
      buyBtn = block.querySelector('button');
if (buyBtn.disabled) {
      console.log('Не активна')

} else {
clearInterval(buyerInterval)
setInterval(buyer2, 1000)
}
}

async function buyer2() {
const block = document.querySelector('.css-1qgfy5c'),
      buyBtn = block.querySelector('button');
console.log('Пробую купить')
buyBtn.click();
buyBtn.click();
await delay(2000)
location.reload();
}
})();