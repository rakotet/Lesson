const balanceFiat = require('./function/balanceFiat')
const numberOfSigns = require('./function/numberOfSigns')

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});


console.log(2 < 2);

// async function getCandles(coin, binance) { // получить свечи
//   try{
//     let data = await binance.futuresCandles(coin, '1m', {limit: 20}) 
//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//     }

//       let volumeCandlesAll = 0

//       for(let i = 0; i < data.length - 2; i++) {
//         let volume = Number(data[i][5]) // объём 1
//         volumeCandlesAll = volumeCandlesAll + volume
//       }

//       let meanVolume = volumeCandlesAll / (data.length - 2)
//       console.log(Number(data[data.length - 2][5]));

//       if(Number(data[data.length - 2][5]) > (meanVolume * 5)) {

//       }

//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'getCandles');
//   }
  
// }

// function getDate(date) { // время свечи
//     return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${new Date().getSeconds()}`
// }

// getCandles('1000SHIBUSDT', binance)


// function s() {
//   if((new Date().getSeconds()) === 2) {
//     console.log(new Date().toLocaleTimeString());
//   } else if ((new Date().getSeconds()) === 58) {
//     console.log(new Date().toLocaleTimeString());
//   }

//   setTimeout(()=> {
//     s()
//   }, 1000)
// }

// s()


// const fs = require('fs')

// balanceFiat('USDT', binance).then(balance => {
//   console.log(balance);
// })

// async function sellMarketCoin(coin, number) { // продать монетку по рынку
//   try {
//     let data = await binance.futuresMarketSell(coin, Number(number)) 
//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//     }
  
//     let price = data['price']
//     console.log(price);
//     return Number(price)
//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'sellCoin');
//   }
// }

// async function futuresPositionRisk() { // авто продажа
//   try {
//     let data = await binance.futuresPositionRisk() 
//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//       throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - futuresPositionRisk')
//     }
  
//     let markets = Object.keys( data );
//     for ( let market of markets ) {
//       let obj = data[market], size = Number( obj.positionAmt );
//       if ( size != 0 ) {
//         let entryPrice = Number(obj['entryPrice'])
//         let markPrice = Number(obj['markPrice'])
//         let positionAmt = Number(obj['positionAmt'])
//         let pricePlus = entryPrice + (entryPrice * 0.005) // +5% PNL
//         let priceMinus = entryPrice - (entryPrice * 0.005) // -5% PNL
      
//         // console.log('markPrice >= pricePlus: ' + markPrice + ' | ' + pricePlus);

//         if((markPrice >= pricePlus) || (markPrice <= priceMinus)) {
//           positionAmt < 0 ? (positionAmt * (-1)) : positionAmt
//           sellMarketCoin(obj['symbol'], positionAmt).then(price => {
//             console.log(new Date().toLocaleTimeString() + ' Продали: ' + obj['symbol'] + ' По цене: ' + price)
//           })
//         }
//       }
//     }
//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresPositionRisk');
//   }

//   setTimeout(() => {
//     futuresPositionRisk()
//   }, 3000)
// }

// futuresPositionRisk()






// async function futuresOpenOrders() { // открытые позиции
//   try {
//     data = await binance.futuresCancelAll('GALAUSDT') 

//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//     }

//     console.log(data);
//     console.log('--------------------------------------------------------');

//     // setTimeout(() => {
//     //   futuresOpenOrders()
//     // }, 5000)

//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'futuressHoulder');
//   }
// }

// futuresOpenOrders()

// async function futuressHoulder(coin, houlder) { // выставление плеча
//     try {
//       data = await binance.futuresLeverage(coin, houlder) 

//       if(data.code) {
//         console.log(data.code + ' - ' + data.msg);
//       }

//       return data['leverage']

//     } catch(e) {
//       console.log(e);
//       console.log(new Date().toLocaleTimeString() + ' - ' + 'futuressHoulder');
//     }
// }

// futuressHoulder('ETHUSDT', 20).then(data => {
//   console.log(data);
// })

// async function futuresMarginType(coin) { // какая маржа
//   try {
//     data = await binance.futuresMarginType(coin, 'ISOLATED') 

//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//     }

//     return 1

//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'futuressHoulder');
//   }
// }

// futuresMarginType('ETHUSDT').then(data => {
//   console.log(data);
// })

//----------------------------------------------------

// async function priceCoin() { // изменить плечо
//   let data = await binance.futuresPositionRisk() 
  
//   console.log(data);
// }

// priceCoin()

//----------------------------------------------------

// async function priceCoin() { // Получить все открытые позиции
//   let position_data = await binance.futuresPositionRisk() 
//   let markets = Object.keys( position_data )
//   for ( let market of markets ) {
//     let obj = position_data[market]
//     let size = Number( obj.positionAmt );
//     if ( size == 0 ) continue;
  
//     console.log(obj);
//   }
// }

// priceCoin()

//----------------------------------------------------

// async function buyCoin(coin, number) { // купить монетку по рынку
//     try{
//         let data = await binance.futuresMarketBuy(coin, Number(number)) 
//         if(data.code) {
//           console.log(data.code + ' - ' + data.msg);
//         }
//         return data['orderId']
//     } catch(e) {
//         console.log(e);
//     }
    
//   }

//   buyCoin('BTCUSDT', 0.001).then(data => console.log(data))

  //----------------------------------------------------

//   async function sellCoin(coin, number) { // продать монетку по рынку
//     let data = await binance.futuresMarketSell(coin, Number(number)) 
//     // if(data.code) {
//     //   console.log(data.code + ' - ' + data.msg);
//     // }
//     console.log(data);
//   }

//   sellCoin('ALICEUSDT', 1)
  //----------------------------------------------------

//   async function statusOrder(coin, id) { // информация по ордеру
//     let data = await binance.futuresOrderStatus(coin, {orderId: id}) 
//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//     }
//     console.log(data);
//   }

//   statusOrder('ALICEUSDT', '1740924338')

//----------------------------------------------------

// async function balanceFiat(currency) { // Баланс деняк
//     let data = await binance.futuresBalance() 
//     try {
//         if(data.code) {
//             console.log(data.code + ' - ' + data.msg);
//         } 
    
//         data = data.filter(obj => obj.asset === currency)
//         let balance = data[0]['crossWalletBalance']
//         return balance
//     } catch(e) {
//         console.log(e);
//     }
      
//   }

//   balanceFiat('USDT').then(data=>console.log(data))



// async function openPosition(coin) { // Получение открытой позиции по конкретной монете
//   try {
//     let data = await binance.futuresPositionRisk({symbol: coin}) 

//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//     }

//     let entryPrice = Number(data[0]['entryPrice'])
//     let unRealizedProfit = Number(data[0]['unRealizedProfit'])
//     return [entryPrice, unRealizedProfit]
//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'openPosition');
//   }
// }

// openPosition('BTCUSDT').then(data => {
//   // console.log(entryPrice + ' - entryPrice ' + '; ' + unRealizedProfit + ' - unRealizedProfit');
//   console.log(data[0] + ' - ' + data[1]);
// })

// async function buyCoin(coin, quantity, price) { // купить монетку по рынку
//   try{
//       let data = await binance.futuresSell(coin, Number(quantity), Number(price)) 
      
//       if(data.code) {
//         console.log(data.code + ' - ' + data.msg);
//         throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка buyCoin')
//       }
//       console.log(data);
//   } catch(e) {
//       console.log(e);
//   }
  
// }

// buyCoin('BTCUSDT', 0.001, 43100)

// async function traide(coin) { 
//   try {
//     let data = await binance.futuresPrices({symbol: coin}) 

//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//       throw new Error('Моя собственная ошибка, сервер не ответил по таймауту')
//     }

//     return data['price']

//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'traide');
//   }
// }

// traide('BTCUSDT').then(prise => {

// })

// setTimeout(() => {
//   window.open('https://www.binance.com/ru/futures/BTCUSDT')
// }, 5000)

// async function openBinanceCoin() {
//   let response = await fetch("http://localhost:3002/user"); // соединяемся с сервером
//     if (response.ok) {
//       let data = await response.text()
//       console.log(data);
//       console.log('Все ок');
//       console.log(response.status);
//       console.log(response.headers);
//       console.log(response);
      
//     } else {
//       console.log('Нет ответа сервера');
//     }

//     // setTimeout(() => {
//     //   openBinanceCoin()
//     // }, 1000)
// }


// setTimeout(() => {
//   openBinanceCoin()
// }, 2000)
// let data = new Date().getSeconds()
// console.log(data);