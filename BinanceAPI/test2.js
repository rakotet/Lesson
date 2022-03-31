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

// async function fibaTraid(coin) {
//   try {
//     let time = 0
//     let i = Number(Date.now())
//     // let data = await binance.futuresPositionRisk({symbol: coin}) 

//     // if(data.code) {
//     //   console.log(data.code + ' - ' + data.msg);
//     // }

//     let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 1}) 
//     if(candlesSymbol.code) {
//       console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
//     }

//     //let markPrice = Number(data[0]['markPrice']) // текущая цена 
//     let markPrice1 = Number(candlesSymbol[candlesSymbol.length - 1][4]) // текущая цена 
//     //time = Number((new Date(Number(candlesSymbol[candlesSymbol.length - 1][0]))).getMinutes()) // время открытия свечи
    
//     //console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - цена markPrice - ' + markPrice);
//     console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - цена свеча - ' + markPrice1);
//     console.log(Number(Date.now()) - i + '\n');
//     // console.log(time);
//     // console.log(Number((new Date()).getMinutes()));

//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'fibaTraid');
//   }

//   setTimeout(() => {
//     fibaTraid(coin)
//   }, 10)
// }

// fibaTraid('ZILUSDT')

// binance.depth("RUNEUSDT", (error, depth, symbol) => {
//   console.info(symbol+" market depth", depth);
//   //console.log(new Date(depth['lastUpdateId']).getHours() + ' : ' + new Date(depth['lastUpdateId']).getMinutes());
// }, 5);



function ass(coin) {
  //console.log(new Date().getSeconds())
  binance.depth(coin, (error, depth, symbol) => {
    let maxBids = [0, 0]
    let maxAsks = [0, 0]
    let volumeBids = 0
    let volumeAsks = 0
  
    for(let price in depth['bids']) {
      //maxBids = maxBids > depth['bids'][price] ? maxBids : depth['bids'][price]
      
      if(maxBids[1] < depth['bids'][price]) {
        maxBids[0] = price
        maxBids[1] = depth['bids'][price]
      }

      volumeBids += depth['bids'][price]
    }
  
    for(let price in depth['asks']) {
      //maxAsks = maxAsks > depth['asks'][price] ? maxAsks : depth['asks'][price]

      if(maxAsks[1] < depth['asks'][price]) {
        maxAsks[0] = price
        maxAsks[1] = depth['asks'][price]
      }

      volumeAsks += depth['asks'][price]
    }
  
  
    console.log('------------------');
    console.log(`${maxAsks[0]} : ${maxAsks[1]} - продать - средний объем - ${volumeAsks / 100}`);
    console.log(`${maxBids[0]} : ${maxBids[1]} - купить - средний объем - ${volumeBids / 100}`);
    console.log('------------------');
    //console.log(new Date().getSeconds())
  }, 100);

 
  setTimeout(() => {
    ass(coin)
  }, 1000)
}

ass('ZILUSDT')

