const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')

const ALICEUSDT = 'ALICEUSDT'
const TIMEONEREQUEST = 2000
const MINBALANCE = 110
const STEPCHANGES = 0.01
const NUMBERBUYCOIN = 10 // колицество монет в позицию
const LESION = 0.02 // убыток закрытия
const PROFIT = 0.03 // прибыль закрытия

let coinPriceArray = [] // массив цен
let counterPrice = 0 // счетчик цены в массиве
let lastPrice // средняя цена прошлой итерации результурующего массива
let position = 'none' // в какую сторону открыта позиция
let balance // текущий баланс кошелька
let entryPrice // цена входа в позицию
let unRealizedProfit // профит позиции 
let orderId // id позиции
let avgPrice // цена закрытия позиции
let currentProfitOne // текущий профит позиции
let currentProfitTwo // текущий профит позиции
let profitCounter = 0 // счетчик разницы позицый
let counterPlus = 0 // счетчик положительных сделок
let counterMinus = 0 // счетчик отрицательных сделок

async function traide(coin) { // получение цены конкретной монеты
    let data = await binance.futuresPrices({symbol: coin}) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    coinPriceArray[counterPrice] = Number(await data['price'])

    if(position != 'none') {
      openPosition(ALICEUSDT)

      setTimeout(() => {
        
        if(position === 'long') {
          if((entryPrice >= coinPriceArray[counterPrice]) && ((entryPrice - coinPriceArray[counterPrice]) >= LESION)) {
            sellCoin(ALICEUSDT, NUMBERBUYCOIN)
            setTimeout(()=>{statusOrder(ALICEUSDT, orderId)}, 500)
            position = 'none'
            coinPriceArray = []
            counterPrice = 0
            balanceFiat('USDT')
            setTimeout(() => {
              counterMinus++
              console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Long в минус; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ' Счетчик отрицательных : ' + counterMinus);
            }, 1500)
          } else {

            // if(profitCounter === 0) {
            //   currentProfitOne = coinPriceArray[counterPrice] - entryPrice
            //   profitCounter++
            // } else if (profitCounter === 1) {
            //   currentProfitTwo = coinPriceArray[counterPrice] - entryPrice
            //   profitCounter = 0
            // }

            if(/*(currentProfitOne > currentProfitTwo) && */(/*currentProfitTwo*/ (coinPriceArray[counterPrice] - entryPrice) >= PROFIT)) {
              sellCoin(ALICEUSDT, NUMBERBUYCOIN)
              setTimeout(()=>{statusOrder(ALICEUSDT, orderId)}, 500)
              position = 'none'
              coinPriceArray = []
              counterPrice = 0
              balanceFiat('USDT')
              setTimeout(() => {
                counterPlus++ 
                console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Long в плюс; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ' Счетчик положительных : ' + counterPlus);
              }, 1500)
            }
          }

        } else {
          if((entryPrice <= coinPriceArray[counterPrice]) && ((coinPriceArray[counterPrice] - entryPrice) >= LESION)) {
            buyCoin(ALICEUSDT, NUMBERBUYCOIN)
            setTimeout(()=>{statusOrder(ALICEUSDT, orderId)}, 500)
            position = 'none'
            coinPriceArray = []
            counterPrice = 0
            balanceFiat('USDT')
            setTimeout(() => {
              counterMinus++
              console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Shorts в минус; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ' Счетчик отрицательных : ' + counterMinus);
            }, 1500)
          } else {

            // if(profitCounter === 0) {
            //   currentProfitOne = entryPrice - coinPriceArray[counterPrice]
            //   profitCounter++
            // } else if (profitCounter === 1) {
            //   currentProfitTwo = entryPrice - coinPriceArray[counterPrice]
            //   profitCounter = 0
            // }

            if(/*(currentProfitOne > currentProfitTwo) && */(/*currentProfitTwo*/ (entryPrice - coinPriceArray[counterPrice]) >= PROFIT)) {
              buyCoin(ALICEUSDT, NUMBERBUYCOIN)
              setTimeout(()=>{statusOrder(ALICEUSDT, orderId)}, 500)
              position = 'none'
              coinPriceArray = []
              counterPrice = 0
              balanceFiat('USDT')
              setTimeout(() => {
                counterPlus++
                console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Shorts в плюс; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ' Счетчик положительных : ' + counterPlus);
              }, 1500)
            }
          }
        }
      }, 1000)
    }

    counterPrice++

    if(counterPrice >= 3) {

      counterPrice = 0
      lastPrice = coinPriceArray[1]
  
      if(((coinPriceArray[0] <= coinPriceArray[1]) && (coinPriceArray[1] <= coinPriceArray[2])) && ((coinPriceArray[2] - coinPriceArray[0]) > STEPCHANGES)) {
        // console.log(balance, position);
        if((position === 'none') && (balance > MINBALANCE) && (coinPriceArray.length >= 3)) {
          console.log(new Date().toLocaleTimeString() + ' - ' + 'Открыть Long');
          buyCoin(ALICEUSDT, NUMBERBUYCOIN)
          position = 'long'
        }
      }

      if(((coinPriceArray[0] >= coinPriceArray[1]) && (coinPriceArray[1] >= coinPriceArray[2])) && ((coinPriceArray[0] - coinPriceArray[2]) > STEPCHANGES)) {
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

  orderId = await data['orderId']
}

//----------------------------------------------------

async function sellCoin(coin, number) { // продать монетку по рынку
  let data = await binance.futuresMarketSell(coin, Number(number)) 
  if(data.code) {
    console.log(data.code + ' - ' + data.msg);
  }

  orderId = await data['orderId']
}

//----------------------------------------------------

async function openPosition(coin) { // Получение открытой позиции по конкретной монете
  let data = await binance.futuresPositionRisk({symbol: coin}) 

  if(data.code) {
    console.log(data.code + ' - ' + data.msg);
  }

  entryPrice = await data[0]['entryPrice']
  unRealizedProfit = await data[0]['unRealizedProfit']
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
  }, 1000)
}

//----------------------------------------------------

async function statusOrder(coin, id) { // информация по ордеру
  let data = await binance.futuresOrderStatus(coin, {orderId: id}) 
  if(data.code) {
    console.log(data.code + ' - ' + data.msg);
  }
  avgPrice = await data['avgPrice']
}

//----------------------------------------------------