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
let candlesGreen = {}
let fibaObj = {}
let pribl = 0

/////////////////////// Управление ботом
const numberMaxWork = 1 // количество одновременных сделок (1 - 5)
const numberOneTrade = 100 // сумма одной сделки (10 - 1000)
const percentPamp = 1 // Процент пампа при котором начинаем слежение
const percentDamp = 1.5 // Процент дампа при котором начинаем слежение
const minProfitOpenTraid = 0.3 // Минимальный процент профита при котором открываем сделку (0.4 - 0.8)
const oneCandlesRed = 0.1 // Минимальный размер первой красной свечи для открытия сделки (0.0005 - 0.08)
const oneCandlesRed2 = 0.1 // Минимальный размер первой красной свечи для открытия сделки (0.0005 - 0.08)
const closeSearch = 0.23 // Минимальный процент от импульса для закрытия слежения
const constDown = 7 // Минимальный процент от импульса для захода в позицию
const constDown2 = 15 // Максимальный процент от импульса для захода в позицию
const percentBigCandles = 1.5 // Минимальный процент свечи для захода в позицию по большой свечи (1.25 - 2)
const minusBigCandles = 0.08 // Процент минуса после захода по большой свечи до растягивания фибы (0.5 - 2)
const plusBigCandles = 0.01 // Процент плюса после захода по большой свечи до растягивания фибы (0.5 - 1)
const stopPercentBig = 0.08 // Процент минуса после захода по большой свечи после растягивания фибы (0.5 - 2)
const stopPercentNormal = 0.08 // Процент минуса после захода по нормальному правилу после растягивания фибы (0.5 - 1)
const onTwoCandles = true // Включение или отключение 2х красных вконце для входа в позицию
const houlderCandles = 10 // Плечо сделки
///////////////////////

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

    if(!candlesGreen[coin]) candlesGreen[coin] = 0

    if(candlesGreen[coin] == 0) {
      let greenRedCandles = 0
      
      for(let i = 2; i < 7; i++) {
        if(Number(data[data.length - i][1]) < Number(data[data.length - i][4])) {
          greenRedCandles++
        } else {
          greenRedCandles--
        }
      }

      //console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ' + greenRedCandles);
  
      if(greenRedCandles == 5) {
        if((((Number(data[data.length - 1][4]) - Number(data[data.length - 8][1])) / Number(data[data.length - 8][1])) * 100) >= 1.5) {
          console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - ' + greenRedCandles + ' зелёных подряд' + '\n');
          //opn('https://www.binance.com/ru/futures/' + coin)
          candlesGreen[coin] = 1
          setTimeout(() => {
            candlesGreen[coin] = 0
          }, 120000)
        }
        //console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ' + 'Меньше процента 8 зеленых');
      }
    }
    
    let volumeCandlesAll = 0

    for(let i = 0; i < data.length - 2; i++) {
      let volume = Number(data[i][5]) // объём 1
      volumeCandlesAll = volumeCandlesAll + volume
    }

    let meanVolume = volumeCandlesAll / (data.length - 2)

    let openPrice = Number(data[data.length - 1][1])
    let closePrice = Number(data[data.length - 1][4])

    if(!(Number(data[data.length - 1][5]) >= (meanVolume * 50))) { // защита от МЕГА объёмов 
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
        let differenceGreen = Number((((closePrice - openPrice) / openPrice) * 100).toFixed(2))
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
                timeOpenSymbolPamp[coin] = Number(new Date().getMinutes())
                priceSymbolPamp(coin) 
                opn('https://www.binance.com/ru/futures/' + coin)
              }
            } 
          }
        }
      }
    } else {
      if(coin !== 'BTTUSDT') {
        console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - МЕГА ОБЪЕМЫ ');
        opn('https://www.binance.com/ru/futures/' + coin)
      }
    }

  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка getCandles');
  }
  
}

function getDate(date) { // время свечи
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${new Date().getSeconds()}`
}


//////////////////////////////////////////////////////////

async function priceSymbolPamp(symbol, impulsMinus = false) {
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
    let oneHigh = Number(candlesSymbol[candlesSymbol.length - 1][2])

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
    let minKorrektion = (impulsPercent / 2) // возможно 2.1 - 2.3

    //if(minKorrektion > 1.5) minKorrektion = 1.5

    let priceTakeProfit = Number((impulsMaxPrice - (impulsMaxPrice * (minKorrektion / 100))).toFixed(numberOfSigns(oneClose)))
    let percentOneCloseTakeProfit = Number((((oneClose - priceTakeProfit) / oneClose) * 100).toFixed(2))
    let trueMinusPlus = /*((((((impulsMaxPrice + (impulsMaxPrice * 0.002)) - oneClose) / oneClose) * 100).toFixed(2)) <= percentOneCloseTakeProfit) &&*/ (percentOneCloseTakeProfit >= minProfitOpenTraid)

    if(coinOpenPamp[coin][5] === 0) {
      console.log(coin +' - время начала импульса - ' + new Date(coinOpenPamp[coin][4]) + ' - цена начала импульса - ' + coinOpenPamp[coin][3]);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsCandlesLength - ' + impulsCandlesLength);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsMaxPrice - ' + impulsMaxPrice);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - priceTakeProfit - ' + priceTakeProfit);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsPercent - ' + impulsPercent);
      console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - percentOneCloseTakeProfit - ' + percentOneCloseTakeProfit);
      console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
      coinOpenPamp[coin][5] = 1
    }

    let shadowCandlesTwo = false
    let shadowCandlesOne = false

    if(twoOpen > twoClose) {
      if(((twoOpen - twoClose) * 2) < (twoHigh - twoOpen)) shadowCandlesTwo = true
    } else if (twoOpen < twoClose) {
      if(((twoClose - twoOpen) * 2) < (twoHigh - twoClose)) shadowCandlesTwo = true
    }

    if(oneOpen > oneClose) {
      if(((oneOpen - oneClose) * 2) < (oneHigh - oneOpen)) shadowCandlesOne = true
    } else if (oneOpen < oneClose) {
      if(((oneClose - oneOpen) * 2) < (oneHigh - oneClose)) shadowCandlesOne = true
    }

    let redOne = impulsMaxPrice - oneClose
    let impulsPrice = impulsMaxPrice - coinOpenPamp[coin][3]
    let candlesPercentOne = (((oneHigh - oneOpen) / oneOpen) * 100)
    let candlesPercentHighToClose = (((oneHigh - oneClose) / (oneHigh - oneOpen)) * 100)
    let twoOpenTwoClose = (shadowCandlesTwo && ((oneOpen - oneClose) >= (oneOpen * oneCandlesRed))) || (shadowCandlesOne && ((oneOpen - oneClose) >= (oneOpen * oneCandlesRed2)))

    if(!onTwoCandles) {
      twoOpenTwoClose = true
    }

    if(oneClose < coinOpenPamp[coin][3] || oneClose <= (impulsMaxPrice - (impulsPrice * closeSearch)) || ((Number(Date.now()) / 1000) > (coinOpenPamp[coin][7] + 65))) { // если цена упала ниже начала импульса или коррекция уже прошла, но мы в нее не вошли, то выходим из ф-и
      cancell = false
      counterWork--
      coinOpenPamp[coin][0] = 0

      let message = 'Вышли из ф-и, прошло 1.5 мин коррекция не случилась, ушло выше'
      if(oneClose <= (impulsMaxPrice - (impulsPrice * closeSearch))) message = 'Вышли из ф-и, коррекция завершилась'
      console.log('\n' + new Date().toLocaleTimeString() + ' - ' + message + ' - ' + coin + ' - counterWork -  ' + counterWork + '\n');
    }  

    let down = constDown
    let down2 = constDown2

    // if(impulsMinus) {
    //   down = 5
    //   down2 = 20
    // }

    let twoRuleBool = true

    if(coinOpenPamp[coin][2] === 1) {
      twoOpenTwoClose = true
      trueMinusPlus = true
      down2 = 100
      twoRuleBool = false
    }

    if(/*((((redOne / impulsPrice) * 100) > 15) && (redOne > 0) && (((twoOpen - twoClose) > (twoOpen * 0.0006)) && ((oneOpen - oneClose) > (oneOpen * 0.0006)))) 
    && (percentOneCloseTakeProfit >= 0.3)*/
    ((((((redOne / impulsPrice) * 100) >= down) && (((redOne / impulsPrice) * 100) <= down2) && (redOne > 0)) && trueMinusPlus) && twoOpenTwoClose) 
    || ((candlesPercentOne >= percentBigCandles) && (candlesPercentHighToClose >= 5) && (oneClose > oneOpen) && (candlesPercentHighToClose <= 30) && trueMinusPlus) && twoRuleBool) {
      //opn('https://www.binance.com/ru/futures/' + coin)
      // counterWork--
      // coinOpenPamp[coin][0] = 0

      let numberCoinKey = Number((numberOneTrade / oneClose).toFixed())
      let priceToMinus = Number((impulsMaxPrice + (impulsMaxPrice * 0.003)).toFixed(numberOfSigns(oneClose)))

      // if(impulsMinus) {
      //   priceToMinus = (impulsMaxPrice + (impulsMaxPrice * 0.002)).toFixed(numberOfSigns(oneClose))
      // }

      let f0 = impulsMaxPrice
      let f23 = Number((impulsMaxPrice - (impulsPrice * 0.20)).toFixed(numberOfSigns(oneClose)))
      let f38 = Number((impulsMaxPrice - (impulsPrice * 0.36)).toFixed(numberOfSigns(oneClose)))
      let f50 = Number((impulsMaxPrice - (impulsPrice * 0.45)).toFixed(numberOfSigns(oneClose)))
      let f60 = Number((impulsMaxPrice - (impulsPrice * 0.60)).toFixed(numberOfSigns(oneClose)))
      let f78 = Number((impulsMaxPrice - (impulsPrice * 0.77)).toFixed(numberOfSigns(oneClose)))
      let f100 = Number((impulsMaxPrice - (impulsPrice * 1)).toFixed(numberOfSigns(oneClose)))
      let f161 = Number((impulsMaxPrice - (impulsPrice * 1.61)).toFixed(numberOfSigns(oneClose)))
      let f21 = Number((impulsMaxPrice - (impulsPrice * 0.05)).toFixed(numberOfSigns(oneClose)))

      let t1 = Number((impulsMaxPrice - (impulsPrice * 0.31)).toFixed(numberOfSigns(oneClose)))
      let t2 = Number((impulsMaxPrice - (impulsPrice * 0.40)).toFixed(numberOfSigns(oneClose)))
      let t3 = Number((impulsMaxPrice - (impulsPrice * 0.56)).toFixed(numberOfSigns(oneClose)))
      let t4 = Number((impulsMaxPrice - (impulsPrice * 0.71)).toFixed(numberOfSigns(oneClose)))
      let t5 = Number((impulsMaxPrice - (impulsPrice * 0.90)).toFixed(numberOfSigns(oneClose)))

      let flagImpuls = 0
      if(((candlesPercentOne >= percentBigCandles) && (candlesPercentHighToClose >= 5) && (oneClose > oneOpen) && (candlesPercentHighToClose <= 30) && trueMinusPlus) && twoRuleBool) {
        flagImpuls = 1
      } else {
        cancell = false
      }

      if(flagImpuls) {
        //console.log(new Date().toLocaleTimeString() + ' - ВЕРХ');
        if(coinOpenPamp[coin][2] === 0) {
          //opn('https://www.binance.com/ru/futures/' + coin)
          futuressHoulder(coin, houlderCandles, binance).then(data => {
            futuresMarginType(coin, binance).then(data => {
              sellMarketCoin(coin, numberCoinKey, binance).then(data => {
                if(data) {
                  console.log('---------------------------------------');
                  console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsPercent - ' + impulsPercent);
                  console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - percentOneCloseTakeProfit - ' + percentOneCloseTakeProfit);
                  console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                  console.log(new Date().toLocaleTimeString() + ' - Вошли в сделку по правилу БОЛЬШОЙ свечи - ' + flagImpuls);
                  console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку' + '\n' + '---------------------------------------');
                }
              })
            })
          })     
          
          coinOpenPamp[coin][2] = 1
        }

      } else {
        if(coinOpenPamp[coin][2] === 1) {
          fibaObj[coin] = [0, 0, 0, 0]
          coinOpenPamp[coin][2] = 0
          fibaTraid(coin, f0, f23, f38, f50, f60, priceToMinus, f78, t1, t2, t3, t4, t5, f100, f161, impulsMinus, f21, true, percentOneCloseTakeProfit)
        } else {
          futuressHoulder(coin, houlderCandles, binance).then(data => {
            futuresMarginType(coin, binance).then(data => {
              sellMarketCoin(coin, numberCoinKey, binance).then(data => {
                if(data) {
                  fibaObj[coin] = [0, 0, 0, 0]
                  fibaTraid(coin, f0, f23, f38, f50, f60, priceToMinus, f78, t1, t2, t3, t4, t5, f100, f161, impulsMinus, f21, false, percentOneCloseTakeProfit)
  
                  console.log('---------------------------------------');
                  console.log(coinOpenPamp[coin][6]);
                  console.log(coin +' - время начала импульса - ' + new Date(coinOpenPamp[coin][4]) + ' - цена начала импульса - ' + coinOpenPamp[coin][3]);
                  console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsCandlesLength - ' + impulsCandlesLength);
                  console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsMaxPrice - ' + impulsMaxPrice);
                  console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - priceTakeProfit - ' + priceTakeProfit);
                  console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - impulsPercent - ' + impulsPercent);
                  console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - percentOneCloseTakeProfit - ' + percentOneCloseTakeProfit);
                  console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                  console.log(new Date().toLocaleTimeString() + ' - Вошли в сделку по правилу - ' + flagImpuls);
                  console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку' + '\n' + '---------------------------------------');
                  //opn('https://www.binance.com/ru/futures/' + coin)
                }
              })
            })
          })     
        }
      }
    } else {
      if(coinOpenPamp[coin][2] === 1) {
        //console.log('\n' + new Date().toLocaleTimeString() + ' Попали в блок после сделки по правилу БОЛЬШОЙ свечи: ' + coin + '\n')
        let data = await binance.futuresPositionRisk({symbol: coin}) 
  
        if(data.code) {
          console.log(data.code + ' - ' + data.msg);
        }
  
        let unRealizedProfit = Number(data[0]['unRealizedProfit']) // профит в $
        let entryPrice = Number(data[0]['entryPrice']) // цена входа в позицию
        let markPrice = oneClose // текущая цена 
        let positionAmt = Number(data[0]['positionAmt']) // количество монет в позиции

        if(positionAmt < 0) {
          //console.log(new Date().toLocaleTimeString() + ' - НИЗ');
          positionAmt = positionAmt * (-1)

          if(markPrice > (entryPrice + (entryPrice * minusBigCandles))) {
            console.log('\n' + new Date().toLocaleTimeString() + ' Продали Памп БОЛЬШОЙ свечи по правилу ' + minusBigCandles + ' процента минуса: ' + coin + '\n')
            coinOpenPamp[coin][2] = 0
            cancell = false
            counterWork--
            coinOpenPamp[coin][0] = 0
            let unRealizedProfit2 = unRealizedProfit
            buyMarketCoin(coin, positionAmt, binance).then(orderId => {
              //await delay(10000)
              if(orderId) {
                statusOrder(coin, orderId, binance).then(avgPrice => {
                  console.log('\n' + new Date().toLocaleTimeString() + ' Продали Памп БОЛЬШОЙ свечи: ' + coin + ' По цене: ' + avgPrice + '  в ' + 'минус' + ': ' + unRealizedProfit2 + '; ' + '' + ' ' + '----------------')
                  console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                  pribl = pribl + unRealizedProfit2
                  console.log('Общая прибыль: ' + pribl + '\n');
                })
              }
            })
          }
  
          if(markPrice < (entryPrice - (entryPrice * plusBigCandles))) {
            console.log('\n' + new Date().toLocaleTimeString() + ' Продали Памп БОЛЬШОЙ свечи по правилу ' + plusBigCandles + ' процентов плюса: ' + coin + '\n')
            coinOpenPamp[coin][2] = 0
            cancell = false
            counterWork--
            coinOpenPamp[coin][0] = 0
            let unRealizedProfit2 = unRealizedProfit
            buyMarketCoin(coin, positionAmt, binance).then(orderId => {
              //await delay(10000)
              if(orderId) {
                statusOrder(coin, orderId, binance).then(avgPrice => {
                  console.log('\n' + new Date().toLocaleTimeString() + ' Продали Памп БОЛЬШОЙ свечи: ' + coin + ' По цене: ' + avgPrice + '  в ' + 'плюс' + ': ' + unRealizedProfit2 + '; ' + '' + ' ' + '++++++++++++++++++++')
                  console.log(new Date().toLocaleTimeString() + ' - counterWork - ' + counterWork);
                  pribl = pribl + unRealizedProfit2
                  console.log('Общая прибыль: ' + pribl + '\n');
                })
              }
            })
          }
        } else if (positionAmt === 0) {
          console.log('\n' + new Date().toLocaleTimeString() + ' Вошли в блок БОЛЬШИХ свечей с пустой позицией: ' + coin + ' counterWork - ' + counterWork + '\n')
          // coinOpenPamp[coin][2] = 0
          // cancell = false
          // counterWork--
          // coinOpenPamp[coin][0] = 0
        }
      }
    }

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка priceSymbolPamp');
  }

  if(cancell) {
    setTimeout(() => {
      priceSymbolPamp(coin, impulsMinus)
    }, 500)
  }

}

async function fibaTraid(coin, f0, f23, f38, f50, f60, stop, f78, t1, t2, t3, t4, t5, f100, f161, impulsMinus, f21, big = false, percentOneCloseTakeProfit) {
  let cancellFiba = true

  try {
    let data = await binance.futuresPositionRisk({symbol: coin}) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 2}) 
    if(candlesSymbol.code) {
      console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
    }

    let unRealizedProfit = Number(data[0]['unRealizedProfit']) // профит в $
    let entryPrice = Number(data[0]['entryPrice']) // цена входа в позицию
    //let markPrice = Number(data[0]['markPrice']) // текущая цена 
    let markPrice = Number(candlesSymbol[candlesSymbol.length - 1][4]) // текущая цена 
    let positionAmt = Number(data[0]['positionAmt']) // количество монет в позиции

    if(big) {
      stop = Number((entryPrice + (entryPrice * stopPercentBig)).toFixed(numberOfSigns(markPrice)))
    } else {
      stop = Number((entryPrice + (entryPrice * stopPercentNormal)).toFixed(numberOfSigns(markPrice)))
    }

    if(fibaObj[coin][1] === 0) {
      console.log('\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - СТОП - ' + stop);
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
          if((markPrice > f23) && (markPrice >= (entryPrice - (entryPrice * 0.005)))) {
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
      fibaTraid(coin, f0, f23, f38, f50, f60, stop, f78, t1, t2, t3, t4, t5, f100, f161, impulsMinus, f21, big, percentOneCloseTakeProfit)
    }, 500)
  }
}

async function tracking(coin, f100, f0, date, indF) { 
  let cancell = true

  try {
    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 80}) 

    if(candlesSymbol.code) {
      console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
    }

    let impulsPrice = f0 - f100
    let oneClose = Number(candlesSymbol[candlesSymbol.length - 1][4]) // текущая цена
    // let f23 = (f0 - (impulsPrice * 0.236)).toFixed(numberOfSigns(oneClose))
    // let f38 = (f0 - (impulsPrice * 0.382)).toFixed(numberOfSigns(oneClose))
    let f50 = Number((f0 - (impulsPrice * 0.50)).toFixed(numberOfSigns(oneClose)))
    // let f60 = (f0 - (impulsPrice * 0.618)).toFixed(numberOfSigns(oneClose))
    // let f78 = (f0 - (impulsPrice * 0.786)).toFixed(numberOfSigns(oneClose))
    
    if(oneClose > (f0 + (f0 * 0.005))) {
      console.log('\n' + new Date().toLocaleTimeString() + ' ТРЕКИНГ ' + indF + ': цена ушла ВЫШЕ f0 возможен Long - ' + coin + '\n');
      cancell = false
    } else if (oneClose < f50) {
      console.log('\n' + new Date().toLocaleTimeString() + ' ТРЕКИНГ ' + indF + ': цена ушла НИЖЕ f50 - ' + coin + '\n');
      cancell = false
    }

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'tracking');
  }

  if(((Number(Date.now()) / 1000) > (date + 10)) || !cancell) { // завершаем ф-ю если прошло больше 5 мин
    cancell = false
    counterWork--
    coinOpenPamp[coin][0] = 0
    console.log('\n' + new Date().toLocaleTimeString() + ' ТРЕКИНГ ' + indF + ': завершили работу ф-и! - ' + coin + ' - counterWork - ' + counterWork +  '\n');
  }

  if(cancell) {
    setTimeout(() => {
      tracking(coin, f100, f0, date, indF)
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

