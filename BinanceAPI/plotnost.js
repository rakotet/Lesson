const futuressHoulder = require('./function/futuressHoulder')
const futuresMarginType = require('./function/futuresMarginType')
const statusOrder = require('./function/statusOrder')
const sellMarketCoin = require('./function/sellMarketCoin')
const buyMarketCoin = require('./function/buyMarketCoin')
const numberOfSigns = require('./function/numberOfSigns')

const delay = ms => new Promise(res => setTimeout(res, ms));

let fapi = 'https://fapi.binance.com/fapi/'

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
let i = 0

let coinObjBids = {}
let coinObjAsks = {}
let coinObjBidsFuters = {}
let coinObjAsksFuters = {}

/////////////////////// Управление ботом
const numberMaxWork = 1 // количество одновременных сделок (1 - 5)
const numberOneTrade = 100 // сумма одной сделки (10 - 1000)
const percentPamp = 10 // Процент пампа при котором начинаем слежение
const percentImpulsConst = 10
const percentDamp = 2 // Процент дампа при котором начинаем слежение
const buyBuksSpot = 2000000
const buyBuksFutures = 2000000
// const buyBuksSpot = 500000
// const buyBuksFutures = 500000
const percentPriceCoin = 1.5
const percentPriceFutures = 1.5
const openScrinSpotFutures = false
const openScrinPamp = false
const openScrinDamp = false
const houlderCandles = 25
///////////////////////

//candlesOpenPamp(binance, opn, fs)
//candlesOpenFutures(binance, opn, fs)
openPampCandlesPercentTwo(binance, opn, fs)

async function candlesOpenPamp(binance, opn, fs) {
  try {
    //console.log(new Date().getSeconds())
    if(counterWork < numberMaxWork) { // проверка на количество открытых сделок
      let candlesSymboldata = await binance.futuresPrices() 
 
      if(candlesSymboldata.code) {
        console.log(candlesSymboldata.code + ' - ' + candlesSymboldata.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - candlesOpenPamp')
      }
      
      for(let coin in candlesSymboldata) {
        if((candlesSymboldata[coin] < numberOneTrade) && coin.endsWith('USDT')) {
          getSpot(coin, binance, fs, opn, Number(candlesSymboldata[coin]))
          //i++
          await delay(40)
        }
      }
      //console.log(i);
    }
    //console.log(new Date().getSeconds())
  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'ошибка candlesOpenPamp');
  }

    //console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

    setTimeout(() => {
      candlesOpenPamp(binance, opn, fs)
    }, 35000)
}

async function getSpot(coin, binance, fs, opn, priceCoinLive) { // получить свечи
  try {
    binance.depth(coin, (error, depth, symbol) => {
      //if(error) console.log(error);
  
      let maxBids = [0, 0]
      let maxAsks = [0, 0]
      let megaPlotnost = buyBuksSpot / priceCoinLive
      // let volumeBids = 0
      // let volumeAsks = 0
    
      for(let price in depth['bids']) {
        if((maxBids[1] < Number(depth['bids'][price])) && ((((priceCoinLive - Number(price)) / Number(price)) * 100) < percentPriceCoin)) {
          maxBids[0] = Number(price)
          maxBids[1] = Number(depth['bids'][price])
        }
  
        //volumeBids += depth['bids'][price]
      }
    
      for(let price in depth['asks']) {
        if((maxAsks[1] < Number(depth['asks'][price])) && ((((Number(price) - priceCoinLive) / priceCoinLive) * 100) < percentPriceCoin)) {
          maxAsks[0] = Number(price)
          maxAsks[1] = Number(depth['asks'][price])
        }
  
        //volumeAsks += depth['asks'][price]
      }
  
      // console.log('------------------');
      // console.log(`${maxAsks} - продать - средний объем - ${volumeAsks / 100}`);
      // console.log(`${maxBids} - купить - средний объем - ${volumeBids / 100}`);
      // console.log('------------------');

      if(maxBids[1] >= megaPlotnost) {
        let percent = (((priceCoinLive - Number(maxBids[0])) / Number(maxBids[0])) * 100).toFixed(2)
        percent = percent < 0 ? (percent * (-1)) : percent

        if(!coinObjBids[coin]) coinObjBids[coin] = [0]
        if(coinObjBids[coin][0] === 0) {
          let mess = `${new Date().toLocaleTimeString()} - ${coin} - СПОТ мега Плотность! на LONG - цена ${maxBids[0]} - V ${divideNumber((Number(maxBids[1]) * priceCoinLive).toFixed())} БАКСОВ ${Number(maxBids[1])} Лотов - Процент до цены ${percent} \n`
          console.log(mess);
          
          coinObjBids[coin][0] = Number(maxBids[1])
          coinObjBids[coin][1] = Number(maxBids[0])

          fs.appendFileSync("symbolPamp.txt", mess)
          sendTelega(mess)
          if(openScrinSpotFutures) opn('https://www.binance.com/ru/futures/' + coin)

        } else {
          //console.log(`${coin} - coinObjBids[coin][1] - ${coinObjBids[coin][1]} ; Number(maxBids[0]) - ${Number(maxBids[0])}`);
          if(!(/*(coinObjBids[coin][0] === Number(maxBids[1])) &&*/ (coinObjBids[coin][1] === Number(maxBids[0])))) {
            coinObjBids[coin][1] = Number(maxBids[0])

            let mess = `${new Date().toLocaleTimeString()} - ${coin} - ИЗМЕГИЛАСЬ ЦЕНА СПОТ мега Плотность! на LONG - цена ${maxBids[0]} - V ${divideNumber((Number(maxBids[1]) * priceCoinLive).toFixed())} БАКСОВ ${Number(maxBids[1])} Лотов - Процент до цены ${percent} \n`
            console.log(mess);
            fs.appendFileSync("symbolPamp.txt", mess)
            sendTelega(mess)
          }
        }

      }

      if(maxAsks[1] >= megaPlotnost) {
        let percent = (((Number(maxAsks[0]) - priceCoinLive) / priceCoinLive) * 100).toFixed(2)
        percent = percent < 0 ? (percent * (-1)) : percent

        if(!coinObjAsks[coin]) coinObjAsks[coin] = [0]
        if(coinObjAsks[coin][0] === 0) {
          let mess = `${new Date().toLocaleTimeString()} - ${coin} - СПОТ мега Плотность! на SHORT - цена ${maxAsks[0]} - V ${divideNumber((Number(maxAsks[1]) * priceCoinLive).toFixed())} БАКСОВ ${Number(maxAsks[1])} Лотов - Процент до цены ${percent} \n`
          console.log(mess);
          coinObjAsks[coin][0] = Number(maxAsks[1])
          coinObjAsks[coin][1] = Number(maxAsks[0])

          fs.appendFileSync("symbolPamp.txt", mess)
          sendTelega(mess)
          if(openScrinSpotFutures) opn('https://www.binance.com/ru/futures/' + coin)

        } else {
          //console.log(`${coin} - coinObjAsks[coin][1] - ${coinObjAsks[coin][1]} ; Number(maxAsks[0]) - ${Number(maxAsks[0])}`);
          if(!(/*(coinObjAsks[coin][0] === Number(maxAsks[1])) &&*/ (coinObjAsks[coin][1] === Number(maxAsks[0])))) {
            coinObjAsks[coin][1] = Number(maxAsks[0])

            let mess = `${new Date().toLocaleTimeString()} - ${coin} - ИЗМЕГИЛАСЬ ЦЕНА СПОТ мега Плотность! на SHORT - цена ${maxAsks[0]} - V ${divideNumber((Number(maxAsks[1]) * priceCoinLive).toFixed())} БАКСОВ ${Number(maxAsks[1])} Лотов - Процент до цены ${percent} \n`
            console.log(mess);
            fs.appendFileSync("symbolPamp.txt", mess)
            sendTelega(mess)
          }
        }

      }
      
    }, 100);

  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'ошибка getSpot');
  }
}



//////////////////////////////////////////////////////////


async function candlesOpenFutures(binance, opn, fs) {
  try {
    //console.log(new Date().getSeconds())
    if(counterWork < numberMaxWork) { // проверка на количество открытых сделок
      let candlesSymboldata = await binance.futuresPrices() 
 
      if(candlesSymboldata.code) {
        console.log(candlesSymboldata.code + ' - ' + candlesSymboldata.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - candlesOpenFutures')
      }
      
      for(let coin in candlesSymboldata) {
        if((candlesSymboldata[coin] < numberOneTrade) && coin.endsWith('USDT')) {
          futuresDepth(coin, binance, fs, opn, Number(candlesSymboldata[coin]))
          //i++
          await delay(40)
        }
      }
      //console.log(i);
    }
    //console.log(new Date().getSeconds())
  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'ошибка candlesOpenFutures');
  }

    //console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

    setTimeout(() => {
      candlesOpenFutures(binance, opn, fs)
    }, 31000)
}


async function futuresDepth(coin, binance, fs, opn, priceCoinLive) { // книга заявок
  try {
    let book = await binance.futuresDepth(coin, {limit: 100});
    if(book.code) {
      console.log(book.code + ' - ' + book.msg);
    }

    let maxBids = [0, 0]
    let maxAsks = [0, 0]
    let megaPlotnost = buyBuksFutures / priceCoinLive

    for(let i = 0; i < book['bids'].length; i++) {
      if((maxBids[1] < Number(book['bids'][i][1])) && ((((priceCoinLive - Number(book['bids'][i][0])) / Number(book['bids'][i][0])) * 100) < percentPriceFutures)) {
        maxBids[0] = Number(book['bids'][i][0])
        maxBids[1] = Number(book['bids'][i][1])
      }
    }

    for(let i = 0; i < book['asks'].length; i++) {
      if((maxAsks[1] < Number(book['asks'][i][1])) && ((((Number(book['asks'][i][0]) - priceCoinLive) / priceCoinLive) * 100) < percentPriceFutures)) {
        maxAsks[0] = Number(book['asks'][i][0])
        maxAsks[1] = Number(book['asks'][i][1])
      }
    }

    if(maxBids[1] >= megaPlotnost) {
      let percent = (((priceCoinLive - Number(maxBids[0])) / Number(maxBids[0])) * 100).toFixed(2)
      percent = percent < 0 ? (percent * (-1)) : percent

      if(!coinObjBidsFuters[coin]) coinObjBidsFuters[coin] = [0]
      if(coinObjBidsFuters[coin][0] === 0) {
        let mess = `${new Date().toLocaleTimeString()} - ${coin} - ФЬЮЧЕРСЫ мега Плотность! на LONG - цена ${maxBids[0]} - V ${divideNumber((Number(maxBids[1]) * priceCoinLive).toFixed())} БАКСОВ ${Number(maxBids[1])} Лотов - Процент до цены ${percent} \n`
        console.log(mess);
        coinObjBidsFuters[coin][0] = Number(maxBids[1])
        coinObjBidsFuters[coin][1] = Number(maxBids[0])

        fs.appendFileSync("symbolPamp.txt", mess)
        sendTelega(mess)
        if(openScrinSpotFutures) opn('https://www.binance.com/ru/futures/' + coin)

      } else {
        //console.log(`${coin} - coinObjBids[coin][1] - ${coinObjBids[coin][1]} ; Number(maxBids[0]) - ${Number(maxBids[0])}`);
        if(!(/*(coinObjBids[coin][0] === Number(maxBids[1])) &&*/ (coinObjBidsFuters[coin][1] === Number(maxBids[0])))) {
          coinObjBidsFuters[coin][1] = Number(maxBids[0])

          let mess = `${new Date().toLocaleTimeString()} - ${coin} - ИЗМЕГИЛАСЬ ЦЕНА ФЬЮЧЕРСЫ мега Плотность! на LONG - цена ${maxBids[0]} - V ${divideNumber((Number(maxBids[1]) * priceCoinLive).toFixed())} БАКСОВ ${Number(maxBids[1])} Лотов - Процент до цены ${percent} \n`
          console.log(mess);
          fs.appendFileSync("symbolPamp.txt", mess)
          sendTelega(mess)
        }
      }

    }

    if(maxAsks[1] >= megaPlotnost) {
      let percent = (((Number(maxAsks[0]) - priceCoinLive) / priceCoinLive) * 100).toFixed(2)
      percent = percent < 0 ? (percent * (-1)) : percent

      if(!coinObjAsksFuters[coin]) coinObjAsksFuters[coin] = [0]
      if(coinObjAsksFuters[coin][0] === 0) {
        let mess = `${new Date().toLocaleTimeString()} - ${coin} - ФЬЮЧЕРСЫ мега Плотность! на SHORT - цена ${maxAsks[0]} - V ${divideNumber((Number(maxAsks[1]) * priceCoinLive).toFixed())} БАКСОВ ${Number(maxAsks[1])} Лотов - Процент до цены ${percent} \n`
        console.log(mess);
        coinObjAsksFuters[coin][0] = Number(maxAsks[1])
        coinObjAsksFuters[coin][1] = Number(maxAsks[0])

        fs.appendFileSync("symbolPamp.txt", mess)
        sendTelega(mess)
        if(openScrinSpotFutures) opn('https://www.binance.com/ru/futures/' + coin)

      } else {
        //console.log(`${coin} - coinObjAsks[coin][1] - ${coinObjAsks[coin][1]} ; Number(maxAsks[0]) - ${Number(maxAsks[0])}`);
        if(!(/*(coinObjAsks[coin][0] === Number(maxAsks[1])) &&*/ (coinObjAsksFuters[coin][1] === Number(maxAsks[0])))) {
          coinObjAsksFuters[coin][1] = Number(maxAsks[0])

          let mess = `${new Date().toLocaleTimeString()} - ${coin} - ИЗМЕГИЛАСЬ ЦЕНА ФЬЮЧЕРСЫ мега Плотность! на SHORT - цена ${maxAsks[0]} - V ${divideNumber((Number(maxAsks[1]) * priceCoinLive).toFixed())} БАКСОВ ${Number(maxAsks[1])} Лотов - Процент до цены ${percent} \n`
          console.log(mess);
          fs.appendFileSync("symbolPamp.txt", mess)
          sendTelega(mess)
        }
      }

    }

  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'ошибка futuresDepth');
  }

}



//////////////////////////////////////////////////////////


async function openPampCandlesPercentTwo(binance, opn, fs) {
  try {
    if(counterWork < numberMaxWork) { // проверка на количество открытых сделок
      let candlesSymboldata = await binance.futuresPrices() 
      
      if(candlesSymboldata.code) {
        console.log(candlesSymboldata.code + ' - ' + candlesSymboldata.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - openPampCandlesPercentTwo')
      }
      
      for(let coin in candlesSymboldata) {
        if((candlesSymboldata[coin] < numberOneTrade) && coin.endsWith('USDT')) {
          getCandlesOpenScrin(coin, binance, fs, opn)
          //i++
          await delay(10)
        }
      }
      //console.log(i);
    }
      
  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'ошибка openPampCandlesPercentTwo');
  }

    //console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

    setTimeout(() => {
      openPampCandlesPercentTwo(binance, opn, fs)
    }, 3000)
}

async function getCandlesOpenScrin(coin, binance, fs, opn) { // получить свечи
  try{
    let data = await binance.futuresCandles(coin, '1m', {limit: 90}) 
    //console.log(data);
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    let openPrice = Number(data[data.length - 1][1])
    let closePrice = Number(data[data.length - 1][4])
    let oneHigh = Number(data[data.length - 1][2])
    
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

    let differenceRed = Number((((openPrice - closePrice) / closePrice) * 100).toFixed(2))

    if(differenceRed >= percentDamp) {
      if(!timeOpenSymbolDamp[coin]) timeOpenSymbolDamp[coin] = 99
      if(Number(new Date().getMinutes()) !== timeOpenSymbolDamp[coin]) {
        let messDamp = '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - ДАМП - ' + differenceRed + ' цена - ' + closePrice + '\n'
        console.log(messDamp);
        //fs.appendFileSync("symbolPamp.txt", messDamp)

        if(openScrinDamp) {
          opn('https://www.binance.com/ru/futures/' + coin)
        }

        timeOpenSymbolDamp[coin] = Number(new Date().getMinutes())
      }
    }
    
    let differenceGreen = Number((((oneHigh - openPrice) / openPrice) * 100).toFixed(2))
    
    if(differenceGreen >= percentPamp || (impulsPercent >= percentImpulsConst)) {
      if(!coinOpenPamp[coin]) coinOpenPamp[coin] = [0]
      if(!timeOpenSymbolPamp[coin]) timeOpenSymbolPamp[coin] = 99
      if(coinOpenPamp[coin][0] === 0) {
        if(counterWork < numberMaxWork) { // проверка на количество ф-й в работе
          if(Number(new Date().getMinutes()) !== timeOpenSymbolPamp[coin]) {
            coinOpenPamp[coin][0] = 1 // флаг того что памп пошел в работу
            if(openScrinPamp) {
              opn('https://www.binance.com/ru/futures/' + coin)
            }
            
            setTimeout(() => {
              coinOpenPamp[coin][0] = 0
            }, 300000)
            
            let mess = '\n' + new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп 1 свечи + ' + differenceGreen + 
            ' Прпоцент импульса ' + impulsPercent +  ' цена - ' + closePrice + ' - Время начала импульса ' + 
            new Date(timeOpenImpuls).toLocaleTimeString() + '\n'

            console.log(mess);

            fs.appendFileSync("symbolPamp.txt", mess)
            mess += '\n' + '<a href="www.binance.com/ru/futures/' + coin + '"' + '>Ссылка на инструмент ' + coin + '</a>'
            sendTelega2(mess)
            //coinOpenPamp[coin][0] = 0

            futuressHoulder(coin, houlderCandles, binance).then(data => {
              futuresMarginType(coin, binance).then(data => {
                
              })
            })     
          }
        } 
      }
    }
      
     

  } catch(e) {
    //console.log(e);
    //console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ошибка getCandlesOpenScrin');
  }
  
}

//////////////////////////////////////////////////////////

function sendTelega(msg) {
  msg = encodeURI(msg)

  http.post(`https://api.telegram.org/bot${idBot}/sendMessage?chat_id=${idChatPlot}&parse_mode=html&text=${msg}&disable_web_page_preview=True`, function (error, response, body) {  
      if(error) {
        console.log('error:', error); 
      }
      
      if(response.statusCode!==200){
        console.log(new Date().toLocaleTimeString() + ' - ' + 'Произошла ошибка при отправке сообщения в телеграм');
        console.log(response.statusCode);
      }
    });
}

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

/////////////////////////////////////////////

function divideNumber(str) {
  str = String(str)
  str = str.split('')
  if(str.length == 7) {
    for(let i = 0; i < str.length; i++) {
      if(i == 0) str[i] = str[i] + ' '
      else if(i == 3) str[i] = str[i] + ' '
    }
    str = str.join('')
    return str
  }

  else if(str.length == 8) {
    for(let i = 0; i < str.length; i++) {
      if(i == 1) str[i] = str[i] + ' '
      else if(i == 4) str[i] = str[i] + ' '
    }
    str = str.join('')
    return str
  }

  else if(str.length == 6) {
    for(let i = 0; i < str.length; i++) {
      if(i == 2) str[i] = str[i] + ' '
    }
    str = str.join('')
    return str
  }
}