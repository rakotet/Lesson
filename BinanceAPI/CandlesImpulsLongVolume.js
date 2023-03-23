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
  APIKEY: 'uyaPRnAfTZfAGHnku75rygaAWEFM3THPQzeDCVpsN5sCrGHHD89fQzMENnBvsdsb',
  APISECRET: '1xTGtRmGrfr2OPkIpXD1l6yU6jq8eGifRRBwR9lrJcCm7C9v2QiwTruSKtdqeOf7'
});
const fs = require('fs')
const opn = require('opn')
let http = require('request')

const idBot = '5302452238:AAEmImsTrmLxdkZxDrQoPL4l1DzBnqhhdZg'
const idChatPlot = '-1001506995531'
const idChatManipul = '-1001196361965'

let counterWork = 0
let timeOpenSymbolDamp = {}
let timeOpenSymbolPamp = {}
let coinOpenPamp = {}
let coinPampSearch = {}
let coinVolumeSearch = {}
let maxPriceNumberObj = {}
let fibaObj = {}
let objMinus = {}
let stakanSpot = {}
let stakanFutures = {}
let positionRisObjShort = {}
let positionRisObjLong = {}
let dataRisk = {}
let i = 0

/////////////////////// Управление ботом
const numberMaxWork = 1 // количество одновременных сделок (1 - 5)                   ++++++++++++
const numberOneTrade = 100 // сумма одной сделки (10 - 1000)                          ++++++++++++
const percentPamp = 5 // Процент пампа первой свечи при котором начинаем слежение    ++++++++++++
const percentImpulsConst = 2 // % импульса при котором начинаем слежение            ++++++++++++
const percentDamp = 2 // Процент дампа при котором начинаем слежение
const plusProfitPercent = 0.20 // процент от цены входа до первой цели(23) по фибо
const maxMinus = 5 // максимальный минус в %                                      ++++++++++++
const maxMinuZaFiba = 0.01 // максимальный минус в % за фиба
const bezubitok = 0.01 // % безубытка                                               ++++++++++++
const bezubitokBuy = 0.002 // % безубытка                                            ++++++++++++
const zonaBuy = 0.01
const chastBuy = 3 // какую часть продать после достижения следующей цели по фиба
const houlderCandles = 10 // Плечо сделки                                            ++++++++++++
const openScrin = false // открывать сделки в браузере
let go = true // запускать покупку или нет                            ++++++++++++
const megaVolume = 350 //                                                             ++++++++++++
const numberMinus = 2 //                                                             ++++++++++++
///////////////////////

candlesOpenPamp(binance, opn, priceSymbolPamp, fs)

async function candlesOpenPamp(binance, opn, priceSymbolPamp, fs) {
  try {
    if(/*counterWork < numberMaxWork*/ true) { // проверка на количество открытых сделок
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
    let data = await binance.futuresCandles(coin, '1m', {limit: 99}) 
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
    let oneLow = Number(data[data.length - 1][3])

    let openVolumeTrade = false

    if((Number(data[data.length - 1][5]) >= (meanVolume * megaVolume)) && closePrice > openPrice) {
      openVolumeTrade = true
    }

    let openPriceImpuls = 0
    let openPriceImpulsStart = 0
    let timeOpenImpuls = 0
    let timeOpenImpulsStart = 0
    let numberW = 0;

    for(let i = data.length - 2; i > 0; i--) {
      if(Number(data[i][4]) <= Number(data[(i - 1)][1])
      && Number(data[(i - 1)][4]) <= Number(data[(i - 2)][1])) {
        if(Number(data[i][1]) > Number(data[i][4])) {
          openPriceImpuls = Number(data[i][4]) // цена начала импульса
        } else {
          openPriceImpuls = Number(data[i][1]) // цена начала импульса
        }
        timeOpenImpuls = Number(data[i][0]) // время начала импульса
        numberW = i
        break;
      } 
    }

    // тест нахождения истинного начала импульса
    
    // for(let w = data.length - 1; w > 0; w--) {
    //   if(Number(data[w][4]) <= Number(data[(w - 1)][1])
    //   && Number(data[(w - 1)][4]) <= Number(data[(w - 2)][1])) {
    //     if(Number(data[w][1]) > Number(data[w][4])) {
    //       openPriceImpulsStart = Number(data[w][4]) // цена начала импульса
    //     } else {
    //       openPriceImpulsStart = Number(data[w][1]) // цена начала импульса
    //     }
    //     timeOpenImpulsStart = Number(data[w][0]) // время начала импульса
    //     break;
    //   } 
    // }

    //

    let impulsMaxPrice = 0
    let impulsCandlesLength = 0

    for(let i = data.length - 1; i > 0; i--) {
      if(Number(data[i][1]) === openPriceImpuls || Number(data[i][4]) === openPriceImpuls) {
        break;
      } else {
        impulsCandlesLength++
      }
    }

    for(let i = data.length - 1; i > ((data.length - 1) - impulsCandlesLength); i--) {
      if(Number(data[i][1]) > Number(data[i][4])) {
        if(Number(data[i][1]) > impulsMaxPrice) impulsMaxPrice = Number(data[i][1])
      } else {
        if(Number(data[i][4]) > impulsMaxPrice) impulsMaxPrice = Number(data[i][4])
      }
    }

    let impulsPercent = Number((((impulsMaxPrice - openPriceImpuls) / openPriceImpuls) * 100).toFixed(2))

    if(openPrice > closePrice) {
      let differenceRed = Number((((openPrice - oneLow) / oneLow) * 100).toFixed(2))

      if(differenceRed >= percentDamp) {
        if(!timeOpenSymbolDamp[coin]) timeOpenSymbolDamp[coin] = [0]
        if(timeOpenSymbolDamp[coin][0] === 0) {
          let mess = '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - ДАМП - ' + differenceRed + ' цена - ' + closePrice + '\n'
          console.log(mess)
          mess += '\n' + '<a href="www.binance.com/ru/futures/' + coin + '"' + '>Ссылка на инструмент ' + coin + '</a>'
          sendTelega2(mess)
          //opn('https://www.binance.com/ru/futures/' + coin)
          timeOpenSymbolDamp[coin][0] = 1
          setTimeout(() => {
            timeOpenSymbolDamp[coin][0] = 0
          }, 300000)
        }
      }

    } else {
      let differenceGreen = Number((((oneHigh - openPrice) / openPrice) * 100).toFixed(2))

      if(differenceGreen >= percentPamp) {
        if(!coinPampSearch[coin]) coinPampSearch[coin] = [0]
        if(coinPampSearch[coin][0] === 0) {
          let mess = '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп 1 свечи + ' + differenceGreen + ' Прпоцент импульса ' + impulsPercent +  ' цена - ' + closePrice + ' - Время начала импульса ' + new Date(timeOpenImpuls).toLocaleTimeString() + '\n'
          mess += '<b>Зашли по Пампу первой свечи</b>'
          mess += '\n' + '<a href="www.binance.com/ru/futures/' + coin + '"' + '>Ссылка на инструмент ' + coin + '</a>'
          sendTelega2(mess)
          coinPampSearch[coin][0] = 1
          setTimeout(() => {
            coinPampSearch[coin][0] = 0
          }, 300000)
        }
      }

      if(openVolumeTrade) {
        if(!coinVolumeSearch[coin]) coinVolumeSearch[coin] = [0]
        if(coinVolumeSearch[coin][0] === 0) {
          let mess = '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп 1 свечи + ' + differenceGreen + ' Прпоцент импульса ' + impulsPercent +  ' цена - ' + closePrice + ' - Время начала импульса ' + new Date(timeOpenImpuls).toLocaleTimeString() + '\n'
          mess += '<b>Зашли по МЕГА Объему</b> Больше средего в ' + (Number(data[data.length - 1][5]) / meanVolume).toFixed(1) + ' раз.'
          mess += '\n' + '<a href="www.binance.com/ru/futures/' + coin + '"' + '>Ссылка на инструмент ' + coin + '</a>'
          sendTelega2(mess)
          coinVolumeSearch[coin][0] = 1
          setTimeout(() => {
            coinVolumeSearch[coin][0] = 0
          }, 300000)
        }
      }
      
      if((impulsPercent >= percentImpulsConst)) {
        if(!coinOpenPamp[coin]) coinOpenPamp[coin] = [0]
        if(!objMinus[coin]) objMinus[coin] = [0]
        if(!timeOpenSymbolPamp[coin]) timeOpenSymbolPamp[coin] = 99
        if(coinOpenPamp[coin][0] === 0) {
          if(!coinOpenPamp[coin][7]) coinOpenPamp[coin][7] = 0
          if(coinOpenPamp[coin][7] == 0) {

            let mess = '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - 22Памп 1 свечи + ' + differenceGreen + ' Прпоцент импульса ' + impulsPercent +  ' цена - ' + closePrice + ' - counterWork -  ' + counterWork +  ' - Время начала импульса ' + new Date(timeOpenImpuls).toLocaleTimeString() + '\n'
            console.log(mess);
            mess += '\n' + '<a href="www.binance.com/ru/futures/' + coin + '"' + '>Ссылка на инструмент ' + coin + '</a>'
            sendTelega2(mess)

            coinOpenPamp[coin][7] = 1
            setTimeout(() => {
              coinOpenPamp[coin][7] = 0
            }, 3000000)
          }

          if(counterWork < numberMaxWork) { // проверка на количество ф-й в работе
            if(Number(new Date().getMinutes()) !== timeOpenSymbolPamp[coin]) {
              counterWork++
              let mess = '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - 11Памп 1 свечи + ' + differenceGreen + ' Прпоцент импульса ' + impulsPercent +  ' цена - ' + closePrice + ' - counterWork -  ' + counterWork +  ' - Время начала импульса ' + new Date(timeOpenImpuls).toLocaleTimeString() + '\n'
              console.log(mess);
              coinOpenPamp[coin][0] = 1 // флаг того что памп пошел в работу
              coinOpenPamp[coin][5] = 0 // счетчик высчитывания импульса после запуска ф-и
              coinOpenPamp[coin][6] = 0 // вывод в лог данных по импульсу
              objMinus[coin][0] = 0 // счетчиков минусов сделок на одном инструменте
              timeOpenSymbolPamp[coin] = Number(new Date().getMinutes())
              priceSymbolPamp(coin, fs) 

              console.log(coin + ' - Тест нач импульс - ' + new Date(data[numberW - 1][0]).toLocaleTimeString()); 
        
              fs.appendFileSync("symbolPamp.txt", mess)

              mess += '\n' + '<a href="www.binance.com/ru/futures/' + coin + '"' + '>Ссылка на инструмент ' + coin + '</a>'
              sendTelega2(mess)

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

  //console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + '\n')

  try {
    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 180}) 
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
      coinOpenPamp[coin][5] = 1
    }

    if(coinOpenPamp[coin][3] == undefined) {
      cancell = false
      counterWork--
      let message = 'Монета только залистилась, сделок не будет'
      setTimeout(() => {
        coinOpenPamp[coin][0] = 0
      }, 3000000)
      console.log('\n' + new Date().toLocaleTimeString() + ' - ' + message + ' - ' + coin + ' - counterWork -  ' + counterWork + '\n');
      return false
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

    if(impulsPercent <= (percentImpulsConst - 1)) {
      cancell = false
      counterWork--
      let message = 'Импульс меньше ' + (percentImpulsConst - 1) + ' процентов'
      setTimeout(() => {
        coinOpenPamp[coin][0] = 0
      }, 300000)
      console.log('\n' + new Date().toLocaleTimeString() + ' - ' + message + ' - ' + coin + ' - counterWork -  ' + counterWork + '\n');
      return false
    }
   
    let f0 = impulsMaxPrice
    let f23 = Number((impulsMaxPrice - (impulsPrice * 0.23))/*.toFixed(numberOfSigns(oneClose))*/)
    let f38 = Number((impulsMaxPrice - (impulsPrice * 0.38)))
    let f50 = Number((impulsMaxPrice - (impulsPrice * 0.48)))
    let f60 = Number((impulsMaxPrice - (impulsPrice * 0.59)))
    let f78 = Number((impulsMaxPrice - (impulsPrice * 0.75)))
    let f100 = Number((impulsMaxPrice - (impulsPrice * 0.95)))
    let f161 = Number((impulsMaxPrice - (impulsPrice * 1.55)))

    let t1 = Number((impulsMaxPrice - (impulsPrice * 0.27)).toFixed(numberOfSigns(oneClose)))
    let t2 = Number((impulsMaxPrice - (impulsPrice * 0.40)).toFixed(numberOfSigns(oneClose)))
    let t3 = Number((impulsMaxPrice - (impulsPrice * 0.56)).toFixed(numberOfSigns(oneClose)))
    let t4 = Number((impulsMaxPrice - (impulsPrice * 0.71)).toFixed(numberOfSigns(oneClose)))
    let t5 = Number((impulsMaxPrice - (impulsPrice * 0.90)).toFixed(numberOfSigns(oneClose)))

    let f30Entrance = Number((impulsMaxPrice - (impulsPrice * 0.30))/*.toFixed(numberOfSigns(oneClose))*/)
    let minus = Number((impulsMaxPrice + (impulsMaxPrice * maxMinuZaFiba))/*.toFixed(numberOfSigns(oneClose))*/)
    let numberCoin = numberOfSigns(oneClose)

    let minusPercent = Number((((minus - f30Entrance) / f30Entrance) * 100).toFixed(2))

    if(minusPercent >= maxMinus) {
      minus = f30Entrance + (f30Entrance * (maxMinus / 100))
    }

    if(coinOpenPamp[coin][6] === 0) {
      console.log(' ');
      console.log(coin +' - время начала импульса - ' + new Date(coinOpenPamp[coin][4]).toLocaleTimeString() + ' - цена начала импульса - ' + coinOpenPamp[coin][3]);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsCandlesLength - ' + impulsCandlesLength);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsMaxPrice - ' + impulsMaxPrice);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsPercent - ' + impulsPercent);
      console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
      console.log(' ');

      coinOpenPamp[coin][6] = 1
    }

    if((oneClose <= f30Entrance) && (oneOpen > oneClose) && go) {
      cancell = false
      fibaObj[coin] = [0, 0, 0, 0, 0, 0, 0, 0]

      let mess = ('\n' + '---------------------------------------' + '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Открыли сделку - цена ' + oneClose + ' - counterWork - ' + counterWork + '\n' + '---------------------------------------' + '\n');
      console.log(mess);
      fs.appendFileSync("symbolPamp.txt", mess)

      setTimeout(() => {
        fibaTraidShort(coin, f0, f23, f38, f50, f60, f78, f100, f161, minus, f30Entrance, numberCoin, impulsPercent, minusPercent)
      }, 1500)

      sellMarketCoin(coin, numberCoinKey, binance).then(data => {
        if(data) {
          
        }
      })
    }
    
  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка priceSymbolPamp');
  }

  if(cancell) {
    setTimeout(() => {
      priceSymbolPamp(coin, fs)
    }, 10)
  }

}


////////////////////////////////////////////////////////////////////


async function fibaTraidShort(coin, f0, f23, f38, f50, f60, f78, f100, f161, minus, f30Entrance, numberCoin, impulsPercent, minusPercent) {
  let cancellFiba = true
  let number = 10

  try {
    if(fibaObj[coin][6] == 0) {
      dataRisk[coin] = await binance.futuresPositionRisk({symbol: coin}) 

      if(dataRisk[coin].code) {
        console.log(dataRisk[coin].code + ' - ' + dataRisk[coin].msg);
      }
    }
    
    let entryPrice = Number(dataRisk[coin][0]['entryPrice']) // цена входа в позицию
    let markPrice = Number(dataRisk[coin][0]['markPrice']) // текущая цена 
    let positionAmt = Number(dataRisk[coin][0]['positionAmt']) // количество монет в позиции

    if(fibaObj[coin][1] === 0) {
      console.log(' ');
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - numberCoin - ' + numberCoin);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - СТОП - ' + minus);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - minusPercent - ' + minusPercent);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsPercent - ' + impulsPercent);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f0 - ' + f0);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f23 - ' + f23);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f30Entrance - ' + f30Entrance);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f38 - ' + f38);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f50 - ' + f50);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f60 - ' + f60);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f78 - ' + f78);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f100 - ' + f100);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f161 - ' + f161);
      console.log(' ');
      fibaObj[coin][1] = 1
    }

    if(positionAmt < 0) {

      positionAmt = positionAmt * (-1)

      if(fibaObj[coin][0] === 0) {
        if(markPrice <= f38) {
          fibaObj[coin][0] = 1
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны f38 - ' + coin + '\n')
        }

        else if(markPrice >= minus) {
          buyFiba('МИНУС', '-------------------------')
        }
      }

      else if(fibaObj[coin][0] === 1) {
        if(markPrice >= minus) {
          //buyFiba('БЕЗУБЫТОК', '///////////////////////', 'Первая зона безубытка')
          buyFiba('МИНУС', '-------------------------')
        }

        else if(markPrice <= f50) {
          fibaObj[coin][0] = 2
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны f50 - ' + coin + '\n')

          buyMarketCoin(coin, (positionAmt / 2).toFixed(), binance).then(orderId => {
            if(orderId) {
              statusOrder(coin, orderId, binance).then(avgPrice => {
                console.log('\n' + new Date().toLocaleTimeString() + ' Продали половину: ' + coin + ' По цене: ' + avgPrice)
                console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
              })
            }
          })
        }
      }

      else if(fibaObj[coin][0] === 2) {
        if(markPrice >= f23) {
          buyFiba('БЕЗУБЫТОК', '///////////////////////', 'f23')
        }

        else if(markPrice <= f60) {
          fibaObj[coin][0] = 3
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны f60 - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 3) {
        if(markPrice >= f50) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'f50')
        }
         
        else if(markPrice <= f78) {
          fibaObj[coin][0] = 4
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны f78 - ' + coin + '\n')

          buyMarketCoin(coin, (positionAmt / 2).toFixed(), binance).then(orderId => {
            if(orderId) {
              statusOrder(coin, orderId, binance).then(avgPrice => {
                console.log('\n' + new Date().toLocaleTimeString() + ' Продали половину: ' + coin + ' По цене: ' + avgPrice)
                console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
              })
            }
          })
        }
      }

      else if(fibaObj[coin][0] === 4) {
        if(markPrice >= f60) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'f60')
        }

        else if(markPrice <= f100) {
          fibaObj[coin][0] = 5
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны f100 - ' + coin + '\n')
          buyFiba('ПЛЮС', '++++++++++++++++', 'f100')
        }
      }

    } else if (positionAmt === 0) {
      cancellFiba = false
      counterWork--
      setTimeout(() => {
        coinOpenPamp[coin][0] = 0
      }, 300000)
      console.log('\n' + new Date().toLocaleTimeString() + ' Вошли в fibaTraid с пустой позицией или закрыли сделку: ' + coin + ' counterWork - ' + counterWork + '\n')
    }
    
    else if (positionAmt > 0) {
      cancellFiba = false
      counterWork--
      setTimeout(() => {
        coinOpenPamp[coin][0] = 0
      }, 300000)
      buyMarketCoin(coin, positionAmt, binance).then(orderId => {
        if(orderId) {
          statusOrder(coin, orderId, binance).then(avgPrice => {
            console.log('\n' + new Date().toLocaleTimeString() + ' Продали LONG: ' + coin + ' По цене: ' + avgPrice + '  в плюс: ' + ' ++++++++++++++++++++')
            console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
          })
        }
      })
    }

    function buyFiba(a, b, c = '') {
      if(positionAmt < 0) {
        positionAmt = positionAmt * (-1)
      }

      cancellFiba = false
      counterWork--
      setTimeout(() => {
        coinOpenPamp[coin][0] = 0
      }, 300000)

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
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'fibaTraid');
  }

  if(cancellFiba) {
    setTimeout(() => {
      fibaTraidShort(coin, f0, f23, f38, f50, f60, f78, f100, f161, minus, f30Entrance, numberCoin, impulsPercent, minusPercent)
    }, number)
  }
}


/////////////////////////

function sendTelega2(msg) {
  msg = encodeURI(msg)

  http.post(`https://api.telegram.org/bot${idBot}/sendMessage?chat_id=${idChatManipul}&parse_mode=html&text=${msg}&disable_web_page_preview=True`, function (error, response, body) {  
      if(error) {
        console.log('error:', error); 
      }
      
      if(response.statusCode!==200){
        console.log(new Date().toLocaleTimeString() + ' - ' + 'Произошла ошибка при отправке сообщения в телеграм');
        console.log(response.statusCode);
      }
    });
}