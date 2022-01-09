const balanceFiat = require('./function/balanceFiat')
const buyCoin = require('./function/buyCoin')
const sellCoin = require('./function/sellCoin')
const futuressHoulder = require('./function/futuressHoulder')
const futuresMarginType = require('./function/futuresMarginType')
const statusOrder = require('./function/statusOrder')
const sellMarketCoin = require('./function/sellMarketCoin')
const buyMarketCoin = require('./function/buyMarketCoin')
const futuresPositionRiskPampSell = require('./function/futuresPositionRiskPampSell')
const futuresPositionOneSell = require('./function/futuresPositionOneSell')
const futuresPositionTwo = require('./function/futuresPositionTwo')
const numberOfSigns = require('./function/numberOfSigns')
const traideOpenPampBuy = require('./function/traideOpenPampBuy')
const traideOpenPampSell = require('./function/traideOpenPampSell')
const traideOpenSymbol = require('./function/traideOpenSymbol')
const traideOpenSymbolAll = require('./function/traideOpenSymbolAll')
const openTraide = require('./function/openTraide')
//const candlesOpenPamp = require('./function/candlesOpenPamp')
const faifCandles = require('./function/faifCandles')
const setkaLimitOrders = require('./function/setkaLimitOrders')
const futuresCancelAll = require('./function/futuresCancelAll')
const futuresPositionRisk = require('./function/futuresPositionRisk')
//const futuresDepth = require('./test')
const delay = ms => new Promise(res => setTimeout(res, ms));
let fapi = 'https://fapi.binance.com/fapi/';

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')
const opn = require('opn')

const profitCounter = {}
const currentProfitOne = {}
const timeoutFuturesPositionRisk = 2000
const timeoutTraideOpenPamp = 1000
let counterPosition = 0
let arrayPrice = {} // объект цен из которых расщитывается памп
let symbolPamp = {} // объект с памп монетами и % их пампа
let symbolDamp = {} // объект с памп монетами и % их пампа
let counter = 0
let data
let timeout
let max = ''

let counterWork = 0
let timeOpenSymbolDamp = {}
let timeOpenSymbolPamp = {}
let coinOpenPamp = {}
const numberMaxWork = 10
const numberOneTrade = 100

const pnlPlusSell = 0.005 // Long (+ это +)
const pnlMinusSell = 0.005

const pnlPlusBuy = 0.0055 // Short (всё наоборот + это -)
const pnlPlusBuy1 = 0.0055 // Уровни докупки вызывают сомнения (возможно доработать)
const pnlPlusBuy2 = 0.095
const pnlPlusBuy3 = 0.02
const pnlPlusBuy4 = 0.07

const pnlMinusBuy = 0.003 // +

const wrapping = 0.002 // + или - к цене входа лимитного ордера
const percent = 1
const percent2 = 1.5
const timeoutSearch = 900000
const timeoutSearch2 = 300000

let i = 0

// setInterval(() => {
//   if((new Date().getSeconds()) === 2) {
//     candlesOpenPamp(binance, opn)
//   }
//   //candlesOpenPamp(binance, opn)
// }, 1000)


// открывает позиции
//
// traideOpenSymbol(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, 
//   symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType, priceSymbolPamp, symbolDamp, priceSymbolDamp)

// закрывает позиции
//
// futuresPositionRiskPampSell(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, 
//   pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4, futuresCancelAll)

//ищит по объемам
candlesOpenPamp(binance, opn, priceSymbolPamp, fs)

// Выставляет ведра
//setkaLimitOrders('C98USDT', binance, buyCoin, futuressHoulder, futuresMarginType, numberOfSigns)



async function candlesOpenPamp(binance, opn, priceSymbolPamp, fs) {
  try {
    if(counterWork < numberMaxWork) { // проверка на количество открытых сделок
      let candlesSymboldata = await binance.futuresPrices() 
  
      if(candlesSymboldata.code) {
        console.log(candlesSymboldata.code + ' - ' + candlesSymboldata.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - candlesOpenPamp')
      }

      for(let coin in candlesSymboldata) {
        if((candlesSymboldata[coin] < numberOneTrade) && coin.endsWith('USDT')) {
          getCandles(coin, binance, opn, priceSymbolPamp)
          //i++
          //await delay(50)
        }
      }
      //console.log(i);
    }
      
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'candlesOpenPamp');
  }

    //console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

    setTimeout(() => {
      candlesOpenPamp(binance, opn, priceSymbolPamp, fs)
    }, 6000)
}

async function getCandles(coin, binance, opn, priceSymbolPamp) { // получить свечи
  try{
    let data = await binance.futuresCandles(coin, '1m', {limit: 60}) 
    //console.log(data);
    // if(data.code) {
    //   console.log(data.code + ' - ' + data.msg);
    // }
    
    let volumeCandlesAll = 0

    for(let i = 0; i < data.length - 2; i++) {
      let volume = Number(data[i][5]) // объём 1
      volumeCandlesAll = volumeCandlesAll + volume
    }

    let meanVolume = volumeCandlesAll / (data.length - 2)

    let openPrice = Number(data[data.length - 1][1])
    let closePrice = Number(data[data.length - 1][4])

    if(Number(data[data.length - 1][5]) >= (meanVolume * 2)) {
      if(openPrice > closePrice) {
        let differenceRed = (((openPrice - closePrice) / closePrice) * 100).toFixed(2)

        if(differenceRed >= 1.5) {
          if(!timeOpenSymbolDamp[coin]) timeOpenSymbolDamp[coin] = 99
          if(Number(new Date().getMinutes()) !== timeOpenSymbolDamp[coin]) {
            console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - ДАМП - ' + differenceRed + ' цена - ' + closePrice + '\n');
            //opn('https://www.binance.com/ru/futures/' + coin)
            timeOpenSymbolDamp[coin] = Number(new Date().getMinutes())
          }
        }

      } else {
        let differenceGreen = (((closePrice - openPrice) / closePrice) * 100).toFixed(2)

        if(differenceGreen >= 1) {
          if(!coinOpenPamp[coin]) coinOpenPamp[coin] = [0]
          if(coinOpenPamp[coin][0] === 0) {
            if(counterWork < numberMaxWork) { // проверка на количество ф-й в работе
              openPosition(coin).then(data => {
                if(data) {
                  console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп + ' + differenceGreen + ' цена - ' + closePrice);
                  coinOpenPamp[coin][0] = 1 // флаг того что памп пошел в работу
                  coinOpenPamp[coin][1] = closePrice // флаг текущей цены пампа
                  coinOpenPamp[coin][2] = Number((new Date().getTime() / 1000).toFixed()) // флаг времени пампа в секундах
                  coinOpenPamp[coin][5] = 0 // счетчик высчитывания импульса после запуска ф-и
                  counterWork++
                  //priceSymbolPamp(coin) 
                  coinOpenPamp[coin][6] = new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп + ' + differenceGreen + ' цена - ' + closePrice
                  //futuresDepth(coin)
                  opn('https://www.binance.com/ru/futures/' + coin)
                }
              })
            } 
          }
        }
      }
    }

  } catch(e) {
    // console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка getCandles');
  }
  
}

function getDate(date) { // время свечи
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${new Date().getSeconds()}`
}


//////////////////////////////////////////////////////////

async function priceSymbolPamp(symbol) {
  let coin = symbol
  let cancell = true

  try {
    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 80}) 
    if(candlesSymbol.code) {
      console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
    }

    if(coinOpenPamp[coin][5] === 0) {
      for(let i = candlesSymbol.length - 2; i > 0; i--) {

        if(Number(candlesSymbol[i][4]) <= Number(candlesSymbol[(i - 1)][1])
        && Number(candlesSymbol[(i - 1)][4]) <= Number(candlesSymbol[(i - 2)][1])) {

          if(Number(candlesSymbol[i][1]) > Number(candlesSymbol[i][4])) {
            coinOpenPamp[coin][3] = Number(candlesSymbol[i][4]) // цена начала импульса
          } else {
            coinOpenPamp[coin][3] = Number(candlesSymbol[i][1]) // цена начала импульса
          }

          coinOpenPamp[coin][4] = Number(candlesSymbol[i][0]) // время начала импульса
          break;
        } 
      }
      //coinOpenPamp[coin][5] = 1
    }

    let oneOpen = Number(candlesSymbol[candlesSymbol.length - 1][1])
    let oneClose = Number(candlesSymbol[candlesSymbol.length - 1][4])
    let twoOpen = Number(candlesSymbol[candlesSymbol.length - 2][1])
    let twoClose = Number(candlesSymbol[candlesSymbol.length - 2][4])
    let twoHigh = Number(candlesSymbol[candlesSymbol.length - 2][2])

    let impulsMaxPrice = 0
    let impulsCandlesLength = 0

    for(let i = candlesSymbol.length - 1; i > 0; i--) {
      if(Number(candlesSymbol[i][1]) === coinOpenPamp[coin][3] || Number(candlesSymbol[i][4]) === coinOpenPamp[coin][3]) {
        break;
      } else {
        impulsCandlesLength++
      }
    }

    for(let i = candlesSymbol.length - 1; i > ((candlesSymbol.length - 1) - impulsCandlesLength); i--) {
      if(Number(candlesSymbol[i][1]) > Number(candlesSymbol[i][4])) {
        if(Number(candlesSymbol[i][1]) > impulsMaxPrice) impulsMaxPrice = Number(candlesSymbol[i][1])
      } else {
        if(Number(candlesSymbol[i][4]) > impulsMaxPrice) impulsMaxPrice = Number(candlesSymbol[i][4])
      }
    }

    let impulsPercent = (((impulsMaxPrice - coinOpenPamp[coin][3]) / coinOpenPamp[coin][3]) * 100).toFixed(2)
    let minKorrektion = (impulsPercent / 2) // возможно 2.1 - 2.3

    //if(minKorrektion > 1.5) minKorrektion = 1.5

    let priceTakeProfit = impulsMaxPrice - (impulsMaxPrice * (minKorrektion / 100))
    let percentOneCloseTakeProfit = (((oneClose - priceTakeProfit) / oneClose) * 100).toFixed(2)

    if(coinOpenPamp[coin][5] === 0) {
      console.log(coin +' - время начала импульса - ' + new Date(coinOpenPamp[coin][4]) + ' - цена начала импульса - ' + coinOpenPamp[coin][3]);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsCandlesLength - ' + impulsCandlesLength);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsMaxPrice - ' + impulsMaxPrice);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - priceTakeProfit - ' + priceTakeProfit);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - percentOneCloseTakeProfit - ' + percentOneCloseTakeProfit);
      console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
      coinOpenPamp[coin][5] = 1
    }
    
    if(oneClose < coinOpenPamp[coin][3] || percentOneCloseTakeProfit < 0) { // если цена упала ниже начала импульса или коррекция уже прошла, но мы в нее не вошли, то выходим из ф-и
      cancell = false
      counterWork--
      coinOpenPamp[coin][0] = 0
      console.log('\n' + new Date().toLocaleTimeString() + ' - Вышли из ф-и, коррекция завершилась и была не достаточной для нас - ' + coin + ' - counterWork -  ' + counterWork + '\n');
    }  

    let redOne = impulsMaxPrice - oneClose
    let impulsPrice = impulsMaxPrice - coinOpenPamp[coin][3]

    if(true/*((((redOne / impulsPrice) * 100) > 15) && (redOne > 0) && (((twoOpen - twoClose) > (twoOpen * 0.001)) && ((oneOpen - oneClose) > (oneOpen * 0.001)))) 
    && (percentOneCloseTakeProfit >= 0.2)*/) {
      
      cancell = false
      counterWork--
      //coinOpenPamp[coin][0] = 0

      let numberCoinKey = (numberOneTrade / oneClose).toFixed();
      let priceStopMarketShort = (impulsMaxPrice - (impulsPrice * 0.30)).toFixed(numberOfSigns(oneClose))
      let priceStopMarketLong = (impulsMaxPrice + (impulsMaxPrice * 0.006)).toFixed(numberOfSigns(oneClose))
      let priceToPlus = (impulsMaxPrice - (impulsPrice * 0.55)).toFixed(numberOfSigns(oneClose))
      let priceToMinus = (impulsMaxPrice - (impulsMaxPrice * 0.003)).toFixed(numberOfSigns(oneClose))
      let priceToLimitShort = (impulsMaxPrice - (impulsPrice * 0.25)).toFixed(numberOfSigns(oneClose))
      let longProfit = (impulsMaxPrice + (impulsMaxPrice * 0.005)).toFixed(numberOfSigns(oneClose))
      let longStop = (impulsMaxPrice - (impulsPrice * 0.7)).toFixed(numberOfSigns(oneClose))
      let longPrice = (impulsMaxPrice - (impulsPrice * 0.24)).toFixed(numberOfSigns(oneClose))
      
      console.log('---------------------------------------');
      console.log(coinOpenPamp[coin][6]);
      console.log(coin +' - время начала импульса - ' + new Date(coinOpenPamp[coin][4]) + ' - цена начала импульса - ' + coinOpenPamp[coin][3]);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsCandlesLength - ' + impulsCandlesLength);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsMaxPrice - ' + impulsMaxPrice);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - priceTakeProfit - ' + priceTakeProfit);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - percentOneCloseTakeProfit - ' + percentOneCloseTakeProfit);
      console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку' + '\n' + '---------------------------------------');
      opn('https://www.binance.com/ru/futures/' + coin)

      futuressHoulder(coin, 10, binance).then(data => {
        futuresMarginType(coin, binance).then(data => {
          // sellCoin(coin, numberCoinKey, priceToLimitShort, binance)
          // sellMarketCoin(coin, numberCoinKey, binance)
          // takeProfitShort(coin, priceToPlus)
          // stopShort(coin, priceToMinus)
          buyCoin(coin, numberCoinKey, longPrice, binance)
          takeProfitLong(coin, longProfit)
          stopLong(coin, longStop)
        })
      })     
    }

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка priceSymbolPamp');
  }

  if(cancell) {
    setTimeout(() => {
      priceSymbolPamp(coin)
    }, 1000)
  }

}

async function openPosition(coin) { // Получение открытой позиции по конкретной монете
  try {
    let data = await binance.futuresPositionRisk({symbol: coin}) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    if(Number(data[0]['positionAmt']) === 0) {
      return true
    } else {
      return false
    }

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'openPosition');
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
    console.log(new Date().toLocaleTimeString() + ' - ' + 'takeProfitShort');
  }
}

async function stopShort(coin, price) { 
  try {
    let data = await binance.promiseRequest( 'v1/order', {symbol: coin, side: 'BUY', type: 'STOP_MARKET', timeInForce: 'GTC', stopPrice: price, closePosition: 'true'}, { base:fapi, type:'TRADE', method:'POST' } ) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    return data
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'stopShort');
  }
}

async function stopMarketShort(coin, price, quantity) { 
  try {
    let data = await binance.promiseRequest( 'v1/order', {symbol: coin, side: 'SELL', type: 'STOP_MARKET', timeInForce: 'GTC', stopPrice: price, quantity: quantity}, { base:fapi, type:'TRADE', method:'POST' } ) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'stopMarketShort');
  }
}

async function stopMarketLong(coin, price, quantity) { 
  try {
    let data = await binance.promiseRequest( 'v1/order', {symbol: coin, side: 'BUY', type: 'STOP_MARKET', timeInForce: 'GTC', stopPrice: price, quantity: quantity}, { base:fapi, type:'TRADE', method:'POST' } ) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'stopMarketLong');
  }
}

async function takeProfitLong(coin, price) { 
  try {
    let data = await binance.promiseRequest( 'v1/order', {symbol: coin, side: 'SELL', type: 'TAKE_PROFIT_MARKET', timeInForce: 'GTC', stopPrice: price, closePosition: 'true'}, { base:fapi, type:'TRADE', method:'POST' } ) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    return data
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'takeProfitLong');
  }
}

async function stopLong(coin, price) { 
  try {
    let data = await binance.promiseRequest( 'v1/order', {symbol: coin, side: 'SELL', type: 'STOP_MARKET', timeInForce: 'GTC', stopPrice: price, closePosition: 'true'}, { base:fapi, type:'TRADE', method:'POST' } ) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    return data
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'stopShort');
  }
}

