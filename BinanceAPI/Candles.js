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
let counter = 0
let data
let timeout
let max = ''

const pnlPlusSell = 0.003 // Long (+ это +)
const pnlMinusSell = 0.003

const pnlPlusBuy = 0.005 // Short (всё наоборот + это -)
const pnlPlusBuy1 = 0.01 // Уровни докупки вызывают сомнения (возможно доработать)
const pnlPlusBuy2 = 0.01
const pnlPlusBuy3 = 0.01
const pnlPlusBuy4 = 0.07

const pnlMinusBuy = 0.005 // +

const wrapping = 0.002 // + или - к цене входа лимитного ордера
const percent = 1
const timeoutSearch = 180000

// setInterval(() => {
//   if((new Date().getSeconds()) === 2) {
//     candlesOpenPamp(binance, opn)
//   }
//   //candlesOpenPamp(binance, opn)
// }, 1000)


// открывает позиции
//
// traideOpenSymbol(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, 
//   symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType, priceSymbolPamp)

// traideOpenSymbolAll(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, 
//   symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType, priceSymbolPamp)

// закрывает позиции
//
// futuresPositionRiskPampSell(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, 
//   pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4)

// futuresPositionTwo(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, 
//   pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4)

//faifCandles(binance, opn, futuressHoulder, futuresMarginType, sellMarketCoin)

// futuresPositionOneSell(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, 
//   pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4)

//ищит мега объемы и 10 зеленых свечей
candlesOpenPamp(binance, opn)




async function priceSymbolPamp(symbol) {
  let coin = symbol
  let cancell = true

  try {

    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 2}) 
      if(candlesSymbol.code) {
        console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
      }

      if((Number(candlesSymbol[candlesSymbol.length - 2][1]) > Number(candlesSymbol[candlesSymbol.length - 2][4])) && Number(candlesSymbol[candlesSymbol.length - 1][1]) > Number(candlesSymbol[candlesSymbol.length - 1][4])) {
        cancell = false

        let data = await binance.futuresPrices({symbol: coin}) 
     
        if(data.code) {
          console.log(data.code + ' - ' + data.msg);
          throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту priceSymbolPamp')
        }

        let numberCoinKey = (10 / Number(data['price'])).toFixed();

        let resultFile = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})

        if(Number(resultFile) < 10) { // проверка на количество открытых сделок
          openPosition(coin).then(data => {
            if(data) {
              getCandles(coin).then(data => {
                if(data) {
                  futuressHoulder(coin, 1, binance).then(data => {
                    futuresMarginType(coin, binance).then(data => {
                      sellMarketCoin(coin, numberCoinKey, binance).then(orderId => {
                        if(orderId) {
                          console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку');
                          //opn('https://www.binance.com/ru/futures/' + coin)
                        }
                      })
                    })
                  })
                } else console.log('Не вошли в позицию getCandles ' + coin);
              })
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
    }, 2000)
  }

}


async function getCandles(coin) { // получить свечи
  try{
    let data = await binance.futuresCandles(coin, '1m', {limit: 60}) 
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
    
    for(let i = 2; i < 10; i++) {
      if(Number(data[data.length - i][1]) < Number(data[data.length - i][4])) {
        greenRedCandles++
      } else {
        greenRedCandles--
      }
    }

    if(truAndFalse === false || greenRedCandles === 8) {
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