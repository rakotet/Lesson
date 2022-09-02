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
const numberOneTrade = 50 // сумма одной сделки (10 - 1000)                          ++++++++++++
const percentPamp = 3 // Процент пампа первой свечи при котором начинаем слежение    ++++++++++++
const percentImpulsConst = 10 // % импульса при котором начинаем слежение            ++++++++++++
const percentDamp = 2 // Процент дампа при котором начинаем слежение
const plusProfitPercent = 0.20 // процент от цены входа до первой цели(23) по фибо
const maxMinus = 0.01 // максимальный минус в %                                      ++++++++++++
const maxMinuZaFiba = 0.01 // максимальный минус в % за фиба
const bezubitok = 0.01 // % безубытка                                               ++++++++++++
const bezubitokBuy = 0.005 // % безубытка                                            ++++++++++++
const zonaBuy = 0.01
const chastBuy = 3 // какую часть продать после достижения следующей цели по фиба
const houlderCandles = 25 // Плечо сделки                                            ++++++++++++
const openScrin = false // открывать сделки в браузере
const longAndShort = false // true лонгуем, false шортим                             ++++++++++++
const megaVolume = 80 //                                                             ++++++++++++
const numberMinus = 4 //                                                             ++++++++++++
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
    let data = await binance.futuresCandles(coin, '1m', {limit: 90}) 
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

    let openVolumeTrade = false

    if((Number(data[data.length - 1][5]) >= (meanVolume * megaVolume)) && closePrice > openPrice) {
      openVolumeTrade = true
    }

    let openPriceImpuls = 0
    let timeOpenImpuls = 0

    for(let i = data.length - 2; i > 0; i--) {
      if(Number(data[i][4]) <= Number(data[(i - 1)][1])
      && Number(data[(i - 1)][4]) <= Number(data[(i - 2)][1])) {
        if(Number(data[i][1]) > Number(data[i][4])) {
          openPriceImpuls = Number(data[i][4]) // цена начала импульса
        } else {
          openPriceImpuls = Number(data[i][1]) // цена начала импульса
        }
        timeOpenImpuls = Number(data[i][0]) // время начала импульса
        break;
      } 
    }

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
      
      if(/*(differenceGreen >= percentPamp) || */(impulsPercent >= percentImpulsConst)/* || openVolumeTrade*/) {
        if(!coinOpenPamp[coin]) coinOpenPamp[coin] = [0]
        if(!objMinus[coin]) objMinus[coin] = [0]
        if(!timeOpenSymbolPamp[coin]) timeOpenSymbolPamp[coin] = 99
        if(coinOpenPamp[coin][0] === 0) {
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
              //futuresPositionRiskPampSell()

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
      console.log('\n' + new Date().toLocaleTimeString() + ' - ' + message + ' - ' + coin + ' - counterWork -  ' + counterWork + '\n');
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
    let f25 = Number((impulsMaxPrice - (impulsPrice * 0.33))/*.toFixed(numberOfSigns(oneClose))*/)
    let f8 = Number((impulsMaxPrice - (impulsPrice * 0.08)).toFixed(numberOfSigns(oneClose)))

    if(coinOpenPamp[coin][6] === 0) {
      console.log(' ');
      console.log(coin +' - время начала импульса - ' + new Date(coinOpenPamp[coin][4]).toLocaleTimeString() + ' - цена начала импульса - ' + coinOpenPamp[coin][3]);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsCandlesLength - ' + impulsCandlesLength);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsMaxPrice - ' + impulsMaxPrice);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsPercent - ' + impulsPercent);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f25 - ' + f25);
      console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
      console.log(' ');

      coinOpenPamp[coin][6] = 1
    }

    let sdelkaOpen = false

    if(longAndShort) {
      sdelkaOpen = true
    } else {
      sdelkaOpen = (oneClose <= f25) && (oneClose < oneOpen)
    }

    if(/*(oneLow < f25) && (twoLow < f25) && (twoClose < twoOpen)*/sdelkaOpen) {
      cancell = false
      // counterWork--
      // setTimeout(() => {
      //   coinOpenPamp[coin][0] = 0
      // }, 300000)

      let message = 'Вышли из ф-и пошла коррекция, но мы не вошли f25 = ' + f25 + '; - время начала импульса - ' + new Date(coinOpenPamp[coin][4]).toLocaleTimeString() + ' - цена начала импульса - ' + coinOpenPamp[coin][3] + ' - ' + coin + ' - impulsMaxPrice - ' + impulsMaxPrice
      console.log('\n' + new Date().toLocaleTimeString() + ' - ' + message + ' - ' + coin + ' - counterWork -  ' + counterWork + '\n');

      if(longAndShort) {
        buyMarketCoin(coin, numberCoinKey, binance).then(data => {
          if(data) {
            let differenceGreen = Number((((oneHigh - oneOpen) / oneOpen) * 100).toFixed(2))
            let mess = ('\n' + '---------------------------------------' + '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Открыли сделку - цена ' + oneClose + ' - Памп ' + differenceGreen + ' - counterWork - ' + counterWork + '\n' + '---------------------------------------' + '\n');
            console.log(mess);
            fs.appendFileSync("symbolPamp.txt", mess)
            fibaObj[coin] = [0, 0, 0, 0, 0, 0, 0, 0]
            fibaTraid(coin)
          }
        })
      } else {
        sellMarketCoin(coin, numberCoinKey, binance).then(data => {
          if(data) {
            let differenceGreen = Number((((oneHigh - oneOpen) / oneOpen) * 100).toFixed(2))
            let mess = ('\n' + '---------------------------------------' + '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Открыли сделку - цена ' + oneClose + ' - Памп ' + differenceGreen + ' - counterWork - ' + counterWork + '\n' + '---------------------------------------' + '\n');
            console.log(mess);
            fs.appendFileSync("symbolPamp.txt", mess)
            fibaObj[coin] = [0, 0, 0, 0, 0, 0, 0, 0]
            fibaTraidShort(coin)
          }
        })
      }

      
    }

    if(true/*(impulsPercent >= percentImpulsConst)*/ /*&& (oneOpen > oneClose) && (twoOpen > twoClose) && (twoLow > f20) && (oneLow > f20) && (oneClose >= f8) && (((((oneClose - f20) / f20) * 100)) > plusProfitPercent)
    && ((oneOpen - oneClose) >= (oneOpen * 0.001)) /*&& (((twoOpen - twoClose) >= (twoOpen * 0.001)) && ((twoOpen - twoClose) < (twoOpen * 0.003)))/ && (impulsPercent >= percentImpulsConst)*/) {
      
      if(openScrin) {
        futuresPositionRiskPampSell()
        cancell = false
      }

      // let btcData = await binance.futuresCandles('BTCUSDT', '1m', {limit: 2}) 
      // if(btcData.code) {
      //   console.log(btcData.code + ' - ' + btcData.msg);
      // }

      // let oneOpen = Number(btcData[btcData.length - 1][1])
      // let oneClose = Number(btcData[btcData.length - 1][4])

      // console.log((((oneOpen - oneClose) / oneClose) * 100) + ' - BTC % свечи 1');

      // if(openScrin) {
      //   opn('https://www.binance.com/ru/futures/' + coin)
      // }
//////////////
      // try {
      //   binance.depth(coin, (error, depth, symbol) => {
      //     //if(error) console.log(error);
      
      //     let maxBids = [0, 0]
      //     let maxAsks = [0, 0]
      //     let volumeBids = 0
      //     let volumeAsks = 0
        
      //     for(let price in depth['bids']) {
      //       if((maxBids[1] < Number(depth['bids'][price])) && ((((oneClose - Number(price)) / Number(price)) * 100) < 0.5)) {
      //         maxBids[0] = Number(price)
      //         maxBids[1] = Number(depth['bids'][price])
      //       }
      //       volumeBids += Number(depth['bids'][price])
      //     }
        
      //     for(let price in depth['asks']) {
      //       if((maxAsks[1] < Number(depth['asks'][price])) && ((((Number(price) - oneClose) / oneClose) * 100) < 0.5)) {
      //         maxAsks[0] = Number(price)
      //         maxAsks[1] = Number(depth['asks'][price])
      //       }
      //       volumeAsks += Number(depth['asks'][price])
      //     }

      //     stakanSpot[coin] = [volumeBids, volumeAsks]
      
      //     // console.log('------------------');
      //     // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Спот Продать цена ' + maxAsks[0] + ' - лотов ' + maxAsks[1] + ' В баксах ' + (maxAsks[1] * oneClose).toFixed());
      //     // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Лотов ' + volumeAsks + ' В баксах ' + (volumeAsks * oneClose).toFixed());
      //     // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Спот Купить цена ' + maxBids[0] + ' - лотов ' + maxBids[1] + ' В баксах ' + (maxBids[1] * oneClose).toFixed());
      //     // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Лотов ' + volumeBids + ' В баксах ' + (volumeBids * oneClose).toFixed());
      //     // console.log(' ');
          
      //   }, 100);
    
      // } catch(e) {
      //   //console.log(e);
      //   console.log(new Date().toLocaleTimeString() + ' - ' + 'ошибка getSpot');
      // }

      // try {
      //   let book = await binance.futuresDepth(coin, {limit: 100});
      //   if(book.code) {
      //     console.log(book.code + ' - ' + book.msg);
      //   }
    
      //   let maxBids = [0, 0]
      //   let maxAsks = [0, 0]
      //   let volumeBids = 0
      //   let volumeAsks = 0
    
      //   for(let i = 0; i < book['bids'].length; i++) {
      //     if((maxBids[1] < Number(book['bids'][i][1])) && ((((oneClose - Number(book['bids'][i][0])) / Number(book['bids'][i][0])) * 100) < 0.5)) {
      //       maxBids[0] = Number(book['bids'][i][0])
      //       maxBids[1] = Number(book['bids'][i][1])
      //     }
      //     volumeBids += Number(book['bids'][i][1])
      //   }
    
      //   for(let i = 0; i < book['asks'].length; i++) {
      //     if((maxAsks[1] < Number(book['asks'][i][1])) && ((((Number(book['asks'][i][0]) - oneClose) / oneClose) * 100) < 0.5)) {
      //       maxAsks[0] = Number(book['asks'][i][0])
      //       maxAsks[1] = Number(book['asks'][i][1])
      //     }
      //     volumeAsks += Number(book['asks'][i][1])
      //   }

      //   stakanFutures[coin] = [volumeBids, volumeAsks]
    
      //   // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Футерсы Продать цена ' + maxAsks[0] + ' - лотов ' + maxAsks[1] + ' В баксах ' + (maxAsks[1] * oneClose).toFixed());
      //   // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Лотов ' + volumeAsks + ' В баксах ' + (volumeAsks * oneClose).toFixed());
      //   // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Футерсы Купить цена ' + maxBids[0] + ' - лотов ' + maxBids[1] + ' В баксах ' + (maxBids[1] * oneClose).toFixed());
      //   // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Лотов ' + volumeBids + ' В баксах ' + (volumeBids * oneClose).toFixed());
      //   // console.log('------------------');
      //   // console.log(' ');
        
      // } catch(e) {
      //   //console.log(e);
      //   console.log(new Date().toLocaleTimeString() + ' - ' + 'ошибка futuresDepth');
      // }

      // if(stakanSpot[coin][0] > stakanSpot[coin][1]) {
      //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - СПОТ LONG в ' + (stakanSpot[coin][0] / stakanSpot[coin][1]).toFixed(1))
      // } else {
      //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - СПОТ SHORT в ' + (stakanSpot[coin][1] / stakanSpot[coin][0]).toFixed(1))
      // }

      // if(stakanFutures[coin][0] > stakanFutures[coin][1]) {
      //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ФЬЮЧИ LONG в ' + (stakanFutures[coin][0] / stakanFutures[coin][1]).toFixed(1))
      // } else {
      //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ФЬЮЧИ SHORT в ' + (stakanFutures[coin][1] / stakanFutures[coin][0]).toFixed(1))
      // }

      // console.log(' ');
//////////
      if(false /*(oneOpen > oneClose) && ((((oneOpen - oneClose) / oneClose) * 100) >= 0.1)*/) {
        cancell = false

        let differenceGreen = Number((((oneHigh - oneOpen) / oneOpen) * 100).toFixed(2))
        let priceToMinus = Number((impulsMaxPrice + (impulsMaxPrice * maxMinuZaFiba)).toFixed(numberOfSigns(oneClose)))
  
        let f0 = impulsMaxPrice
        let f23 = Number((impulsMaxPrice - (impulsPrice * 0.20)).toFixed(numberOfSigns(oneClose)))
        let f38 = Number((impulsMaxPrice - (impulsPrice * 0.31)).toFixed(numberOfSigns(oneClose)))
        let f50 = Number((impulsMaxPrice - (impulsPrice * 0.45)).toFixed(numberOfSigns(oneClose)))
        let f60 = Number((impulsMaxPrice - (impulsPrice * 0.60)).toFixed(numberOfSigns(oneClose)))
        let f78 = Number((impulsMaxPrice - (impulsPrice * 0.77)).toFixed(numberOfSigns(oneClose)))
        let f100 = Number((impulsMaxPrice - (impulsPrice * 1)).toFixed(numberOfSigns(oneClose)))
        let f161 = Number((impulsMaxPrice - (impulsPrice * 1.61)).toFixed(numberOfSigns(oneClose)))
  
        let t1 = Number((impulsMaxPrice - (impulsPrice * 0.27)).toFixed(numberOfSigns(oneClose)))
        let t2 = Number((impulsMaxPrice - (impulsPrice * 0.40)).toFixed(numberOfSigns(oneClose)))
        let t3 = Number((impulsMaxPrice - (impulsPrice * 0.56)).toFixed(numberOfSigns(oneClose)))
        let t4 = Number((impulsMaxPrice - (impulsPrice * 0.71)).toFixed(numberOfSigns(oneClose)))
        let t5 = Number((impulsMaxPrice - (impulsPrice * 0.90)).toFixed(numberOfSigns(oneClose)))
  
        fibaObj[coin] = [0, 0, 0, 0, 0, 0, 0]
  
        sellMarketCoin(coin, numberCoinKey, binance).then(data => {
          if(data) {
            fibaTraid(coin, fs, f0, f23, f38, f50, f60, f78, f100, f161, t1, t2, t3, t4, t5, priceToMinus, impulsPercent)
            let mess = ('\n' + '---------------------------------------' + '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Открыли сделку - цена ' + oneClose + ' - Памп ' + differenceGreen + ' - counterWork - ' + counterWork + '\n' + '---------------------------------------' + '\n');
            console.log(mess);
            fs.appendFileSync("symbolPamp.txt", mess)
          }
        })
      }
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

async function fibaTraid(coin/*, fs, f0, f23, f38, f50, f60, f78, f100, f161, t1, t2, t3, t4, t5, stop, impulsPercent*/) {
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

    // let percentMinusToStop = Number((((stop - entryPrice) / entryPrice) * 100).toFixed(2))
    // let percentPlusToStop = Number((((entryPrice - f23) / f23) * 100).toFixed(2))

    // if(fibaObj[coin][1] === 0) {
    //   console.log(' ');
    //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Процент от цены входа до стопа - ' + percentMinusToStop);
    //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Процент цены до первого тейка - ' + percentPlusToStop);
    //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - СТОП - ' + stop);
    //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f23 - ' + f23);
    //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Конец импульса цена - ' + f0);
    //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Начало импульса цена - ' + f100);
    //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsPercent - ' + impulsPercent);
    //   console.log(' ');
    //   fibaObj[coin][1] = 1
    // }

    if(positionAmt > 0) {

      //if(positionAmt < 0) positionAmt = positionAmt * (-1)

      if(fibaObj[coin][0] === 0) {
        if(markPrice >= (entryPrice + (entryPrice * bezubitok))) {
          fibaObj[coin][0] = 1
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны первого безубытка - ' + coin + '\n')
        }

        else if(markPrice <= (entryPrice - (entryPrice * maxMinus))) {
          buyFiba('МИНУС', '-------------------------')
        }
      }

      else if(fibaObj[coin][0] === 1) {
        if(markPrice <= (entryPrice + (entryPrice * bezubitokBuy))) {
          buyFiba('БЕЗУБЫТОК', '///////////////////////', 'Первая зона безубытка')
        }

        else if(markPrice >= (entryPrice + (entryPrice * 0.02))) {
          fibaObj[coin][0] = 2
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны второго безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 2) {
        if(markPrice <= (entryPrice + (entryPrice * 0.01))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T0')
        }

        else if(markPrice >= (entryPrice + (entryPrice * 0.03))) {
          fibaObj[coin][0] = 3
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны третьего безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 3) {
        if(markPrice <= (entryPrice + (entryPrice * 0.02))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T1')
        }
         
        else if(markPrice >= (entryPrice + (entryPrice * 0.05))) {
          fibaObj[coin][0] = 4
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны четвертого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 4) {
        if(markPrice <= (entryPrice + (entryPrice * 0.04))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T2')
        }

        else if(markPrice >= (entryPrice + (entryPrice * 0.07))) {
          fibaObj[coin][0] = 5
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны пятого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 5) {
        if(markPrice <= (entryPrice + (entryPrice * 0.06))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T3')
        }

        else if(markPrice >= (entryPrice + (entryPrice * 0.08))) {
          fibaObj[coin][0] = 6
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны шестого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 6) {
        if(markPrice <= (entryPrice + (entryPrice * 0.07))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T4')
        }

        else if(markPrice >= (entryPrice + (entryPrice * 0.09))) {
          fibaObj[coin][0] = 7
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны седьмого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 7) {
        if(markPrice <= (entryPrice + (entryPrice * 0.08))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T5')
        }

        else if(markPrice >= (entryPrice + (entryPrice * 0.15))) {
          fibaObj[coin][0] = 8
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны восьмого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 8) {
        if(markPrice <= (entryPrice + (entryPrice * 0.10))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T6')
        }

        else if(markPrice >= (entryPrice + (entryPrice * 0.20))) {
          fibaObj[coin][0] = 9
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны девятого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 9) {
        if(markPrice <= (entryPrice + (entryPrice * 0.15))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T7')
        }

        else if(markPrice >= (entryPrice + (entryPrice * 0.25))) {
          fibaObj[coin][0] = 10
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны десятого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 10) {
        if(markPrice <= (entryPrice + (entryPrice * 0.20))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T8')
        }

        else if(markPrice >= (entryPrice + (entryPrice * 0.30))) {
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли последний зоны безубытка - ' + coin + '\n')
          buyFiba('ПЛЮС', '++++++++++++++++', 'T9')
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
    
    else if (positionAmt < 0) {
      positionAmt = positionAmt * (-1)

      if(markPrice > (entryPrice + (entryPrice * 0.01))) {
        cancellFiba = false
        counterWork--
        setTimeout(() => {
          coinOpenPamp[coin][0] = 0
        }, 300000)
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
        setTimeout(() => {
          coinOpenPamp[coin][0] = 0
        }, 300000)
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

      //if(a === 'ПЛЮС' || a === 'БЕЗУБЫТОК') {
        cancellFiba = false
        counterWork--
        setTimeout(() => {
          coinOpenPamp[coin][0] = 0
        }, 300000)
      //} 
      
      // else if (a === 'МИНУС') {
      //   cancellFiba = false
      //   objMinus[coin][0] = objMinus[coin][0] + 1
      //   // coinOpenPamp[coin][5] = 0
      //   // fibaObj[coin][6] = 0
      //   // coinOpenPamp[coin][6] = 0
      //   // setTimeout(() => {
      //   //   priceSymbolPamp(coin, fs) 
      //   // }, 30000)
      // }

      // else if (a === 'БЕЗУБЫТОК') {
      //   cancellFiba = false
      //   coinOpenPamp[coin][5] = 0
      //   fibaObj[coin][6] = 0
      //   coinOpenPamp[coin][6] = 0
      //   setTimeout(() => {
      //     priceSymbolPamp(coin, fs) 
      //   }, 30000)
      // }

      

      sellMarketCoin(coin, positionAmt, binance).then(orderId => {
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
      fibaTraid(coin/*, fs, f0, f23, f38, f50, f60, f78, f100, f161, t1, t2, t3, t4, t5, stop, impulsPercent*/)
    }, number)
  }
}

////////////////////////////////////////////////////////////////////


async function fibaTraidShort(coin) {
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

    // let percentMinusToStop = Number((((stop - entryPrice) / entryPrice) * 100).toFixed(2))
    // let percentPlusToStop = Number((((entryPrice - f23) / f23) * 100).toFixed(2))

    if(fibaObj[coin][1] === 0) {
      console.log(' ');
      // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Процент от цены входа до стопа - ' + percentMinusToStop);
      // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Процент цены до первого тейка - ' + percentPlusToStop);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - СТОП - ' + (entryPrice + (entryPrice * maxMinus)));
      // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - f23 - ' + f23);
      // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Конец импульса цена - ' + f0);
      // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Начало импульса цена - ' + f100);
      // console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsPercent - ' + impulsPercent);
      console.log(' ');
      fibaObj[coin][1] = 1
    }

    if(positionAmt < 0) {

      positionAmt = positionAmt * (-1)

      if(fibaObj[coin][0] === 0) {
        if(markPrice <= (entryPrice - (entryPrice * bezubitok))) {
          fibaObj[coin][0] = 1
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны первого безубытка - ' + coin + '\n')
        }

        else if(markPrice >= (entryPrice + (entryPrice * maxMinus))) {
          buyFiba('МИНУС', '-------------------------')
        }
      }

      else if(fibaObj[coin][0] === 1) {
        if(markPrice >= (entryPrice - (entryPrice * bezubitokBuy))) {
          buyFiba('БЕЗУБЫТОК', '///////////////////////', 'Первая зона безубытка')
        }

        else if(markPrice <= (entryPrice - (entryPrice * 0.02))) {
          fibaObj[coin][0] = 2
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны второго безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 2) {
        if(markPrice >= (entryPrice - (entryPrice * 0.01))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T0')
        }

        else if(markPrice <= (entryPrice - (entryPrice * 0.03))) {
          fibaObj[coin][0] = 3
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны третьего безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 3) {
        if(markPrice >= (entryPrice - (entryPrice * 0.02))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T1')
        }
         
        else if(markPrice <= (entryPrice - (entryPrice * 0.05))) {
          fibaObj[coin][0] = 4
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны четвертого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 4) {
        if(markPrice >= (entryPrice - (entryPrice * 0.04))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T2')
        }

        else if(markPrice <= (entryPrice - (entryPrice * 0.07))) {
          fibaObj[coin][0] = 5
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны пятого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 5) {
        if(markPrice >= (entryPrice - (entryPrice * 0.06))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T3')
        }

        else if(markPrice <= (entryPrice - (entryPrice * 0.08))) {
          fibaObj[coin][0] = 6
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны шестого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 6) {
        if(markPrice >= (entryPrice - (entryPrice * 0.07))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T4')
        }

        else if(markPrice <= (entryPrice - (entryPrice * 0.09))) {
          fibaObj[coin][0] = 7
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны седьмого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 7) {
        if(markPrice >= (entryPrice - (entryPrice * 0.08))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T5')
        }

        else if(markPrice <= (entryPrice - (entryPrice * 0.10))) {
          fibaObj[coin][0] = 8
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны восьмого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 8) {
        if(markPrice >= (entryPrice - (entryPrice * 0.09))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T6')
        }

        else if(markPrice <= (entryPrice - (entryPrice * 0.11))) {
          fibaObj[coin][0] = 9
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны девятого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 9) {
        if(markPrice >= (entryPrice - (entryPrice * 0.10))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T7')
        }

        else if(markPrice <= (entryPrice - (entryPrice * 0.12))) {
          fibaObj[coin][0] = 10
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны десятого безубытка - ' + coin + '\n')
        }
      }

      else if(fibaObj[coin][0] === 10) {
        if(markPrice >= (entryPrice - (entryPrice * 0.11))) {
          buyFiba('ПЛЮС', '++++++++++++++++', 'T8')
        }

        else if(markPrice <= (entryPrice - (entryPrice * 0.15))) {
          console.log('\n' + new Date().toLocaleTimeString() + ' Достигли последний зоны безубытка - ' + coin + '\n')
          buyFiba('ПЛЮС', '++++++++++++++++', 'T9')
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

      if(markPrice > (entryPrice + (entryPrice * 0.01))) {
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

      else if(markPrice < (entryPrice - (entryPrice * 0.002))) {
        cancellFiba = false
        counterWork--
        setTimeout(() => {
          coinOpenPamp[coin][0] = 0
        }, 300000)
        buyMarketCoin(coin, positionAmt, binance).then(orderId => {
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
        }, 300000)
      } 
      
      else if (a === 'МИНУС') {
        cancellFiba = false
        objMinus[coin][0] = objMinus[coin][0] + 1
        // coinOpenPamp[coin][5] = 0
        // fibaObj[coin][6] = 0
        // coinOpenPamp[coin][6] = 0
        // setTimeout(() => {
        //   priceSymbolPamp(coin, fs) 
        // }, 30000)
      }

      // else if (a === 'БЕЗУБЫТОК') {
      //   cancellFiba = false
      //   coinOpenPamp[coin][5] = 0
      //   fibaObj[coin][6] = 0
      //   coinOpenPamp[coin][6] = 0
      //   setTimeout(() => {
      //     priceSymbolPamp(coin, fs) 
      //   }, 30000)
      // }

      

      buyMarketCoin(coin, positionAmt, binance).then(orderId => {
        if(orderId) {
          statusOrder(coin, orderId, binance).then(avgPrice => {
            console.log('\n' + new Date().toLocaleTimeString() + ' Продали Памп: ' + coin + ' По цене: ' + avgPrice + '  в ' + a + ': ' + '; ' + c + ' ' + b)
            console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
            if(a === 'МИНУС' && objMinus[coin][0] < numberMinus) {
              coinOpenPamp[coin][6] = 0
              priceSymbolPamp(coin, fs)
              console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' зашли после минуса - counterWork - ' + counterWork + '\n');
            } else if(a === 'МИНУС' && objMinus[coin][0] == numberMinus) {
              counterWork--
              setTimeout(() => {
                coinOpenPamp[coin][0] = 0
              }, 300000)
              console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' Словили второй минус на монете - counterWork - ' + counterWork + '\n');
            }
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
      fibaTraidShort(coin)
    }, number)
  }
}


////////////////////////////////////////////////////////////////////

async function futuresPositionRiskPampSell() {
  let timeout = 10
  
  try {
    let data = await binance.futuresPositionRisk() 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
      throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - futuresPositionRiskPampSell')
    }
  
    let markets = Object.keys( data );
    for ( let market of markets ) {
      let obj = data[market], size = Number( obj.positionAmt );
      if ( size != 0) {
        let unRealizedProfit = Number(obj['unRealizedProfit'])
        let entryPrice = Number(obj['entryPrice']) // цена входа в позицию
        let markPrice = Number(obj['markPrice']) // текущая цена маркировки
        let positionAmt = Number(obj['positionAmt']) // количество монет в позиции
        let coin = obj['symbol']
        
        if(positionAmt < 0) {
          positionAmt = positionAmt * (-1)

          if(!positionRisObjShort[coin]) positionRisObjShort[coin] = [0]

          if(markPrice >= (entryPrice + (entryPrice * maxMinus))) {
            timeout = 1500
            buyMarketCoin(coin, positionAmt, binance).then(orderId => {
              if(orderId) {
                statusOrder(coin, orderId, binance).then(avgPrice => {
                  console.log('\n' + new Date().toLocaleTimeString() + ' Продали Short в МИНУС: ' + coin + ' По цене: ' + avgPrice)
                  console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                })
              }
            })
          }

          if(positionRisObjShort[coin][0] === 0) {
            if(markPrice <= (entryPrice - (entryPrice * bezubitok))) {
              positionRisObjShort[coin][0] = 1
              console.log('\n' + new Date().toLocaleTimeString() + ' Достигли 1 зоны безубытка - ' + coin + '\n')
            }
          }

          if(positionRisObjShort[coin][0] === 1) {
            if(markPrice >= (entryPrice - (entryPrice * bezubitokBuy))) {
              positionRisObjShort[coin][0] = 0
              timeout = 1500
              buyMarketCoin(coin, positionAmt, binance).then(orderId => {
                if(orderId) {
                  statusOrder(coin, orderId, binance).then(avgPrice => {
                    console.log('\n' + new Date().toLocaleTimeString() + ' Продали Short в Безубыток 1: ' + coin + ' По цене: ' + avgPrice)
                    console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                  })
                }
              })
            } else if (markPrice <= (entryPrice - (entryPrice * 0.035))) {
              positionRisObjShort[coin][0] = 2
              console.log('\n' + new Date().toLocaleTimeString() + ' Достигли 2 зоны безубытка - ' + coin + '\n')
            }
          }

          if(positionRisObjShort[coin][0] === 2) {
            if(markPrice >= (entryPrice - (entryPrice * 0.03))) {
              positionRisObjShort[coin][0] = 0
              timeout = 1500
              buyMarketCoin(coin, positionAmt, binance).then(orderId => {
                if(orderId) {
                  statusOrder(coin, orderId, binance).then(avgPrice => {
                    console.log('\n' + new Date().toLocaleTimeString() + ' Продали Short в Безубыток 2: ' + coin + ' По цене: ' + avgPrice)
                    console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                  })
                }
              })
            } else if (markPrice <= (entryPrice - (entryPrice * 0.10))) {
              //positionRisObjShort[coin][0] = 2
              console.log('\n' + new Date().toLocaleTimeString() + ' Достигли 3 зоны безубытка - ' + coin + '\n')
            }
          }


        } else if (positionAmt > 0) {
          if(!positionRisObjLong[coin]) positionRisObjLong[coin] = [0]

          if(markPrice <= (entryPrice - (entryPrice * maxMinus))) {
            timeout = 1500
            sellMarketCoin(coin, positionAmt, binance).then(orderId => {
              if(orderId) {
                statusOrder(coin, orderId, binance).then(avgPrice => {
                  console.log('\n' + new Date().toLocaleTimeString() + ' Продали Long в МИНУС: ' + coin + ' По цене: ' + avgPrice)
                  console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                })
              }
            })
          }

          if(positionRisObjLong[coin][0] === 0) {
            if(markPrice >= (entryPrice + (entryPrice * bezubitok))) {
              positionRisObjLong[coin][0] = 1
              console.log('\n' + new Date().toLocaleTimeString() + ' Достигли зоны безубытка - ' + coin + '\n')
            }
          }

          if(positionRisObjLong[coin][0] === 1) {
            if(markPrice <= (entryPrice + (entryPrice * bezubitokBuy))) {
              positionRisObjLong[coin][0] = 0
              timeout = 1500
              sellMarketCoin(coin, positionAmt, binance).then(orderId => {
                if(orderId) {
                  statusOrder(coin, orderId, binance).then(avgPrice => {
                    console.log('\n' + new Date().toLocaleTimeString() + ' Продали Long в Безубыток: ' + coin + ' По цене: ' + avgPrice)
                    console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                  })
                }
              })
            }
          }
        }
      }
    }

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresPositionRiskPampSell');
  }
  
  setTimeout(() => {
    futuresPositionRiskPampSell()
  }, timeout)
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