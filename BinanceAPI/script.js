const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')

const ALICEUSDT = 'BTCUSDT'
const TIMEONEREQUEST = 3000
const MINBALANCE = 0
const STEPCHANGES = 50
const NUMBERBUYCOIN = 0.001 // колицество монет в позицию
const LESION = 30 // убыток закрытия
const PROFIT = 40 // прибыль закрытия

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

async function traide(coin) { // торговля
  try {
    let data = await binance.futuresPrices({symbol: coin}) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
      throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту')
    }

    coinPriceArray[counterPrice] = Number(data['price'])
    counterPrice++

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'traide');

    let data = await binance.futuresPrices({symbol: coin}) 
    coinPriceArray[counterPrice] = Number(data['price'])
    counterPrice++
  }

    if(position != 'none') {
      openPosition(ALICEUSDT).then(data => {
        entryPrice = data[0]
        unRealizedProfit = data[1]

        if(position === 'long') {
          if((entryPrice >= coinPriceArray[0]) && ((entryPrice - coinPriceArray[0]) >= LESION)) {

            sellMarketCoin(ALICEUSDT, NUMBERBUYCOIN).then(data => {
              orderId = data
              position = 'none'
              coinPriceArray = []
              counterPrice = 0
              counterMinus++
              counterUnRealizedProfit += Number(unRealizedProfit)
            statusOrder(ALICEUSDT, orderId).then(data => {
              avgPrice = data
              console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Long в минус; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ` Разница: -${entryPrice - avgPrice}` + ' Профит: ' + counterUnRealizedProfit + ' Счетчик отрицательных : ' + counterMinus);
              })
            })

          } else {

            if(profitCounter === 0) {
              currentProfitOne = coinPriceArray[0]
              profitCounter++
            } else if (profitCounter === 1) {
              profitCounter = 0

              // console.log(new Date().toLocaleTimeString() + ` - One ${currentProfitOne} Two ${currentProfitTwo}`)
              if((currentProfitOne > coinPriceArray[0]) && ((coinPriceArray[0] - entryPrice) >= PROFIT)) {

                sellMarketCoin(ALICEUSDT, NUMBERBUYCOIN).then(data => {
                  orderId = data
                  position = 'none'
                  coinPriceArray = []
                  counterPrice = 0
                  counterPlus++
                  counterUnRealizedProfit += Number(unRealizedProfit)
                statusOrder(ALICEUSDT, orderId).then(data => {
                  avgPrice = data
                  console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Long в плюс; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ` Разница: ${avgPrice - entryPrice}` + ' Профит: ' + counterUnRealizedProfit + ' Счетчик плюсовых : ' + counterPlus);
                  })
                })
              }
            }
          }

        } else {
          if((entryPrice <= coinPriceArray[0]) && ((coinPriceArray[0] - entryPrice) >= LESION)) {

            buyMarketCoin(ALICEUSDT, NUMBERBUYCOIN).then(data => {
              orderId = data
              position = 'none'
              coinPriceArray = []
              counterPrice = 0
              counterMinus++
              counterUnRealizedProfit += Number(unRealizedProfit)
            statusOrder(ALICEUSDT, orderId).then(data => {
              avgPrice = data
              console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Shorts в минус; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ` Разница: -${avgPrice - entryPrice}` + ' Профит: ' + counterUnRealizedProfit + ' Счетчик отрицательных : ' + counterMinus);
              })
            })

          } else {

            if(profitCounter === 0) {
              currentProfitOne = coinPriceArray[0]
              profitCounter++
            } else if (profitCounter === 1) {
              profitCounter = 0

            // console.log(new Date().toLocaleTimeString() + ` -  One ${currentProfitOne} Two ${currentProfitTwo}`)
              if((currentProfitOne < coinPriceArray[0]) && ((entryPrice - coinPriceArray[0]) >= PROFIT)) {

                buyMarketCoin(ALICEUSDT, NUMBERBUYCOIN).then(data => {
                  orderId = data
                  position = 'none'
                  coinPriceArray = []
                  counterPrice = 0
                  counterPlus++
                  counterUnRealizedProfit += Number(unRealizedProfit)
                statusOrder(ALICEUSDT, orderId).then(data => {
                  avgPrice = data
                  console.log(new Date().toLocaleTimeString() + ' - ' + 'Закрыть Shorts в плюс; Цена входа: ' + entryPrice + ' Цена выхода: ' + avgPrice + ` Разница: ${entryPrice - avgPrice}` +  ' Профит: ' + counterUnRealizedProfit + ' Счетчик плюсовых : ' + counterPlus);
                  })
                })
              }
            }
          }
        }
      })
    }

    if(counterPrice >= 3) {
      counterPrice = 0
      lastPrice = coinPriceArray[1]

      if(position === 'none') {
        // console.log(new Date().toLocaleTimeString() + ` - [${coinPriceArray}] - ${position} - ${balance}`)
        if(((coinPriceArray[0] <= coinPriceArray[1]) && (coinPriceArray[1] <= coinPriceArray[2])) && ((coinPriceArray[2] - coinPriceArray[0]) > STEPCHANGES)) {
          getCandles(ALICEUSDT).then(volume => {
            if(volume) {
              balanceFiat('USDT').then(balance => {
                if(balance > MINBALANCE) {
                  buyMarketCoin(ALICEUSDT, NUMBERBUYCOIN).then(data => {
                    orderId = data
                    position = 'long'
                    console.log(new Date().toLocaleTimeString() + ' - ' + 'Открыть long' + ' - ' + coinPriceArray);
                  })
                }
              })
            }
          })
        }

        if(((coinPriceArray[0] >= coinPriceArray[1]) && (coinPriceArray[1] >= coinPriceArray[2])) && ((coinPriceArray[0] - coinPriceArray[2]) > STEPCHANGES)) {
          getCandles(ALICEUSDT).then(volume => {
            if(volume) {
              balanceFiat('USDT').then(balance => {
                if(balance > MINBALANCE) {
                  sellMarketCoin(ALICEUSDT, NUMBERBUYCOIN).then(data => {
                    orderId = data
                    position = 'shorts'
                    console.log(new Date().toLocaleTimeString() + ' - ' + 'Открыть shorts' + ' - ' + coinPriceArray);
                  })
                }
              })
            }
          })
        }
      }
      // console.log(coinPriceArray[0], coinPriceArray[1], coinPriceArray[2])
    }

    setTimeout(() => {
      traide(ALICEUSDT)
    }, TIMEONEREQUEST);
}

  traide(ALICEUSDT)



//----------------------------------------------------

async function buyMarketCoin(coin, number) { // купить монетку по рынку
  try {
    let data = await binance.futuresMarketBuy(coin, Number(number)) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    let orderId = data['orderId']
    return orderId
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'buyCoin');
  }
}

//----------------------------------------------------

async function sellMarketCoin(coin, number) { // продать монетку по рынку
  try {
    let data = await binance.futuresMarketSell(coin, Number(number)) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    let orderId = data['orderId']
    return orderId
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

    let entryPrice = Number(data[0]['entryPrice'])
    let unRealizedProfit = data[0]['unRealizedProfit']
    return [entryPrice, unRealizedProfit]
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
      let balance = Number(data[0]['crossWalletBalance'])
      return balance

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
    let avgPrice = data['avgPrice']
    return avgPrice
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'statusOrder');
  }
}

//----------------------------------------------------

async function getCandles(coin) { // получить свечи
  try{
    let data = await binance.futuresCandles(coin, '1m', {limit: 2}) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
    let date = new Date(data[0][0]) // время свечи 1
    let date2 = new Date(data[1][0]) // время свечи 2
    let volume = Number(data[0][5]) // объём 1
    let volume2 = Number(data[1][5]) // объём 2
    let candles = `Время 1 - ${getDate(date)}; Объём 1 - ${volume} ; Время 2 - ${getDate(date2)}; Объём 2 - ${volume2}`
    console.log(candles);
    return (volume2 > volume)
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'getCandles');
  }
  
}

function getDate(date) { // время свечи
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${new Date().getSeconds()}`
}

//----------------------------------------------------