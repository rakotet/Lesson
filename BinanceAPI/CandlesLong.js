const futuressHoulder = require('./function/futuressHoulder')
const futuresMarginType = require('./function/futuresMarginType')
const statusOrder = require('./function/statusOrder')
const sellMarketCoin = require('./function/sellMarketCoin')
const buyMarketCoin = require('./function/buyMarketCoin')
const numberOfSigns = require('./function/numberOfSigns')

const delay = ms => new Promise(res => setTimeout(res, ms));

let fapi = 'https://fapi.binance.com/fapi/';

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')
const opn = require('opn')

let counterWork = 0
let timeOpenSymbolDamp = {}
let timeOpenSymbolPamp = {}
let coinOpenPamp = {}
let candlesGreen = {}
let megaVolume = {}
let fibaObj = {}
let pribl = 0
let i = 0

/////////////////////// Управление ботом
const numberMaxWork = 2 // количество одновременных сделок (1 - 5)
const numberOneTrade = 100 // сумма одной сделки (10 - 1000)
const percentPamp = 2 // Процент пампа при котором начинаем слежение
const percentDamp = 1.5 // Процент дампа при котором начинаем слежение
const percentBigCandles = 3 // Минимальный процент свечи для захода в позицию по большой свечи (1.25 - 2)
const plusBigCandles = 0.015 // Процент плюса после захода по большой свечи до растягивания фибы (0.5 - 1)
const houlderCandles = 10 // Плечо сделки
const openScrin = true // открывать сделки в браузере
const volumeMega = 1000
///////////////////////

candlesOpenPamp(binance, opn, priceSymbolPamp, fs)

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
          getCandles(coin, binance, opn, priceSymbolPamp, fs)
          //i++
          await delay(20)
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

async function getCandles(coin, binance, opn, priceSymbolPamp, fs) { // получить свечи
  try{
    let data = await binance.futuresCandles(coin, '1m', {limit: 60}) 
    //console.log(data);
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    let volumeCandlesAll = 0

    for(let i = 0; i < data.length - 2; i++) {
      let volume = Number(data[i][5]) // объём 1
      volumeCandlesAll = volumeCandlesAll + volume
    }

    let meanVolume = volumeCandlesAll / (data.length - 2)

    let openPrice = Number(data[data.length - 1][1])
    let closePrice = Number(data[data.length - 1][4])
    let oneHigh = Number(data[data.length - 1][2])

    if(!(Number(data[data.length - 1][5]) >= (meanVolume * volumeMega))) { // защита от МЕГА объёмов 
      if(openPrice > closePrice) {
        let differenceRed = Number((((openPrice - closePrice) / closePrice) * 100).toFixed(2))

        if(differenceRed >= percentDamp) {
          if(!timeOpenSymbolDamp[coin]) timeOpenSymbolDamp[coin] = 99
          if(Number(new Date().getMinutes()) !== timeOpenSymbolDamp[coin]) {
            console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - ДАМП - ' + differenceRed + ' цена - ' + closePrice + '\n');
            //opn('https://www.binance.com/ru/futures/' + coin)
            timeOpenSymbolDamp[coin] = Number(new Date().getMinutes())
          }
        }

      } else {
        let differenceGreen = Number((((oneHigh - openPrice) / openPrice) * 100).toFixed(2))
        //console.log(differenceGreen);
        if(differenceGreen >= percentPamp) {
          if(!coinOpenPamp[coin]) coinOpenPamp[coin] = [0]
          if(!timeOpenSymbolPamp[coin]) timeOpenSymbolPamp[coin] = 99
          if(coinOpenPamp[coin][0] === 0) {
            if(counterWork < numberMaxWork) { // проверка на количество ф-й в работе
              if(Number(new Date().getMinutes()) !== timeOpenSymbolPamp[coin]) {
                counterWork++
                console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп + ' + differenceGreen + ' цена - ' + closePrice);
                coinOpenPamp[coin][0] = 1 // флаг того что памп пошел в работу
                coinOpenPamp[coin][1] = closePrice // флаг текущей цены пампа
                coinOpenPamp[coin][2] = 0 // счетчик входа по большой 1.2 свечи
                coinOpenPamp[coin][5] = 0 // счетчик высчитывания импульса после запуска ф-и
                coinOpenPamp[coin][6] = new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп + ' + differenceGreen + ' цена - ' + closePrice
                coinOpenPamp[coin][7] = (Number(Date.now()) / 1000) // Время начала слежения
                coinOpenPamp[coin][8] = 0
                timeOpenSymbolPamp[coin] = Number(new Date().getMinutes())
                priceSymbolPamp(coin, Number(data[data.length - 1][0]), meanVolume) 

                let mess = '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп + ' + differenceGreen + ' цена - ' + closePrice + '\n'
                fs.appendFileSync("symbolPamp.txt", mess)

                //opn('https://www.binance.com/ru/futures/' + coin)
              }
            } 
          }
        }
      }
    } else {
      if(coin !== 'BTTUSDT') {
        if(!megaVolume[coin]) megaVolume[coin] = 0
        if(megaVolume[coin] == 0) {
          megaVolume[coin] = 1
          console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - МЕГА ОБЪЕМЫ ');

          if(openScrin) {
            opn('https://www.binance.com/ru/futures/' + coin)
          }

          setTimeout(() => {
            megaVolume[coin] = 0
          }, 60000)
        }
      }
    }

  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка getCandles');
  }
  
}

//////////////////////////////////////////////////////////

async function priceSymbolPamp(symbol, dateOneLength, meanVolume) {
  let coin = symbol
  let cancell = true

  try {
    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 1}) 
    if(candlesSymbol.code) {
      console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
    }

    let oneOpen = Number(candlesSymbol[candlesSymbol.length - 1][1])
    let oneClose = Number(candlesSymbol[candlesSymbol.length - 1][4])
    let oneHigh = Number(candlesSymbol[candlesSymbol.length - 1][2])

    let numberCoinKey = Number((numberOneTrade / oneClose).toFixed())
    
    let candlesPercentOne = (((oneHigh - oneOpen) / oneOpen) * 100)
    let candlesPercentHighToClose = (((oneHigh - oneClose) / (oneHigh - oneOpen)) * 100)

    if(Number(candlesSymbol[candlesSymbol.length - 1][0]) !== dateOneLength) {
      cancell = false
      counterWork--
      coinOpenPamp[coin][0] = 0

      let message = 'Вышли из ф-и'
      console.log('\n' + new Date().toLocaleTimeString() + ' - ' + message + ' - ' + coin + ' - counterWork -  ' + counterWork + '\n');
    }

    if(Number(candlesSymbol[candlesSymbol.length - 1][5]) >= (meanVolume * volumeMega)) {
      if(!megaVolume[coin]) megaVolume[coin] = 0
        if(megaVolume[coin] == 0) {
          megaVolume[coin] = 1
          console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - МЕГА ОБЪЕМЫ - когда мы в функции');

          if(openScrin) {
            opn('https://www.binance.com/ru/futures/' + coin)
          }

          setTimeout(() => {
            megaVolume[coin] = 0
          }, 60000)
        }
    }

    if((candlesPercentOne >= percentBigCandles) && (candlesPercentHighToClose >= 5) && (oneClose > oneOpen) && (candlesPercentHighToClose <= 30)
    && (!(Number(candlesSymbol[candlesSymbol.length - 1][5]) >= (meanVolume * volumeMega)))) {

      if(openScrin) {
        opn('https://www.binance.com/ru/futures/' + coin)
      }

      cancell = false

      futuressHoulder(coin, houlderCandles, binance).then(data => {
        futuresMarginType(coin, binance).then(data => {
          sellMarketCoin(coin, numberCoinKey, binance).then(data => {
            if(data) {
              console.log('\n' + '---------------------------------------');
              console.log(new Date().toLocaleTimeString() + coin + ' - Открыли сделку' + ' - counterWork - ' + counterWork);
              console.log('---------------------------------------' + '\n');
              fibaObj[coin] = [0, 0, 0, 0, 0, 0, 0]
              fibaTraid(coin)
            }
          })
        })
      })     
    }
    
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка priceSymbolPamp');
  }

  if(cancell) {
    setTimeout(() => {
      priceSymbolPamp(coin, dateOneLength, meanVolume)
    }, 100)
  }

}

async function fibaTraid(coin) {
  let cancellFiba = true

  try {
    let data = await binance.futuresPositionRisk({symbol: coin}) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    let unRealizedProfit = Number(data[0]['unRealizedProfit']) // профит в $
    let entryPrice = Number(data[0]['entryPrice']) // цена входа в позицию
    let markPrice = Number(data[0]['markPrice']) // текущая цена 
    let positionAmt = Number(data[0]['positionAmt']) // количество монет в позиции

    if(positionAmt < 0) {
      if(markPrice <= (entryPrice - (entryPrice * plusBigCandles))) {
        buyFiba('ПЛЮС', '++++++++++++++++')
      }

    } else if (positionAmt === 0) {
      cancellFiba = false
      counterWork--
      coinOpenPamp[coin][0] = 0
      console.log('\n' + new Date().toLocaleTimeString() + ' Вошли в fibaTraid с пустой позицией: ' + coin + ' counterWork - ' + counterWork + '\n')
    }
    
    else if (positionAmt > 0) {
      if(markPrice > (entryPrice + (entryPrice * 0.01))) {
        cancellFiba = false
        counterWork--
        coinOpenPamp[coin][0] = 0
        let unRealizedProfit2 = unRealizedProfit
        sellMarketCoin(coin, positionAmt, binance).then(orderId => {
          if(orderId) {
            statusOrder(coin, orderId, binance).then(avgPrice => {
              console.log('\n' + new Date().toLocaleTimeString() + ' Продали LONG: ' + coin + ' По цене: ' + avgPrice + '  в плюс: ' + unRealizedProfit2 + ' ++++++++++++++++++++')
              console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
              pribl = pribl + unRealizedProfit2
              console.log('Общая прибыль: ' + pribl + '\n');
            })
          }
        })
      }

      else if(markPrice < (entryPrice - (entryPrice * 0.002))) {
        cancellFiba = false
        counterWork--
        coinOpenPamp[coin][0] = 0
        let unRealizedProfit2 = unRealizedProfit
        sellMarketCoin(coin, positionAmt, binance).then(orderId => {
          if(orderId) {
            statusOrder(coin, orderId, binance).then(avgPrice => {
              console.log('\n' + new Date().toLocaleTimeString() + ' Продали LONG: ' + coin + ' По цене: ' + avgPrice + '  в минус: ' + unRealizedProfit2 + ' -----------------------')
              console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
              pribl = pribl + unRealizedProfit2
              console.log('Общая прибыль: ' + pribl + '\n');
            })
          }
        })
      }
    }

    function buyFiba(a, b, c = '') {
      if(positionAmt < 0) {
        positionAmt = positionAmt * (-1)
      }

      cancellFiba = false
      counterWork--
      setTimeout(() => {
        coinOpenPamp[coin][0] = 0
      }, 60000)

      buyMarketCoin(coin, positionAmt, binance).then(orderId => {
        let unRealizedProfit2 = unRealizedProfit
        if(orderId) {
          statusOrder(coin, orderId, binance).then(avgPrice => {
            console.log('\n' + new Date().toLocaleTimeString() + ' Продали Памп: ' + coin + ' По цене: ' + avgPrice + '  в ' + a + ': ' + unRealizedProfit2 + '; ' + c + ' ' + b)
            console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
            pribl = pribl + unRealizedProfit2
            console.log('Общая прибыль: ' + pribl + '\n');
          })
        }
      })
    }

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'fibaTraid');
  }

  if(cancellFiba) {
    setTimeout(() => {
      fibaTraid(coin)
    }, 100)
  }
}