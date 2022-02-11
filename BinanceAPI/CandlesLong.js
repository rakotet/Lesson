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
const numberOneTrade = 1000 // сумма одной сделки (10 - 1000)
const percentPamp = 0.2 // Процент пампа при котором начинаем слежение
const percentDamp = 1.5 // Процент дампа при котором начинаем слежение
const minProfitOpenTraid = 0.3 // Минимальный процент профита при котором открываем сделку (0.4 - 0.8)
const oneCandlesRed = 0.1 // Минимальный размер первой красной свечи для открытия сделки (0.0005 - 0.08)
const oneCandlesRed2 = 0.1 // Минимальный размер первой красной свечи для открытия сделки (0.0005 - 0.08)
const closeSearch = 0.23 // Минимальный процент от импульса для закрытия слежения
const constDown = 7 // Минимальный процент от импульса для захода в позицию
const constDown2 = 15 // Максимальный процент от импульса для захода в позицию
const percentBigCandles = 20 // Минимальный процент свечи для захода в позицию по большой свечи (1.25 - 2)
const minusBigCandles = 0.005 // Процент минуса после захода по большой свечи до растягивания фибы (0.5 - 2)
const plusBigCandles = 0.004 // Процент плюса после захода по большой свечи до растягивания фибы (0.5 - 1)
const stopPercentBig = 0.005 // Процент минуса после захода по большой свечи после растягивания фибы (0.5 - 2)
const stopPercentNormal = 0.005 // Процент минуса после захода по нормальному правилу после растягивания фибы (0.5 - 1)
const onTwoCandles = true // Включение или отключение 2х красных вконце для входа в позицию
const houlderCandles = 20 // Плечо сделки
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
    let candlesSymbol = await binance.futuresCandles(coin, '1m', {limit: 61}) 
    if(candlesSymbol.code) {
      console.log(candlesSymbol.code + ' - ' + candlesSymbol.msg);
    }


    let oneOpen = Number(candlesSymbol[candlesSymbol.length - 1][1])
    let oneClose = Number(candlesSymbol[candlesSymbol.length - 1][4])
    let twoOpen = Number(candlesSymbol[candlesSymbol.length - 2][1])
    let twoClose = Number(candlesSymbol[candlesSymbol.length - 2][4])
    let twoHigh = Number(candlesSymbol[candlesSymbol.length - 2][2])
    let oneHigh = Number(candlesSymbol[candlesSymbol.length - 1][2])

    let impulsMaxPrice = 0
    let impulsMaxPriceTime = 0
    let impulsMaxPrice2 = 0
    let impulsMaxPrice2Time = 0
    let impulsMinPrice = 0
    let impulsMinPriceTime = 0
    let impulsMinPrice2 = 0
    let impulsMinPrice2Time = 0

    for(let i = 0; i < 30; i++) {
      if(Number(candlesSymbol[i][2]) > impulsMaxPrice) {
        impulsMaxPrice = Number(candlesSymbol[i][2])
        impulsMaxPriceTime = Number(candlesSymbol[i][0])
      }
    }

    for(let i = 31; i < candlesSymbol.length - 1; i++) {
      if(Number(candlesSymbol[i][2]) === impulsMaxPrice) continue;
      if((Number(candlesSymbol[i][2]) > impulsMaxPrice2) /*&& (Number(candlesSymbol[i][1]) < impulsMaxPrice)*/) {
        impulsMaxPrice2 = Number(candlesSymbol[i][2])
        impulsMaxPrice2Time = Number(candlesSymbol[i][0])
      }
    }

    console.log(`Max 1 - ${new Date(impulsMaxPriceTime)} ; 
    Max 2 - ${new Date(impulsMaxPrice2Time)}`);

    // for(let i = 0; i < candlesSymbol.length - 1; i++) {
    //   if(Number(candlesSymbol[i][1]) > Number(candlesSymbol[i][4])) {
    //     if(Number(candlesSymbol[i][1]) > impulsMinPrice) impulsMinPrice = Number(candlesSymbol[i][1])
    //   } else {
    //     if(Number(candlesSymbol[i][4]) > impulsMinPrice) impulsMinPrice = Number(candlesSymbol[i][4])
    //   }
    // }

   
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка priceSymbolPamp');
  }

  // if(cancell) {
  //   setTimeout(() => {
  //     priceSymbolPamp(coin, impulsMinus)
  //   }, 5000)
  // }

}

