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
const numberOneTrade = 500 // сумма одной сделки (10 - 1000)
const percentPamp = 2.5 // Процент пампа при котором начинаем слежение
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
const houlderCandles = 20 // Плечо сделки
const openScrin = true // открывать сделки в браузере
const volumeMega = 40
///////////////////////

candlesOpenPamp(binance, opn, fs)

async function candlesOpenPamp(binance, opn, fs) {
  try {
    if(counterWork < numberMaxWork) { // проверка на количество открытых сделок
      let candlesSymboldata = await binance.futuresPrices() 
  
      if(candlesSymboldata.code) {
        console.log(candlesSymboldata.code + ' - ' + candlesSymboldata.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - candlesOpenPamp')
      }
      
      for(let coin in candlesSymboldata) {
        if((candlesSymboldata[coin] < numberOneTrade) && coin.endsWith('USDT')) {
          getCandles(coin, binance, fs, opn)
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
      candlesOpenPamp(binance, opn, fs)
    }, 6000)
}

async function getCandles(coin, binance, fs, opn) { // получить свечи
  try{
    let data = await binance.futuresCandles(coin, '1m', {limit: 1}) 
    //console.log(data);
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    let openPrice = Number(data[data.length - 1][1])
    let closePrice = Number(data[data.length - 1][4])
    let oneHigh = Number(data[data.length - 1][2])
    
    let differenceGreen = Number((((oneHigh - openPrice) / openPrice) * 100).toFixed(2))
    
    if(differenceGreen >= percentPamp) {
      if(!coinOpenPamp[coin]) coinOpenPamp[coin] = [0]
      if(!timeOpenSymbolPamp[coin]) timeOpenSymbolPamp[coin] = 99
      if(coinOpenPamp[coin][0] === 0) {
        if(counterWork < numberMaxWork) { // проверка на количество ф-й в работе
          if(Number(new Date().getMinutes()) !== timeOpenSymbolPamp[coin]) {
            coinOpenPamp[coin][0] = 1 // флаг того что памп пошел в работу
            //opn('https://www.binance.com/ru/futures/' + coin)
            
            setTimeout(() => {
              coinOpenPamp[coin][0] = 0
            }, 20000)
            
            let mess = '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп + ' + differenceGreen + ' цена - ' + closePrice + '\n'
            console.log(mess);

            fs.appendFileSync("symbolPamp.txt", mess)

            //coinOpenPamp[coin][0] = 0
          }
        } 
      }
    }
      
     

  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка getCandles');
  }
  
}

//////////////////////////////////////////////////////////


