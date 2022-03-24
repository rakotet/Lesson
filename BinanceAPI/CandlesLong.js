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
const percentPamp = 1 // Процент пампа при котором начинаем слежение
const percentDamp = 1.5 // Процент дампа при котором начинаем слежение
const minProfitOpenTraid = 0.3 // Минимальный процент профита при котором открываем сделку (0.4 - 0.8)
const oneCandlesRed = 0.1 // Минимальный размер первой красной свечи для открытия сделки (0.0005 - 0.08)
const oneCandlesRed2 = 0.1 // Минимальный размер первой красной свечи для открытия сделки (0.0005 - 0.08)
const closeSearch = 0.23 // Минимальный процент от импульса для закрытия слежения
const constDown = 5 // Минимальный процент от импульса для захода в позицию
const constDown2 = 15 // Максимальный процент от импульса для захода в позицию
const percentBigCandles = 1.7 // Минимальный процент свечи для захода в позицию по большой свечи (1.25 - 2)
const minusBigCandles = 0.005 // Процент минуса после захода по большой свечи до растягивания фибы (0.5 - 2)
const plusBigCandles = 0.005 // Процент плюса после захода по большой свечи до растягивания фибы (0.5 - 1)
const stopPercentBig = 0.005 // Процент минуса после захода по большой свечи после растягивания фибы (0.5 - 2)
const stopPercentNormal = 0.005 // Процент минуса после захода по нормальному правилу после растягивания фибы (0.5 - 1)
const onTwoCandles = true // Включение или отключение 2х красных вконце для входа в позицию
const houlderCandles = 10 // Плечо сделки
const openScrin = true // открывать сделки в браузере
const volumeMega = 40
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
          getCandles(coin, binance, opn, priceSymbolPamp)
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

async function getCandles(coin, binance, opn, priceSymbolPamp) { // получить свечи
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
              //fibaTraid(coin)
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
    }, 500)
  }

}

async function fibaTraid(coin) {
  let cancellFiba = true

  try {
    if(fibaObj[coin][3] === 0) {

    }
    let data = await binance.futuresPositionRisk({symbol: coin}) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 1}) 
    if(candlesSymbol.code) {
      console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
    }

    let unRealizedProfit = Number(data[0]['unRealizedProfit']) // профит в $
    let entryPrice = Number(data[0]['entryPrice']) // цена входа в позицию
    //let markPrice = Number(data[0]['markPrice']) // текущая цена 
    let markPrice = Number(candlesSymbol[candlesSymbol.length - 1][4]) // текущая цена 
    let positionAmt = Number(data[0]['positionAmt']) // количество монет в позиции

    if(big) {
      stop = Number((f0 + (f0 * stopPercentBig)).toFixed(numberOfSigns(markPrice)))
    } else {
      stop = Number((f0 + (f0 * stopPercentNormal)).toFixed(numberOfSigns(markPrice)))
    }

    if(fibaObj[coin][1] === 0) {
      console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - СТОП - ' + stop);
      console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - f23 - ' + f23);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Конец импульса цена - ' + f0);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Начало импульса цена - ' + f100 + '\n');
      fibaObj[coin][1] = 1
    }

    if(positionAmt < 0) {
      if(fibaObj[coin][0] === 0) {
        if(markPrice >= stop || markPrice >= (entryPrice + (entryPrice * stopPercentBig))) {
          buyFiba('МИНУС', '-------------------------')
          // if(!impulsMinus) priceSymbolPamp(coin, true)
        }

        if(markPrice < f23) {
          fibaObj[coin][0] = 1
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f23 - ' + f23 + ' - ' + coin + '\n')
        }
      }

      if(fibaObj[coin][0] === 1) {
        if(big) {
          if((markPrice > f23) && (markPrice >= (entryPrice - (entryPrice * 0.002)))) {
            buyFiba('БЕЗУБЫТОК', '///////////////////////')
            // if(!impulsMinus) priceSymbolPamp(coin, true)
          }
        } 

        if(markPrice <= f38) {
          fibaObj[coin][0] = 2
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f38 - ' + f38 + ' - ' + coin + '\n')
        }
      }

      if(fibaObj[coin][0] === 2) {
        if((markPrice > f38) && (markPrice >= t1)) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T1')
          // console.log('\n' + new Date().toLocaleTimeString() + ' Запустили трекинг T1 - ' + coin + '\n')
          // tracking(coin, f100, f0, (Number(Date.now()) / 1000), 'T1')
        }
         

        if(markPrice <= f50) {
          fibaObj[coin][0] = 3
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f50 - ' + f50 + ' - ' + coin + '\n')
        }
      }

      if(fibaObj[coin][0] === 3) {
        if((markPrice > f50) && (markPrice >= t2)) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T2')
        }

        if(markPrice <= f60) {
          fibaObj[coin][0] = 4
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f60 - ' + f60 + ' - ' + coin + '\n')
        }
      }

      if(fibaObj[coin][0] === 4) {
        if((markPrice > f60) && (markPrice >= t3)) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T3')
        }

        if(markPrice <= f78) {
          fibaObj[coin][0] = 5
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f78 - ' + f78 + ' - ' + coin + '\n')
        }
      }

      if(fibaObj[coin][0] === 5) {
        if((markPrice > f78) && (markPrice >= t4)) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T4')
        }

        if(markPrice <= f100) {
          fibaObj[coin][0] = 6
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f100 - ' + f100 + ' - ' + coin + '\n')
        }
      }

      if(fibaObj[coin][0] === 6) {
        if((markPrice > f100) && (markPrice >= t5)) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T5')
        }

        if(markPrice <= f161) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T6')
        }
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
      coinOpenPamp[coin][0] = 0

      // if(((a === 'ПЛЮС') && c !== 'T1') || (impulsMinus && (a !== 'БЕЗУБЫТОК' && c !== 'T1'))) {
      //   counterWork--
      //   coinOpenPamp[coin][0] = 0
      // }

      buyMarketCoin(coin, positionAmt, binance).then(orderId => {
        let unRealizedProfit2 = unRealizedProfit
        if(orderId) {
          statusOrder(coin, orderId, binance).then(avgPrice => {
            console.log('\n' + new Date().toLocaleTimeString() + ' Продали Памп: ' + coin + ' По цене: ' + avgPrice + '  в ' + a + ': ' + unRealizedProfit2 + '; ' + c + ' ' + b)
            console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
            pribl = pribl + unRealizedProfit2
            if(a === 'МИНУС' && impulsMinus) {
              console.log('Остановили ф-ю после двух минусов, рынок оказался сильнее(((((((((((((((((((((((((((((((((((((((((');
            }
            console.log('Общая прибыль: ' + pribl + '\n');

            // if(a === 'МИНУС') {
            //   buyMarketCoin(coin, positionAmt, binance).then(orderId => {
            //     if(orderId) {
            //       console.log('\n' + new Date().toLocaleTimeString() + ' Встали в ЛОНГ после минуса: ' + coin + ' - counterWork - ' + counterWork + '\n')
            //       fibaTraid(coin, f0, f23, f38, f50, f60, stop, f78, t1, t2, t3, t4, t5, f100, f161, impulsMinus, f21)
            //     }
            //   })
            // }
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
    }, 500)
  }
}