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
let i = 0

let coinObjBids = {}
let coinObjAsks = {}

/////////////////////// Управление ботом
const numberMaxWork = 2 // количество одновременных сделок (1 - 5)
const numberOneTrade = 150 // сумма одной сделки (10 - 1000)
const buyBuksSpot = 500000
const buyBuksFutures = 1000000
const percentPriceCoin = 1
///////////////////////

candlesOpenPamp(binance, opn, fs)

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
          await delay(10)
        }
      }
      //console.log(i);
    }
    //console.log(new Date().getSeconds())
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'candlesOpenPamp');
  }

    //console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

    setTimeout(() => {
      candlesOpenPamp(binance, opn, fs)
    }, 6000)
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
        if((maxBids[1] < depth['bids'][price]) && ((((priceCoinLive - Number(price)) / Number(price)) * 100) < percentPriceCoin)) {
          maxBids[0] = price
          maxBids[1] = depth['bids'][price]
        }
  
        //volumeBids += depth['bids'][price]
      }
    
      for(let price in depth['asks']) {
        if((maxAsks[1] < depth['asks'][price]) && ((((Number(price) - priceCoinLive) / priceCoinLive) * 100) < percentPriceCoin)) {
          maxAsks[0] = price
          maxAsks[1] = depth['asks'][price]
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
          console.log(`${new Date().toLocaleTimeString()} - ${coin} - СПОТ мега Плотность! на LONG - цена ${maxBids[0]} - V ${(Number(maxBids[1]) * priceCoinLive).toFixed()} БАКСОВ - Процент до цены ${percent} \n`);
          coinObjBids[coin][0] = Number(maxBids[1])
          coinObjBids[coin][1] = Number(maxBids[0])
        } else {
          //console.log(`${coin} - coinObjBids[coin][1] - ${coinObjBids[coin][1]} ; Number(maxBids[0]) - ${Number(maxBids[0])}`);
          if(!(/*(coinObjBids[coin][0] === Number(maxBids[1])) &&*/ (coinObjBids[coin][1] === Number(maxBids[0])))) {
            coinObjBids[coin][1] = Number(maxBids[0])
            console.log(`${new Date().toLocaleTimeString()} - ${coin} - СПОТ мега Плотность! на LONG - цена ${maxBids[0]} - V ${(Number(maxBids[1]) * priceCoinLive).toFixed()} БАКСОВ - Процент до цены ${percent} \n`);
          }
        }

      }

      if(maxAsks[1] >= megaPlotnost) {
        let percent = (((Number(maxAsks[0]) - priceCoinLive) / priceCoinLive) * 100).toFixed(2)
        percent = percent < 0 ? (percent * (-1)) : percent

        if(!coinObjAsks[coin]) coinObjAsks[coin] = [0]
        if(coinObjAsks[coin][0] === 0) {
          console.log(`${new Date().toLocaleTimeString()} - ${coin} - СПОТ мега Плотность! на SHORT - цена ${maxAsks[0]} - V ${(Number(maxAsks[1]) * priceCoinLive).toFixed()} БАКСОВ - Процент до цены ${percent} \n`);
          coinObjAsks[coin][0] = Number(maxAsks[1])
          coinObjAsks[coin][1] = Number(maxAsks[0])
        } else {
          //console.log(`${coin} - coinObjAsks[coin][1] - ${coinObjAsks[coin][1]} ; Number(maxAsks[0]) - ${Number(maxAsks[0])}`);
          if(!(/*(coinObjAsks[coin][0] === Number(maxAsks[1])) &&*/ (coinObjAsks[coin][1] === Number(maxAsks[0])))) {
            coinObjAsks[coin][1] = Number(maxAsks[0])
            console.log(`${new Date().toLocaleTimeString()} - ${coin} - СПОТ мега Плотность! на SHORT - цена ${maxAsks[0]} - V ${(Number(maxAsks[1]) * priceCoinLive).toFixed()} БАКСОВ - Процент до цены ${percent} \n`);
          }
        }

      }
      
    }, 100);

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'getSpot');
  }
}

//////////////////////////////////////////////////////////


