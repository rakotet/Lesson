// const delay = ms => new Promise(res => setTimeout(res, ms));

// async function ff() {
//   for(let i = 0; i < 5; i++) {
//     console.log(i);
//     await delay(5000)
//   }
// }

// ff()


const balanceFiat = require('./function/balanceFiat')
const numberOfSigns = require('./function/numberOfSigns')
//const plate = require('./function/plate')
//let fapi = 'https://www.binance.com/futures/';
let fapi = 'https://www.binance.com/bapi/nft/v1/friendly/nft/mystery-box/';
let fapi2 = 'https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase';
const delay = ms => new Promise(res => setTimeout(res, ms));
const opn = require('opn')
const fs = require('fs')

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});

async function fibaTraid(coin) {
  try {
    let i = Number(Date.now())
    let data = await binance.futuresPositionRisk({symbol: coin}) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    // let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 1}) 
    // if(candlesSymbol.code) {
    //   console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
    // }

    let markPrice = Number(data[0]['markPrice']) // текущая цена 
    //let markPrice1 = Number(candlesSymbol[candlesSymbol.length - 1][4]) // текущая цена 
    
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - цена markPrice - ' + markPrice);
    //console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - цена свеча - ' + markPrice1);
    console.log(Number(Date.now()) - i + '\n');

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'fibaTraid');
  }

  setTimeout(() => {
    fibaTraid(coin)
  }, 10)
}

fibaTraid('ZILUSDT')