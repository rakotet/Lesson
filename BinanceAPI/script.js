const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')

const ALICEUSDT = 'BTCUSDT'
const TIMEONEREQUEST = 1000
const MINBALANCE = 45
const STEPCHANGES = 5
const NUMBERBUYCOIN = 0.001 // колицество монет в позицию
const LESION = 30 // убыток закрытия
const PROFIT = 30 // прибыль закрытия

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
let fall = 0 // счетчик попыток продать в плюс при падении цены
let counterUnRealizedProfit = 0 // профит всех сделок

async function traide(coin) { // получение цены конкретной монеты
  try {
    let data = await binance.futuresPrices({symbol: coin}) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    coinPriceArray[counterPrice] = Number(await data['price'])
    counterPrice++

    if(position != 'none') {
      openPosition(ALICEUSDT)

      setTimeout(() => {
        
        if(position === 'long') {
          if((entryPrice >= coinPriceArray[0]) && ((entryPrice - coinPriceArray[0]) >= LESION)) {
            sellCoin(ALICEUSDT, NUMBERBUYCOIN)
            setTimeout(()=>{statusOrder(ALICEUSDT, orderId)}, 500)
            position = 'none'
            coinPriceArray = []
            counterPrice = 0
            setTimeout(()=>{balanceFiat('USDT')}, 500)
            setTimeout(() => {
              counterMinus++
              counterUnRealizedProfit += Number(unRealizedProfit)
              console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Long в минус; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ' Профит: ' + counterUnRealizedProfit + ' Счетчик отрицательных : ' + counterMinus);
            }, 1500)
          } else {

            if(profitCounter === 0) {
              currentProfitOne = coinPriceArray[0]
              profitCounter++
            } else if (profitCounter === 1) {
              currentProfitTwo = coinPriceArray[0]
              profitCounter = 0

              // console.log(new Date().toLocaleTimeString() + ` - One ${currentProfitOne} Two ${currentProfitTwo}`)
              if((currentProfitOne > currentProfitTwo) && ((coinPriceArray[0] - entryPrice) >= PROFIT)) {
                sellCoin(ALICEUSDT, NUMBERBUYCOIN)
                setTimeout(()=>{statusOrder(ALICEUSDT, orderId)}, 500)
                position = 'none'
                coinPriceArray = []
                counterPrice = 0
                setTimeout(()=>{balanceFiat('USDT')}, 500)
                setTimeout(() => {
                  counterPlus++ 
                  counterUnRealizedProfit += Number(unRealizedProfit)
                  console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Long в плюс; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ' Профит: ' + counterUnRealizedProfit + ' Счетчик положительных : ' + counterPlus);
                }, 1500)
              }
            }
          }

        } else {
          if((entryPrice <= coinPriceArray[0]) && ((coinPriceArray[0] - entryPrice) >= LESION)) {
            buyCoin(ALICEUSDT, NUMBERBUYCOIN)
            setTimeout(()=>{statusOrder(ALICEUSDT, orderId)}, 500)
            position = 'none'
            coinPriceArray = []
            counterPrice = 0
            setTimeout(()=>{balanceFiat('USDT')}, 500)
            setTimeout(() => {
              counterMinus++
              counterUnRealizedProfit += Number(unRealizedProfit)
              console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Shorts в минус; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ' Профит: ' + counterUnRealizedProfit + ' Счетчик отрицательных : ' + counterMinus);
            }, 1500)
          } else {

            if(profitCounter === 0) {
              currentProfitOne = coinPriceArray[0]
              profitCounter++
            } else if (profitCounter === 1) {
              currentProfitTwo = coinPriceArray[0]
              profitCounter = 0

            // console.log(new Date().toLocaleTimeString() + ` -  One ${currentProfitOne} Two ${currentProfitTwo}`)
              if((currentProfitOne < currentProfitTwo) && ((entryPrice - coinPriceArray[0]) >= PROFIT)) {
                buyCoin(ALICEUSDT, NUMBERBUYCOIN)
                setTimeout(()=>{statusOrder(ALICEUSDT, orderId)}, 500)
                position = 'none'
                coinPriceArray = []
                counterPrice = 0
                setTimeout(()=>{balanceFiat('USDT')}, 500)
                setTimeout(() => {
                  counterPlus++
                  counterUnRealizedProfit += Number(unRealizedProfit)
                  console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Shorts в плюс; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ' Профит: ' + counterUnRealizedProfit + ' Счетчик положительных : ' + counterPlus);
                }, 1500)
              }
            }
          }
        }
      }, 1000)
    }

    if(counterPrice >= 3) {
      counterPrice = 0
      lastPrice = coinPriceArray[1]
      // console.log(new Date().toLocaleTimeString() + ` - [${coinPriceArray}] - ${position} - ${balance}`)
      if(((coinPriceArray[0] <= coinPriceArray[1]) && (coinPriceArray[1] <= coinPriceArray[2])) && ((coinPriceArray[2] - coinPriceArray[0]) > STEPCHANGES)) {
        if((position === 'none') && (balance > MINBALANCE)) {
          console.log(new Date().toLocaleTimeString() + ' - ' + 'Открыть long');
          buyCoin(ALICEUSDT, NUMBERBUYCOIN)
          position = 'long'
        }
      }

      if(((coinPriceArray[0] >= coinPriceArray[1]) && (coinPriceArray[1] >= coinPriceArray[2])) && ((coinPriceArray[0] - coinPriceArray[2]) > STEPCHANGES)) {
        if((position === 'none') && (balance > MINBALANCE)) {
          console.log(new Date().toLocaleTimeString() + ' - ' + 'Открыть shorts');
          sellCoin(ALICEUSDT, NUMBERBUYCOIN)
          position = 'shorts'
        }
      }

      // console.log(coinPriceArray[0], coinPriceArray[1], coinPriceArray[2])
    }

    setTimeout(() => {
      traide(ALICEUSDT)
    }, TIMEONEREQUEST);

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'traide');
  }
}

balanceFiat('USDT')
traide(ALICEUSDT)

//----------------------------------------------------

async function buyCoin(coin, number) { // купить монетку по рынку
  try {
    let data = await binance.futuresMarketBuy(coin, Number(number)) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    orderId = data['orderId']
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'buyCoin');
  }
}

//----------------------------------------------------

async function sellCoin(coin, number) { // продать монетку по рынку
  try {
    let data = await binance.futuresMarketSell(coin, Number(number)) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    orderId = data['orderId']
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'sellCoin');
  }
}

//----------------------------------------------------

async function openPosition(coin) { // Получение открытой позиции по конкретной монете
  try {
    let data = await binance.futuresPositionRisk({symbol: coin}) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    entryPrice = Number(data[0]['entryPrice'])
    unRealizedProfit = data[0]['unRealizedProfit']
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'openPosition');
  }
}

//----------------------------------------------------

async function balanceFiat(currency) { // Баланс деняк
  try {
    let data = await binance.futuresBalance() 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    } 
      data = data.filter(obj => obj.asset === currency)
      balance = Number(data[0]['crossWalletBalance'])
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'balanceFiat');
  }
}

//----------------------------------------------------

async function statusOrder(coin, id) { // информация по ордеру
  try {
    let data = await binance.futuresOrderStatus(coin, {orderId: id}) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
    avgPrice = data['avgPrice']
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'statusOrder');
  }
}

//----------------------------------------------------