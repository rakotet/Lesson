const balanceFiat = require('./function/balanceFiat')
const numberOfSigns = require('./function/numberOfSigns')
const plate = require('./function/plate')
//let fapi = 'https://www.binance.com/futures/';
let fapi = 'https://fapi.binance.com/fapi/';
const delay = ms => new Promise(res => setTimeout(res, ms));

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});


 async function futuresDepth(symbol) { // книга заявок
  let coin = symbol
  try {
    let book = await binance.futuresDepth(coin, {limit: 500});
    if(book.code) {
      console.log(book.code + ' - ' + book.msg);
    }

    let price = await binance.futuresPrices({symbol: coin})
    if(price.code) {
      console.log(price.code + ' - ' + price.msg);
    }

    // let trades = await binance.futuresTrades(coin, {limit: 1000})
    // if(trades.code) {
    //   console.log(trades.code + ' - ' + trades.msg);
    // }

    let asks = 0
    let bids = 0

    for(let i = 0; i < book.asks.length; i++) {
      if(Number(book.asks[i][0]) === Number(price.price) || Number(book.asks[i][0]) < (Number(price.price) + (Number(price.price) * 0.0003))) {
        asks = asks + Number(book.asks[i][1])
      }
    }

    for(let i = 0; i < book.bids.length; i++) {
      if(Number(book.bids[i][0]) === Number(price.price) || Number(book.bids[i][0]) > (Number(price.price) - (Number(price.price) * 0.0003))) {
        bids = bids + Number(book.bids[i][1])
      }
    }

    console.log(asks);
    console.log(bids);
    console.log(asks > bids);
    console.log('-------------');
    

    // for(let i = 0; i < 5; i++) {
    //   console.log(trades[i].qty + ' - ' + (new Date(trades[i].time)).getHours() + ':' + (new Date(trades[i].time)).getMinutes() + ':' + (new Date(trades[i].time)).getSeconds());

    // }
    
    // console.log(trades[0]);
    // console.log(trades[499]);
    // console.log((new Date(trades[0].time)).getHours() + ':' + (new Date(trades[0].time)).getMinutes() + ':' + (new Date(trades[0].time)).getSeconds());
    // console.log((new Date(trades[499].time)).getHours() + ':' + (new Date(trades[499].time)).getMinutes() + ':' + (new Date(trades[499].time)).getSeconds());

    //plate(book, price)

    
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresDepth');
  }

  setTimeout(() => {
    futuresDepth(coin)
  }, 1000)
}

futuresDepth('CTSIUSDT')

// setInterval(() => {
//   futuresDepth('DOGEUSDT').then(arr => {
//     futuresCancelAll('DOGEUSDT').then(data => {
//       console.log(arr[0]);
//       console.log(arr[1]);
//       console.log(new Date().toLocaleTimeString());
//       stopShort('DOGEUSDT', Number(arr[0][0][0]))
//       stopShort('DOGEUSDT', Number(arr[0][1][0]))
//       stopShort('DOGEUSDT', Number(arr[0][2][0]))
//       stopShort('DOGEUSDT', Number(arr[0][3][0]))
//       stopShort('DOGEUSDT', Number(arr[0][4][0]))
//       console.log(new Date().toLocaleTimeString());
//     })
    
//     // console.log(new Date().toLocaleTimeString());
//     // console.log((new Date(data.E)).getHours() + ':' + (new Date(data.E)).getMinutes() + ':' + (new Date(data.E)).getSeconds());
//     // console.log((new Date(data.T)).getHours() + ':' + (new Date(data.T)).getMinutes() + ':' + (new Date(data.T)).getSeconds());
//     // console.log(data.bids[0][0] + ' - цена - ' + data.bids[0][1] + ' - объём; ' + data.bids[999][0] + ' - цена - ' + data.bids[999][1] + ' - объём; ' + ' - покупают');
//     // console.log(data.asks[0][0] + ' - цена - ' + data.asks[0][1] + ' - объём; ' + data.asks[999][0] + ' - цена - ' + data.asks[999][1] + ' - объём; ' + ' - продают');
//   })
// }, 5000)



async function stopShort(coin, price) { 
  try {
    let data = await binance.promiseRequest( 'v1/order', {symbol: coin, side: 'BUY', type: 'STOP_MARKET', timeInForce: 'GTC', stopPrice: price, closePosition: 'true'}, { base:fapi, type:'TRADE', method:'POST' } ) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    //console.log('ok');
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'stopShort');
  }
}

async function takeProfitShort(coin, price) { 
  try {
    let data = await binance.promiseRequest( 'v1/order', {symbol: coin, side: 'BUY', type: 'TAKE_PROFIT_MARKET', timeInForce: 'GTC', stopPrice: price, closePosition: 'true'}, { base:fapi, type:'TRADE', method:'POST' } ) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    return data
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresOrder');
  }
}

async function futuresCancelAll(coin) { 
  try {
    let data = await binance.futuresCancelAll(coin);

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    return 1
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresCancelAll');
  }

}

// async function futuresTrades(coin) { // последние ордера по рынку 1000шт
//   try {
//     let data = await binance.futuresTrades(coin, {limit: 1000});

//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//     }

//     return data
//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresTrades');
//   }

//   // setTimeout(() => {
//   //   futuresTrades('BTCUSDT')
//   // }, 1000)
// }

// futuresTrades('SUSHIUSDT').then(data => {
//   console.log(data[999]);
// })

// async function volume(coin) { 
//   try {
//     let buySellVolume = await binance.promiseRequest( 'data/takerlongshortRatio', {symbol: coin, limit: 1, period: '5m'}, { base:fapi, type:'MARKET_DATA', method:'GET' } )  
//     if(buySellVolume.code) {
//       console.log(buySellVolume.code + ' - ' + buySellVolume.msg);
//     }

//     let longShortRatio = await binance.promiseRequest( 'data/globalLongShortAccountRatio', {symbol: coin, limit: 1, period: '5m'}, { base:fapi, type:'MARKET_DATA', method:'GET' } )
//     if(longShortRatio.code) {
//       console.log(longShortRatio.code + ' - ' + longShortRatio.msg);
//     }

//     return [buySellVolume, longShortRatio]
//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresOrder');
//   }
// }

// volume('SUSHIUSDT').then(data => {
//   console.log(data);
//   console.log((new Date(data[0][0].timestamp)).getHours() + ':' + (new Date(data[0][0].timestamp)).getMinutes() + ':' + (new Date(data[0][0].timestamp)).getSeconds());
//   console.log((new Date(data[1][0].timestamp)).getHours() + ':' + (new Date(data[1][0].timestamp)).getMinutes() + ':' + (new Date(data[1][0].timestamp)).getSeconds());
// })


// function getDate(date) { // время свечи
//   return (new Date(data[0].timestamp)).getHours() + ':' + (new Date(data[0].timestamp)).getMinutes() + ':' + (new Date(data[0].timestamp)).getSeconds()
// }



// futuresCancelAll('RSRUSDT').then(data => {
//   console.log(data);
// })


// let resultFile = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})

// resultFile = resultFile + 'dddd' + ','

// fs.writeFileSync('./symbolPamp.txt', resultFile)

// let arr = resultFile.split(',')
// console.log(arr);

// for( let i = 0; i < arr.length; i++) {
//   if(arr[i] == 'sol') {
//     arr.splice(i, 1)
//   }
// }

// let str = arr.join(',')
// fs.writeFileSync('./symbolPamp.txt', str)

// console.log(fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'}));


// fs.writeFileSync('./symbolPamp.txt', 'SOLUSDT, ')



// getCandles("BTCUSDT", binance)

// async function getCandles(coin, binance) { // получить свечи
//   try{
//     let data = await binance.futuresCandles(coin, '1m', {limit: 20}) 
//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//     }

//       let greenRedCandles = 0
      
//       for(let i = 1; i < 9; i++) {
//         if(data[data.length - i][1] < data[data.length - i][4]) {
//           greenRedCandles++
//         } else {
//           greenRedCandles--
//         }
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