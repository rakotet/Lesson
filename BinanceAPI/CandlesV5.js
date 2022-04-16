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
let fibaObj = {}
let dataRisk = {}
let i = 0

/////////////////////// Управление ботом
const numberMaxWork = 1 // количество одновременных сделок (1 - 5)
const numberOneTrade = 100 // сумма одной сделки (10 - 1000)
const percentPamp = 0.2 // Процент пампа при котором начинаем слежение
const percentDamp = 2 // Процент дампа при котором начинаем слежение
const plusProfitPercent = 0.25 // процент от цены входа до первой цели(23) по фибо
const maxMinus = 0.01 // максимальный минус в %
const maxMinuZaFiba = 0.003 // максимальный минус в % за фиба
const bezubitok = 0.002 // % безубытка
const chastBuy = 2 // какую часть продать после достижения следующей цели по фиба
const houlderCandles = 25 // Плечо сделки
const openScrin = true // открывать сделки в браузере
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
          await delay(10)
        }
      }
      //console.log(i);
    }
      
  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'candlesOpenPamp');
  }

    //console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

    setTimeout(() => {
      candlesOpenPamp(binance, opn, priceSymbolPamp, fs)
    }, 3000)
}

async function getCandles(coin, binance, opn, priceSymbolPamp, fs) { // получить свечи
  try{
    let data = await binance.futuresCandles(coin, '1m', {limit: 1}) 
    //console.log(data);
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    let openPrice = Number(data[data.length - 1][1])
    let closePrice = Number(data[data.length - 1][4])
    let oneHigh = Number(data[data.length - 1][2])

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
              let mess = '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп + ' + differenceGreen + ' цена - ' + closePrice + '\n'
              console.log(mess);
              coinOpenPamp[coin][0] = 1 // флаг того что памп пошел в работу
              coinOpenPamp[coin][5] = 0 // счетчик высчитывания импульса после запуска ф-и
              timeOpenSymbolPamp[coin] = Number(new Date().getMinutes())
              priceSymbolPamp(coin, fs) 

              fs.appendFileSync("symbolPamp.txt", mess)

              futuressHoulder(coin, houlderCandles, binance).then(data => {
                futuresMarginType(coin, binance).then(data => {
                  if(openScrin) {
                    opn('https://www.binance.com/ru/futures/' + coin)
                  }
                })
              })     
            }
          } 
        }
      }
    }

  } catch(e) {
    //console.log(e);
    //console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка getCandles');
  }
  
}

//////////////////////////////////////////////////////////

async function priceSymbolPamp(symbol, fs) {
  let coin = symbol
  let cancell = true

  try {
    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 90}) 
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
    let oneHigh = Number(candlesSymbol[candlesSymbol.length - 1][2])
    let oneLow = Number(candlesSymbol[candlesSymbol.length - 1][3])
    let twoLow = Number(candlesSymbol[candlesSymbol.length - 2][3])

    let numberCoinKey = Number((numberOneTrade / oneClose).toFixed())

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

    let impulsPercent = Number((((impulsMaxPrice - coinOpenPamp[coin][3]) / coinOpenPamp[coin][3]) * 100).toFixed(2))
    let impulsPrice = impulsMaxPrice - coinOpenPamp[coin][3]
    let f20 = Number((impulsMaxPrice - (impulsPrice * 0.20)).toFixed(numberOfSigns(oneClose)))
    let f15 = Number((impulsMaxPrice - (impulsPrice * 0.15)).toFixed(numberOfSigns(oneClose)))

    if(coinOpenPamp[coin][5] === 0) {
      console.log(' ');
      console.log(coin +' - время начала импульса - ' + new Date(coinOpenPamp[coin][4]) + ' - цена начала импульса - ' + coinOpenPamp[coin][3]);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsCandlesLength - ' + impulsCandlesLength);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsMaxPrice - ' + impulsMaxPrice);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsPercent - ' + impulsPercent);
      console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
      console.log(' ');
      coinOpenPamp[coin][5] = 1
    }

    if((oneLow < f20) && (twoLow < f20)) {
      cancell = false
      counterWork--
      coinOpenPamp[coin][0] = 0

      let message = 'Вышли из ф-и пошла коррекция, но мы не вошли'
      console.log('\n' + new Date().toLocaleTimeString() + ' - ' + message + ' - ' + coin + ' - counterWork -  ' + counterWork + '\n');
    }

    if((oneOpen > oneClose) && (twoOpen > twoClose) && (twoLow > f20) && (oneLow > f20) && (oneClose > f15) && ((((oneClose - f20) / f20) * 100)) > plusProfitPercent) {

      if(openScrin) {
        opn('https://www.binance.com/ru/futures/' + coin)
      }

      cancell = false

      let differenceGreen = Number((((oneHigh - oneOpen) / oneOpen) * 100).toFixed(2))
      let priceToMinus = Number((impulsMaxPrice + (impulsMaxPrice * maxMinuZaFiba)).toFixed(numberOfSigns(oneClose)))

      let f0 = impulsMaxPrice
      let f23 = Number((impulsMaxPrice - (impulsPrice * 0.20)).toFixed(numberOfSigns(oneClose)))
      let f38 = Number((impulsMaxPrice - (impulsPrice * 0.36)).toFixed(numberOfSigns(oneClose)))
      let f50 = Number((impulsMaxPrice - (impulsPrice * 0.45)).toFixed(numberOfSigns(oneClose)))
      let f60 = Number((impulsMaxPrice - (impulsPrice * 0.60)).toFixed(numberOfSigns(oneClose)))
      let f78 = Number((impulsMaxPrice - (impulsPrice * 0.77)).toFixed(numberOfSigns(oneClose)))
      let f100 = Number((impulsMaxPrice - (impulsPrice * 1)).toFixed(numberOfSigns(oneClose)))
      let f161 = Number((impulsMaxPrice - (impulsPrice * 1.61)).toFixed(numberOfSigns(oneClose)))

      let t1 = Number((impulsMaxPrice - (impulsPrice * 0.31)).toFixed(numberOfSigns(oneClose)))
      let t2 = Number((impulsMaxPrice - (impulsPrice * 0.40)).toFixed(numberOfSigns(oneClose)))
      let t3 = Number((impulsMaxPrice - (impulsPrice * 0.56)).toFixed(numberOfSigns(oneClose)))
      let t4 = Number((impulsMaxPrice - (impulsPrice * 0.71)).toFixed(numberOfSigns(oneClose)))
      let t5 = Number((impulsMaxPrice - (impulsPrice * 0.90)).toFixed(numberOfSigns(oneClose)))

      sellMarketCoin(coin, numberCoinKey, binance).then(data => {
        if(data) {
          fibaObj[coin] = [0, 0, 0, 0, 0, 0, 0]
          
          fibaTraid(coin, fs, f0, f23, f38, f50, f60, f78, f100, f161, t1, t2, t3, t4, t5, priceToMinus)
          let mess = ('\n' + '---------------------------------------' + '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Открыли сделку - цена ' + oneClose + ' - Памп ' + differenceGreen + ' - counterWork - ' + counterWork + '\n' + '---------------------------------------' + '\n');
          console.log(mess);
          fs.appendFileSync("symbolPamp.txt", mess)
        }
      })
         
    }
    
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка priceSymbolPamp');
  }

  if(cancell) {
    setTimeout(() => {
      priceSymbolPamp(coin, fs)
    }, 10)
  }

}

async function fibaTraid(coin, fs, f0, f23, f38, f50, f60, f78, f100, f161, t1, t2, t3, t4, t5, stop) {
  let cancellFiba = true
  let number = 10

  try {
    if(fibaObj[coin][6] == 0) {
      dataRisk[coin] = await binance.futuresPositionRisk({symbol: coin}) 

      //fibaObj[coin][6] = 1

      if(dataRisk[coin].code) {
        console.log(dataRisk[coin].code + ' - ' + dataRisk[coin].msg);
      }
    }

    // let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 1}) 
    // if(candlesSymbol.code) {
    //   console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
    // }
    
    let entryPrice = Number(dataRisk[coin][0]['entryPrice']) // цена входа в позицию
    //let markPrice = Number(candlesSymbol[candlesSymbol.length - 1][4]) // текущая цена 
    let markPrice = Number(dataRisk[coin][0]['markPrice']) // текущая цена 
    let positionAmt = Number(dataRisk[coin][0]['positionAmt']) // количество монет в позиции

    // let oneOpen = Number(candlesSymbol[candlesSymbol.length - 1][1])
    // let oneClose = Number(candlesSymbol[candlesSymbol.length - 1][4])
    // let oneHigh = Number(candlesSymbol[candlesSymbol.length - 1][2])
    // let oneLow = Number(candlesSymbol[candlesSymbol.length - 1][3])

    let percentMinusToStop = Number((((stop - entryPrice) / entryPrice) * 100).toFixed(2))

    if(fibaObj[coin][1] === 0) {
      console.log(' ');
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Процент от цены входа до стопа - ' + percentMinusToStop);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - СТОП - ' + stop);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f23 - ' + f23);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Конец импульса цена - ' + f0);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Начало импульса цена - ' + f100);
      console.log(' ');
      fibaObj[coin][1] = 1
    }

    if(positionAmt < 0) {
      if(fibaObj[coin][0] === 0) {
        if(markPrice >= stop || markPrice >= (entryPrice + (entryPrice * maxMinus))) {
          buyFiba('МИНУС', '-------------------------')
        }

        if(markPrice < f23) {
          fibaObj[coin][0] = 1
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f23 - ' + f23 + ' - ' + coin + '\n')

          /* Продали часть */

          if(markPrice < (entryPrice - (entryPrice * (plusProfitPercent / 100)))) {
            let kusok = Number((positionAmt / chastBuy).toFixed())
            if(kusok < 1) kusok = positionAmt

            buyMarketCoin(coin, kusok, binance).then(orderId => {
              if(orderId) {
                statusOrder(coin, orderId, binance).then(avgPrice => {
                  console.log(' ');
                  console.log(new Date().toLocaleTimeString() + ' Продали часть после первой отметки: ' + coin + ' По цене: ' + avgPrice)
                  console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                  console.log(' ');
                })
              }
            })
          }
        }
      }

      if(fibaObj[coin][0] === 1) {
        if((markPrice > f23) && (markPrice >= (entryPrice - (entryPrice * bezubitok)))) {
          buyFiba('БЕЗУБЫТОК', '///////////////////////')
        }

        if(markPrice <= f38) {
          fibaObj[coin][0] = 2
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f38 - ' + f38 + ' - ' + coin + '\n')

          let kusok = Number((positionAmt / chastBuy).toFixed())
          if(kusok < 1) kusok = positionAmt

          buyMarketCoin(coin, kusok, binance).then(orderId => {
            if(orderId) {
              statusOrder(coin, orderId, binance).then(avgPrice => {
                console.log(' ');
                console.log(new Date().toLocaleTimeString() + ' Продали часть после второй отметки: ' + coin + ' По цене: ' + avgPrice)
                console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                console.log(' ');
              })
            }
          })
        }
      }

      if(fibaObj[coin][0] === 2) {
        if((markPrice > f38) && (markPrice >= t1)) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T1')
        }
         
        if(markPrice <= f50) {
          fibaObj[coin][0] = 3
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f50 - ' + f50 + ' - ' + coin + '\n')

          let kusok = Number((positionAmt / chastBuy).toFixed())
          if(kusok < 1) kusok = positionAmt

          buyMarketCoin(coin, kusok, binance).then(orderId => {
            if(orderId) {
              statusOrder(coin, orderId, binance).then(avgPrice => {
                console.log(' ');
                console.log(new Date().toLocaleTimeString() + ' Продали часть после третьей отметки: ' + coin + ' По цене: ' + avgPrice)
                console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                console.log(' ');
              })
            }
          })
        }
      }

      if(fibaObj[coin][0] === 3) {
        if((markPrice > f50) && (markPrice >= t2)) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T2')
        }

        if(markPrice <= f60) {
          fibaObj[coin][0] = 4
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f60 - ' + f60 + ' - ' + coin + '\n')

          let kusok = Number((positionAmt / chastBuy).toFixed())
          if(kusok < 1) kusok = positionAmt

          buyMarketCoin(coin, kusok, binance).then(orderId => {
            if(orderId) {
              statusOrder(coin, orderId, binance).then(avgPrice => {
                console.log(' ');
                console.log(new Date().toLocaleTimeString() + ' Продали часть после четвертой отметки: ' + coin + ' По цене: ' + avgPrice)
                console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                console.log(' ');
              })
            }
          })
        }
      }

      if(fibaObj[coin][0] === 4) {
        if((markPrice > f60) && (markPrice >= t3)) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T3')
        }

        if(markPrice <= f78) {
          fibaObj[coin][0] = 5
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f78 - ' + f78 + ' - ' + coin + '\n')

          let kusok = Number((positionAmt / chastBuy).toFixed())
          if(kusok < 1) kusok = positionAmt

          buyMarketCoin(coin, kusok, binance).then(orderId => {
            if(orderId) {
              statusOrder(coin, orderId, binance).then(avgPrice => {
                console.log(' ');
                console.log(new Date().toLocaleTimeString() + ' Продали часть после пятой отметки: ' + coin + ' По цене: ' + avgPrice)
                console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                console.log(' ');
              })
            }
          })
        }
      }

      if(fibaObj[coin][0] === 5) {
        if((markPrice > f78) && (markPrice >= t4)) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T4')
        }

        if(markPrice <= f100) {
          fibaObj[coin][0] = 6
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли отметки f100 - ' + f100 + ' - ' + coin + '\n')

          let kusok = Number((positionAmt / chastBuy).toFixed())
          if(kusok < 1) kusok = positionAmt

          buyMarketCoin(coin, kusok, binance).then(orderId => {
            if(orderId) {
              statusOrder(coin, orderId, binance).then(avgPrice => {
                console.log(' ');
                console.log(new Date().toLocaleTimeString() + ' Продали часть после шестой отметки: ' + coin + ' По цене: ' + avgPrice)
                console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                console.log(' ');
              })
            }
          })
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
        sellMarketCoin(coin, positionAmt, binance).then(orderId => {
          if(orderId) {
            statusOrder(coin, orderId, binance).then(avgPrice => {
              console.log('\n' + new Date().toLocaleTimeString() + ' Продали LONG: ' + coin + ' По цене: ' + avgPrice + '  в плюс: ' + ' ++++++++++++++++++++')
              console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
            })
          }
        })
      }

      else if(markPrice < (entryPrice - (entryPrice * 0.002))) {
        cancellFiba = false
        counterWork--
        coinOpenPamp[coin][0] = 0
        sellMarketCoin(coin, positionAmt, binance).then(orderId => {
          if(orderId) {
            statusOrder(coin, orderId, binance).then(avgPrice => {
              console.log('\n' + new Date().toLocaleTimeString() + ' Продали LONG: ' + coin + ' По цене: ' + avgPrice + '  в минус: ' + ' -----------------------')
              console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
            })
          }
        })
      }
    }

    function buyFiba(a, b, c = '') {
      if(positionAmt < 0) {
        positionAmt = positionAmt * (-1)
      }

      if(a === 'ПЛЮС' || a === 'БЕЗУБЫТОК') {
        cancellFiba = false
        counterWork--
        setTimeout(() => {
          coinOpenPamp[coin][0] = 0
        }, 60000)
      } 
      
      else if (a === 'МИНУС') {
        cancellFiba = false
        priceSymbolPamp(coin, fs) 
      }

      

      buyMarketCoin(coin, positionAmt, binance).then(orderId => {
        if(orderId) {
          statusOrder(coin, orderId, binance).then(avgPrice => {
            console.log('\n' + new Date().toLocaleTimeString() + ' Продали Памп: ' + coin + ' По цене: ' + avgPrice + '  в ' + a + ': ' + '; ' + c + ' ' + b)
            console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
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
      fibaTraid(coin, fs, f0, f23, f38, f50, f60, f78, f100, f161, t1, t2, t3, t4, t5, stop)
    }, number)
  }
}