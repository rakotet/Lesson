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

const pnlPlusSell = 0.004 // Long (+ это +)
const pnlMinusSell = 0.007

const pnlPlusBuy = 0.095 // Short (всё наоборот + это -)
const pnlPlusBuy1 = 0.095 // Уровни докупки вызывают сомнения (возможно доработать)
const pnlPlusBuy2 = 0.095
const pnlPlusBuy3 = 0.02
const pnlPlusBuy4 = 0.07

const pnlMinusBuy = 0.005 // +

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
    let resultFile = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})

    if(counterWork[0] < 11) { // проверка на количество открытых сделок
      let candlesSymboldata = await binance.futuresPrices() 
  
      if(candlesSymboldata.code) {
        console.log(candlesSymboldata.code + ' - ' + candlesSymboldata.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - candlesOpenPamp')
      }

      for(let coin in candlesSymboldata) {
        if((candlesSymboldata[coin] < 10) && coin.endsWith('USDT')) {
          getCandles(coin, binance, opn, priceSymbolPamp)
        }
      }
    }
      
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'candlesOpenPamp');
  }

    //console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

    setTimeout(() => {
      candlesOpenPamp(binance, opn, priceSymbolPamp, fs)
    }, 15000)
}

async function getCandles(coin, binance, opn, priceSymbolPamp) { // получить свечи
  try{
    let data = await binance.futuresCandles(coin, '3m', {limit: 5}) 
    // if(data.code) {
    //   console.log(data.code + ' - ' + data.msg);
    // }
    
    // let volumeCandlesAll = 0

    // for(let i = 0; i < data.length - 2; i++) {
    //   let volume = Number(data[i][5]) // объём 1
    //   volumeCandlesAll = volumeCandlesAll + volume
    // }

    // let meanVolume = volumeCandlesAll / (data.length - 2)

    let openPrice = Number(data[data.length - 1][1])
    let closePrice = Number(data[data.length - 1][4])

    if(true/*Number(data[data.length - 1][5]) >= (meanVolume * 1)*/) {
      if(openPrice > closePrice) {
        let differenceRed = (((openPrice - closePrice) / closePrice) * 100).toFixed(2)

        if(differenceRed >= 2) {
          if(!timeOpenSymbolDamp[coin]) timeOpenSymbolDamp[coin] = 99
          if(Number(new Date().getMinutes()) !== timeOpenSymbolDamp[coin]) {
            console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ДАМП - ' + differenceRed + ' цена - ' + closePrice);
            //opn('https://www.binance.com/ru/futures/' + coin)
            timeOpenSymbolDamp[coin] = Number(new Date().getMinutes())
          }
        }

      } else {
        let differenceGreen = (((closePrice - openPrice) / closePrice) * 100).toFixed(2)

        if(differenceGreen >= 1) {
          if(!coinOpenPamp[coin]) coinOpenPamp[coin] = [0]
          if(coinOpenPamp[coin][0] === 0) {
            if(counterWork[0] < 11) { // проверка на количество ф-й в работе
              console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп + ' + differenceGreen + ' цена - ' + closePrice);
              coinOpenPamp[coin][0] = 1 // флаг того что памп пошел в работу
              coinOpenPamp[coin][1] = closePrice // флаг текущей цены пампа
              coinOpenPamp[coin][2] = Number((new Date().getTime() / 1000).toFixed()) // флаг времени пампа в секундах
              coinOpenPamp[coin][5] = 0 // счетчик высчитывания импульса после 
              priceSymbolPamp(coin) 
              counterWork[0] = counterWork[0] + 1
              opn('https://www.binance.com/ru/futures/' + coin)
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

let timeOpenSymbolDamp = {}
let timeOpenSymbolPamp = {}
let coinOpenPamp = {}
let counterWork = [0, 0]


//////////////////////////////////////////////////////////

async function priceSymbolPamp(symbol) {
  let coin = symbol
  let cancell = true

  try {
    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 80}) 
    if(candlesSymbol.code) {
      console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
    }

    // let greenRedCandles = 0
      
    // for(let i = 2; i < 6; i++) {
    //   if(Number(candlesSymbol[candlesSymbol.length - i][1]) < Number(candlesSymbol[candlesSymbol.length - i][4])) {
    //     greenRedCandles++
    //   }
    // }

    if(coinOpenPamp[coin][5] === 0) {
      for(let i = candlesSymbol.length - 2; i > 0; i--) {
        if(Number(candlesSymbol[i][4]) <= Number(candlesSymbol[(i - 1)][1])
        && Number(candlesSymbol[(i - 1)][4]) <= Number(candlesSymbol[(i - 2)][1])) {
  
          coinOpenPamp[coin][3] = Number(candlesSymbol[i][1]) // цена начала импульса
          coinOpenPamp[coin][4] = Number(candlesSymbol[i][0]) // время начала импульса
          console.log(coin +' - время начала импульса - ' + new Date(coinOpenPamp[coin][4]) + ' - цена начала импульса - ' + coinOpenPamp[coin][3]);
          break;
        } 
      }
      coinOpenPamp[coin][5] = 1
    }

    let oneOpen = Number(candlesSymbol[candlesSymbol.length - 1][1])
    let oneClose = Number(candlesSymbol[candlesSymbol.length - 1][4])
    let twoOpen = Number(candlesSymbol[candlesSymbol.length - 2][1])
    let twoClose = Number(candlesSymbol[candlesSymbol.length - 2][4])
    let twoHigh = Number(candlesSymbol[candlesSymbol.length - 2][2])

    if(oneClose < coinOpenPamp[coin][3]) { // если цена упала ниже начала импульса, то выходим из ф-и
      cancell = false
      counterWork[0] = counterWork[0] - 1
    }  

    let impulsPercent = (((oneClose - coinOpenPamp[coin][3]) / coinOpenPamp[coin][3]) * 100).toFixed(2)
    let minKorrektion = (impulsPercent / 2) - 0.2

    if((((twoOpen - twoClose) >= (twoOpen * 0.0015)) && (((oneOpen - oneClose) >= (oneOpen * 0.0015)) && ((oneOpen - oneClose) < (oneOpen * 0.004)))
    || (((oneOpen - oneClose) >= (oneOpen * 0.0015)) && ((oneOpen - oneClose) < (oneOpen * 0.004))) && ((twoHigh - twoOpen) >= (twoOpen * 0.018))) && (minKorrektion >= 0.5)) {
      
      cancell = false
      counterWork[0] = counterWork[0] - 1

      coinOpenPamp[coin][0] = 0

      let data = await binance.futuresPrices({symbol: coin}) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту priceSymbolPamp')
      }

      let numberCoinKey = (10 / Number(data['price'])).toFixed();
      let price = Number(data['price'])
      let priceToMinus = price + (price * 0.03)
      let priceToPlus = price - (price * (minKorrektion / 100))
      priceToMinus = priceToMinus.toFixed(numberOfSigns(price))
      priceToPlus = priceToPlus.toFixed(numberOfSigns(price))

      let resultFile = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})

      if(Number(resultFile) < 3) { // проверка на количество открытых сделок
        openPosition(coin).then(data => {
          if(data) {
            futuressHoulder(coin, 10, binance).then(data => {
              futuresMarginType(coin, binance).then(data => {
                sellMarketCoin(coin, numberCoinKey, binance).then(orderId => {
                  if(orderId) {
                    //futuresCancelAll(coin, binance)
                    buyCoin(coin, numberCoinKey, priceToPlus, binance)
                    buyCoin(coin, numberCoinKey, priceToMinus, binance)
                    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку');
                    opn('https://www.binance.com/ru/futures/' + coin)
                  }
                })
              })
            })
          } else console.log('Не вошли в позицию openPosition ' + coin);
        })
      } else console.log('Не вошли в позицию Максимальное количество сделок ' + coin);
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