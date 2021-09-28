const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')

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
//   let data = await binance.futuresCandles('BTCUSDT', '1m', {limit: 3}) 
  
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