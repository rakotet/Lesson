const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')

const ALICEUSDT = 'ALICEUSDT'
const TIMEONEREQUEST = 3000
const MINBALANCE = 130
const STEPCHANGES = 0.01
const NUMBERBUYCOIN = 0.01 // колицество монет в позицию
const LESION = 0.02 // убыток закрытия
const PROFIT = 0.04 // прибыль закрытия

let coinPriceArray = [] // 
let counterPrice = 0 // счетчик цены в массиве
let lastPrice // средняя цена прошлой итерации результурующего массива
let position = 'none'
let balance // текущий баланс кошелька
let entryPrice // цена входа в позицию
let unRealizedProfit // профит позиции 

async function traide(coin) { // получение цены конкретной монеты
    let data = await binance.futuresPrices({symbol: coin}) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    coinPriceArray[counterPrice] = Number(data['price'])
    counterPrice++

    if(position != 'none') {
console.log('Попали в зону закрытия' + ' - ' + new Date().toLocaleTimeString());//---------
      openPosition(ALICEUSDT)

      if(position === 'long') {
        if((entryPrice >= coinPriceArray[0]) && ((entryPrice - coinPriceArray[0]) >= LESION)) {
          console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Long в минус');
          sellCoin(ALICEUSDT, NUMBERBUYCOIN)
          position = 'none'
          coinPriceArray = []
          balanceFiat('USDT')
        } else {
          if((coinPriceArray[0] - entryPrice) >= PROFIT) {
            console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Long в плюс');
            sellCoin(ALICEUSDT, NUMBERBUYCOIN)
            position = 'none'
            coinPriceArray = []
            balanceFiat('USDT')
          }
        }

      } else {
        if((entryPrice <= coinPriceArray[0]) && ((coinPriceArray[0] - entryPrice) >= LESION)) {
          console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Shorts в минус');
          buyCoin(ALICEUSDT, NUMBERBUYCOIN)
          position = 'none'
          coinPriceArray = []
          balanceFiat('USDT')
        } else {
          if((entryPrice - coinPriceArray[0]) >= PROFIT) {
            console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Shorts в плюс');
            buyCoin(ALICEUSDT, NUMBERBUYCOIN)
            position = 'none'
            coinPriceArray = []
            balanceFiat('USDT')
          }
        }
      }
    }

    if(counterPrice >= 3) {
      counterPrice = 0
      lastPrice = coinPriceArray[1]
  
      if(((coinPriceArray[0] <= coinPriceArray[1]) && (coinPriceArray[1] <= coinPriceArray[2])) && (coinPriceArray[2] - coinPriceArray[0]) > STEPCHANGES) {
        // console.log(balance, position);
        if((position === 'none') && (balance > MINBALANCE) && (coinPriceArray.length >= 3)) {
          console.log(new Date().toLocaleTimeString() + ' - ' + 'Открыть Long');
          buyCoin(ALICEUSDT, NUMBERBUYCOIN)
          position = 'long'
        }
      }

      if(((coinPriceArray[0] >= coinPriceArray[1]) && (coinPriceArray[1] >= coinPriceArray[2])) && (coinPriceArray[0] - coinPriceArray[2]) > STEPCHANGES) {
        // console.log(balance, position);
        if((position === 'none') && (balance > MINBALANCE) && (coinPriceArray.length >= 3)) {
          console.log(new Date().toLocaleTimeString() + ' - ' + 'Открыть Shorts');
          sellCoin(ALICEUSDT, NUMBERBUYCOIN)
          position = 'shorts'
        }
      }

      // console.log(coinPriceArray[0], coinPriceArray[1], coinPriceArray[2])
    }

    setTimeout(() => {
      traide(ALICEUSDT)
    }, TIMEONEREQUEST);
}

balanceFiat('USDT')
traide(ALICEUSDT)

//----------------------------------------------------

async function buyCoin(coin, number) { // купить монетку по рынку
  let data = await binance.futuresMarketBuy(coin, Number(number)) 
  if(data.code) {
    console.log(data.code + ' - ' + data.msg);
  }
}

//----------------------------------------------------

async function sellCoin(coin, number) { // продать монетку по рынку
  let data = await binance.futuresMarketSell(coin, Number(number)) 
  if(data.code) {
    console.log(data.code + ' - ' + data.msg);
  }
}

//----------------------------------------------------

async function openPosition(coin) { // Получение открытой позиции по конкретной монете
  let data = await binance.futuresPositionRisk({symbol: coin}) 

  if(data.code) {
    console.log(data.code + ' - ' + data.msg);
  }

  entryPrice = data[0]['entryPrice']
  unRealizedProfit = data[0]['unRealizedProfit']
}

//----------------------------------------------------

async function balanceFiat(currency) { // Баланс деняк
  let data = await binance.futuresBalance() 

  if(data.code) {
    console.log(data.code + ' - ' + data.msg);
  } 

  setTimeout(()=>{
    let data2 = data.filter(obj => obj.asset === currency)
    balance = data2[0]['crossWalletBalance']
  }, 2000)
}

//----------------------------------------------------

