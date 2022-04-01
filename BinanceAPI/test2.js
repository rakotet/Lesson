


const balanceFiat = require('./function/balanceFiat')
const numberOfSigns = require('./function/numberOfSigns')
//const plate = require('./function/plate')
//let fapi = 'https://www.binance.com/futures/';
let fapi = 'https://www.binance.com/bapi/nft/v1/friendly/nft/mystery-box/';
let fapi2 = 'https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase';
const delay = ms => new Promise(res => setTimeout(res, ms));
const opn = require('opn')
const fs = require('fs')

let counterWork = 0
let i = 0

let coinObjBids = {}
let coinObjAsks = {}
let coinObjBidsFuters = {}
let coinObjAsksFuters = {}

/////////////////////// Управление ботом
const numberMaxWork = 2 // количество одновременных сделок (1 - 5)
const numberOneTrade = 150 // сумма одной сделки (10 - 1000)
const buyBuksSpot = 500000
const buyBuksFutures = 500000
const percentPriceCoin = 1
const percentPriceFutures = 1
///////////////////////

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});



candlesOpenFutures(binance, opn, fs)

async function candlesOpenFutures(binance, opn, fs) {
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
          futuresDepth(coin, binance, fs, opn, Number(candlesSymboldata[coin]))
          //i++
          await delay(100)
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
    }, 10000)
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
      if((maxAsks[1] < Number(book['asks'][i][1])) && ((((priceCoinLive - Number(book['asks'][i][0])) / Number(book['asks'][i][0])) * 100) < percentPriceFutures)) {
        maxAsks[0] = Number(book['asks'][i][0])
        maxAsks[1] = Number(book['asks'][i][1])
      }
    }

    if(maxBids[1] >= megaPlotnost) {
      let percent = (((priceCoinLive - Number(maxBids[0])) / Number(maxBids[0])) * 100).toFixed(2)
      percent = percent < 0 ? (percent * (-1)) : percent

      if(!coinObjBidsFuters[coin]) coinObjBidsFuters[coin] = [0]
      if(coinObjBidsFuters[coin][0] === 0) {
        console.log(`${new Date().toLocaleTimeString()} - ${coin} - ФЬЮЧЕРСЫ мега Плотность! на LONG - цена ${maxBids[0]} - V ${(Number(maxBids[1]) * priceCoinLive).toFixed()} БАКСОВ - Процент до цены ${percent} \n`);
        coinObjBidsFuters[coin][0] = Number(maxBids[1])
        coinObjBidsFuters[coin][1] = Number(maxBids[0])
      } else {
        //console.log(`${coin} - coinObjBids[coin][1] - ${coinObjBids[coin][1]} ; Number(maxBids[0]) - ${Number(maxBids[0])}`);
        if(!(/*(coinObjBids[coin][0] === Number(maxBids[1])) &&*/ (coinObjBidsFuters[coin][1] === Number(maxBids[0])))) {
          coinObjBidsFuters[coin][1] = Number(maxBids[0])
          console.log(`${new Date().toLocaleTimeString()} - ${coin} - ФЬЮЧЕРСЫ мега Плотность! на LONG - цена ${maxBids[0]} - V ${(Number(maxBids[1]) * priceCoinLive).toFixed()} БАКСОВ - Процент до цены ${percent} \n`);
        }
      }

    }

    if(maxAsks[1] >= megaPlotnost) {
      let percent = (((Number(maxAsks[0]) - priceCoinLive) / priceCoinLive) * 100).toFixed(2)
      percent = percent < 0 ? (percent * (-1)) : percent

      if(!coinObjAsksFuters[coin]) coinObjAsksFuters[coin] = [0]
      if(coinObjAsksFuters[coin][0] === 0) {
        console.log(`${new Date().toLocaleTimeString()} - ${coin} - ФЬЮЧЕРСЫ мега Плотность! на SHORT - цена ${maxAsks[0]} - V ${(Number(maxAsks[1]) * priceCoinLive).toFixed()} БАКСОВ - Процент до цены ${percent} \n`);
        coinObjAsksFuters[coin][0] = Number(maxAsks[1])
        coinObjAsksFuters[coin][1] = Number(maxAsks[0])
      } else {
        //console.log(`${coin} - coinObjAsks[coin][1] - ${coinObjAsks[coin][1]} ; Number(maxAsks[0]) - ${Number(maxAsks[0])}`);
        if(!(/*(coinObjAsks[coin][0] === Number(maxAsks[1])) &&*/ (coinObjAsksFuters[coin][1] === Number(maxAsks[0])))) {
          coinObjAsksFuters[coin][1] = Number(maxAsks[0])
          console.log(`${new Date().toLocaleTimeString()} - ${coin} - ФЬЮЧЕРСЫ мега Плотность! на SHORT - цена ${maxAsks[0]} - V ${(Number(maxAsks[1]) * priceCoinLive).toFixed()} БАКСОВ - Процент до цены ${percent} \n`);
        }
      }

    }

  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'ошибка futuresDepth');
  }

}

