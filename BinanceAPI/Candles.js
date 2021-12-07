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
const candlesOpenPamp = require('./function/candlesOpenPamp')
const faifCandles = require('./function/faifCandles')
const setkaLimitOrders = require('./function/setkaLimitOrders')
const futuresCancelAll = require('./function/futuresCancelAll')

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')
const opn = require('opn')

const profitCounter = {}
const currentProfitOne = {}
const timeoutFuturesPositionRisk = 1000
const timeoutTraideOpenPamp = 1000
let counterPosition = 0
let arrayPrice = {} // объект цен из которых расщитывается памп
let symbolPamp = {} // объект с памп монетами и % их пампа
let symbolDamp = {} // объект с памп монетами и % их пампа
let counter = 0
let data
let timeout
let max = ''

const pnlPlusSell = 0.003 // Long (+ это +)
const pnlMinusSell = 0.004

const pnlPlusBuy = 0.007 // Short (всё наоборот + это -)
const pnlPlusBuy1 = 0.007 // Уровни докупки вызывают сомнения (возможно доработать)
const pnlPlusBuy2 = 0.01
const pnlPlusBuy3 = 0.01
const pnlPlusBuy4 = 0.07

const pnlMinusBuy = 0.004 // +

const wrapping = 0.002 // + или - к цене входа лимитного ордера
const percent = 1
const percent2 = 1.5
const timeoutSearch = 900000
const timeoutSearch2 = 300000

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

// traideOpenSymbol(percent2, arrayPrice, counter, data, timeout, binance, timeoutSearch2, timeoutTraideOpenPamp, 
//   symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType, priceSymbolPamp)

// traideOpenSymbolAll(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, 
//   symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType, priceSymbolPamp)

// закрывает позиции
//
// futuresPositionRiskPampSell(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, 
//   pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4, futuresCancelAll)

// futuresPositionTwo(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, 
//   pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4)

//faifCandles(binance, opn, futuressHoulder, futuresMarginType, sellMarketCoin)

// futuresPositionOneSell(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, 
//   pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4)

//ищит мега объемы и 10 зеленых свечей
candlesOpenPamp(binance, opn)

// Выставляет ведра
//setkaLimitOrders('C98USDT', binance, buyCoin, futuressHoulder, futuresMarginType, numberOfSigns)




async function priceSymbolPamp(symbol) {
  let coin = symbol
  let cancell = true

  try {
    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 10}) 
    if(candlesSymbol.code) {
      console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
    }

    let data = await binance.futuresPrices({symbol: coin}) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
      throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту priceSymbolPamp')
    }

    let greenRedCandles = 0
    let candlesGrin = true
    
    for(let i = 2; i < 6; i++) {
      if(Number(candlesSymbol[candlesSymbol.length - i][1]) < Number(candlesSymbol[candlesSymbol.length - i][4])) {
        greenRedCandles++
      } 
    }

    if(greenRedCandles >= 4) {
      candlesGrin = false
    } 

    if(true/*((Number(candlesSymbol[candlesSymbol.length - 2][1]) > Number(candlesSymbol[candlesSymbol.length - 2][4])) && ((Number(candlesSymbol[candlesSymbol.length - 2][1]) - Number(candlesSymbol[candlesSymbol.length - 2][4])) >= (Number(candlesSymbol[candlesSymbol.length - 2][1]) * 0.0015))) 
    && ((Number(candlesSymbol[candlesSymbol.length - 1][1]) > Number(candlesSymbol[candlesSymbol.length - 1][4])) && ((Number(candlesSymbol[candlesSymbol.length - 1][1]) - Number(candlesSymbol[candlesSymbol.length - 1][4])) >= (Number(candlesSymbol[candlesSymbol.length - 1][1]) * 0.0015)))
    || (((((Number(candlesSymbol[candlesSymbol.length - 1][1]) - Number(candlesSymbol[candlesSymbol.length - 1][4])) >= (Number(candlesSymbol[candlesSymbol.length - 1][1]) * 0.0015))
    && ((Number(candlesSymbol[candlesSymbol.length - 1][1]) - Number(candlesSymbol[candlesSymbol.length - 1][4])) < (Number(candlesSymbol[candlesSymbol.length - 1][1]) * 0.003)))) && candlesGrin)
    /*((Number(candlesSymbol[candlesSymbol.length - 2][1]) < Number(candlesSymbol[candlesSymbol.length - 2][4]))) && ((Number(candlesSymbol[candlesSymbol.length - 1][1]) < Number(candlesSymbol[candlesSymbol.length - 1][4])))*/) {
      cancell = false

      let numberCoinKey = (10 / Number(data['price'])).toFixed();
      let price = Number(data['price'])
      let priceTo = price + (price * 0.002)
      priceTo = priceTo.toFixed(numberOfSigns(price))

      let resultFile = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})

      if(Number(resultFile) < 10) { // проверка на количество открытых сделок
        //opn('https://www.binance.com/ru/futures/' + coin)
        openPosition(coin).then(data => {
          if(data) {
            // getCandles(coin).then(data => {
            //   if(data) {
                futuressHoulder(coin, 10, binance).then(data => {
                  futuresMarginType(coin, binance).then(data => {
                    buyMarketCoin(coin, numberCoinKey, binance).then(orderId => {
                      if(orderId) {
                        //futuresCancelAll(coin, binance)
                        console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку');
                        //opn('https://www.binance.com/ru/futures/' + coin)
                      }
                    })
                  })
                })
            //   } else console.log('Не вошли в позицию getCandles ' + coin);
            // })
          } else console.log('Не вошли в позицию openPosition ' + coin);
        })
      }
    }

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'priceSymbolPamp');
  }

  if(cancell) {
    setTimeout(() => {
      priceSymbolPamp(coin)
    }, 1000)
  }

}

async function priceSymbolDamp(symbol) {
  let coin = symbol
  let cancell = true

  try {

    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 4}) 
      if(candlesSymbol.code) {
        console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
      }

      if(/*((Number(candlesSymbol[candlesSymbol.length - 4][1]) < Number(candlesSymbol[candlesSymbol.length - 4][4])) && ((Number(candlesSymbol[candlesSymbol.length - 4][4]) - Number(candlesSymbol[candlesSymbol.length - 4][1])) >= (Number(candlesSymbol[candlesSymbol.length - 4][1]) * 0.001))) 
      &&*/ ((Number(candlesSymbol[candlesSymbol.length - 3][1]) < Number(candlesSymbol[candlesSymbol.length - 3][4])) && ((Number(candlesSymbol[candlesSymbol.length - 3][4]) - Number(candlesSymbol[candlesSymbol.length - 3][1])) >= (Number(candlesSymbol[candlesSymbol.length - 3][1]) * 0.001)))
      && ((Number(candlesSymbol[candlesSymbol.length - 2][1]) < Number(candlesSymbol[candlesSymbol.length - 2][4])) && ((Number(candlesSymbol[candlesSymbol.length - 2][4]) - Number(candlesSymbol[candlesSymbol.length - 2][1])) >= (Number(candlesSymbol[candlesSymbol.length - 2][1]) * 0.001)))
      && ((Number(candlesSymbol[candlesSymbol.length - 1][1]) < Number(candlesSymbol[candlesSymbol.length - 1][4])) && ((Number(candlesSymbol[candlesSymbol.length - 1][4]) - Number(candlesSymbol[candlesSymbol.length - 1][1])) >= (Number(candlesSymbol[candlesSymbol.length - 1][1]) * 0.0015)))
      /*|| (((Number(candlesSymbol[candlesSymbol.length - 1][4]) - Number(candlesSymbol[candlesSymbol.length - 1][1])) >= (Number(candlesSymbol[candlesSymbol.length - 1][1]) * 0.0015))
      && ((Number(candlesSymbol[candlesSymbol.length - 1][4]) - Number(candlesSymbol[candlesSymbol.length - 1][1])) < (Number(candlesSymbol[candlesSymbol.length - 1][1]) * 0.003)))*/
      /*((Number(candlesSymbol[candlesSymbol.length - 2][1]) < Number(candlesSymbol[candlesSymbol.length - 2][4]))) && ((Number(candlesSymbol[candlesSymbol.length - 1][1]) < Number(candlesSymbol[candlesSymbol.length - 1][4])))*/) {
        cancell = false

        let data = await binance.futuresPrices({symbol: coin}) 
     
        if(data.code) {
          console.log(data.code + ' - ' + data.msg);
          throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту priceSymbolPamp')
        }

        let numberCoinKey = (10 / Number(data['price'])).toFixed();
        let price = Number(data['price'])
        let priceTo = price - (price * 0.002)
        priceTo = priceTo.toFixed(numberOfSigns(price))

        let resultFile = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})

        if(Number(resultFile) < 3) { // проверка на количество открытых сделок
          //opn('https://www.binance.com/ru/futures/' + coin)
          openPosition(coin).then(data => {
            if(data) {
              // getCandles(coin).then(data => {
              //   if(data) {
                  futuressHoulder(coin, 10, binance).then(data => {
                    futuresMarginType(coin, binance).then(data => {
                      buyMarketCoin(coin, numberCoinKey, binance).then(orderId => {
                        if(orderId) {
                          //futuresCancelAll(coin, binance)
                          console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку');
                          opn('https://www.binance.com/ru/futures/' + coin)
                        }
                      })
                    })
                  })
              //   } else console.log('Не вошли в позицию getCandles ' + coin);
              // })
            } else console.log('Не вошли в позицию openPosition ' + coin);
          })
        }
      }

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'priceSymbolDamp');
  }

  if(cancell) {
    setTimeout(() => {
      priceSymbolDamp(coin)
    }, 1000)
  }

}


async function getCandles(coin) { // получить свечи
  try{
    let data = await binance.futuresCandles(coin, '1m', {limit: 10}) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
    
    let volumeCandlesAll = 0

    for(let i = 0; i < data.length - 3; i++) {
      let volume = Number(data[i][5]) // объём 1
      volumeCandlesAll = volumeCandlesAll + volume
    }

    let meanVolume = volumeCandlesAll / (data.length - 3)
    let pamp = 30
    let truAndFalse = false

    if((Number(data[data.length - 1][5]) > (meanVolume * pamp)) || (Number(data[data.length - 2][5]) > (meanVolume * pamp)) || (Number(data[data.length - 3][5]) > (meanVolume * pamp))) {
      truAndFalse =  false
    } else {
      truAndFalse = true
    }

    let greenRedCandles = 0
    
    for(let i = 2; i < 7; i++) {
      if(Number(data[data.length - i][1]) < Number(data[data.length - i][4])) {
        greenRedCandles++
      } else {
        greenRedCandles--
      }
    }

    if(/*truAndFalse === false || */greenRedCandles === 5) {
      return false
    } else {
      return true
    }

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'getCandles');
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