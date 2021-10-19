const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')
const opn = require('opn')

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

async function buyCoin(coin, number, price) { // купить монетку лимит
  try {
    let data = await binance.futuresBuy(coin, Number(number), Number(price)) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    // let orderId = data['orderId']
    return Number(data['orderId'])
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'buyCoin');
  }
}

async function sellCoin(coin, number) { // продать монетку лимит
  try {
    let data = await binance.futuresSell(coin, Number(number)) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    // let orderId = data['orderId']
    return Number(data['price'])
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'sellCoin');
  }
}

async function futuressHoulder(coin, houlder) { // выставление плеча
  try {
    data = await binance.futuresLeverage(coin, houlder) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    return data['leverage']

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuressHoulder');
  }
}

async function futuresMarginType(coin) { // выставление маржы
  try {
    data = await binance.futuresMarginType(coin, 'ISOLATED') 

    if(data.code) {
      // console.log(data.code + ' - ' + data.msg);
    }

    return 1

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuressHoulder');
  }
}

async function statusOrder(coin, id) { // информация по ордеру
  try {
    let data = await binance.futuresOrderStatus(coin, {orderId: id}) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    let avgPrice = data['avgPrice']
    return Number(avgPrice)
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'statusOrder');
  }
}

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
    console.log(new Date().toLocaleTimeString() + ' - ' + 'buyMarketCoin');
  }
}

const profitCounter = {}
const currentProfitOne = {}
let counterPosition = 0

async function futuresPositionRisk() { // авто продажа
  try {
    let data = await binance.futuresPositionRisk() 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
      throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - futuresPositionRisk')
    }
  
    let markets = Object.keys( data );
    for ( let market of markets ) {
      let obj = data[market], size = Number( obj.positionAmt );
      if ( size != 0 ) {
        let entryPrice = Number(obj['entryPrice']) // цена входа в позицию
        let markPrice = Number(obj['markPrice']) // текущая цена маркировки
        let positionAmt = Number(obj['positionAmt']) // количество монет в позиции
        let symbol = obj['symbol']
        let pricePlus = entryPrice + (entryPrice * 0.004) // +% PNL
        let priceMinus = entryPrice - (entryPrice * 0.004) // -0.6% PNL с плечом х1 (0,05 USDT)
        positionAmt = positionAmt * (-1)

        // if(!profitCounter[symbol]) profitCounter[symbol] = 0

        // if(markPrice >= pricePlus) {
        //   if(profitCounter[symbol] === 0) {
        //     currentProfitOne[symbol] = markPrice
        //     profitCounter[symbol] = 1
        //   } else if (profitCounter[symbol] === 1) {
        //       profitCounter[symbol] = 0
        //       if(currentProfitOne[symbol] > markPrice) {
        //         sellMarketCoin(symbol, positionAmt).then(orderId => {
        //           statusOrder(symbol, orderId).then(avgPrice => {
        //             counterPosition++
        //             console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в плюс: ' + counterPosition)
        //           })
        //         })
        //       }
        //     }
        //   }

        if(markPrice >= pricePlus) {
          buyMarketCoin(symbol, positionAmt).then(orderId => {
            statusOrder(symbol, orderId).then(avgPrice => {
              counterPosition--
              console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в минус: ' + counterPosition)
            })
          })
        }
        
        if(markPrice <= priceMinus) {
          buyMarketCoin(symbol, positionAmt).then(orderId => {
            statusOrder(symbol, orderId).then(avgPrice => {
              counterPosition++
              console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в плюс: ' + counterPosition)
            })
          })
        }
      }
    }
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresPositionRisk');
  }

  setTimeout(() => {
    futuresPositionRisk()
  }, 1000)
}

const numberOfSigns = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) ); // находим количество цифр после запятой

//------------------------------------------------------------------------------------------

const percent = 0.5

let arrayPrice = {}
let counter = 0
let data
let timeout

async function futuresPrices() { 
  try {

    data = await binance.futuresPrices() 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
      throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту')
    }
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'traide');
    data = await binance.futuresPrices() 
  }

  if(counter === 0) {
    for(let key in data) {
      arrayPrice[key] = [Number(data[key])]
      
    }
    counter++
    timeout = 60000

  } else if(counter === 1) {
    for(let key in data) {
      arrayPrice[key][1] = Number(data[key])
      
    }
    counter = 0
    timeout = 2000

    for(let key in arrayPrice) {
      if((arrayPrice[key][0] - arrayPrice[key][1]) < 0) {
        let difference = arrayPrice[key][0] - arrayPrice[key][1]
        difference = difference * (-1)

        if(((difference / arrayPrice[key][1]) * 100) >= percent) {
          console.log(new Date().toLocaleTimeString() + ' - ' + key + ' Текущая цена: ' + arrayPrice[key][1] + ' - Памп - ' +  ((difference / arrayPrice[key][1]) * 100));
          
          balanceFiat('USDT').then(balance => {
            let priceNow = arrayPrice[key][1]
            if(balance > 0) {
              futuressHoulder(key, 1).then(data => {
                futuresMarginType(key).then(data => {
                  // opn('https://www.binance.com/ru/futures/' + key)
                  let numberCoinKey = ((balance / priceNow) / 2).toFixed(); // количество монеты в покупку
                  // let priceCoinKey = (priceNow + (priceNow * 0.002)).toFixed(numberOfSigns(priceNow)); // планируемая цена входа в позицию для лимитного ордера

                  sellMarketCoin(key, numberCoinKey).then(orderId => {
                    if(orderId) opn('https://www.binance.com/ru/futures/' + key)
                    // statusOrder(key, orderId).then(avgPrice => {
                    //   // console.log(new Date().toLocaleTimeString() + ' ' + key + ' Текущая цена: ' + priceNow + ' Цена в позиции: ' + avgPrice);
                    //    opn('https://www.binance.com/ru/futures/' + key)
                    // })
                  })
                })
              })
            }
          })
        }

      } //else if ((arrayPrice[key][0] - arrayPrice[key][1]) > 0) {
      //   let difference = arrayPrice[key][0] - arrayPrice[key][1]

      //   if(((difference / arrayPrice[key][1]) * 100) >= percent) {
      //     console.log(new Date().toLocaleTimeString() + ' - ' + key + ' - Дамп - ' +  ((difference / arrayPrice[key][1]) * 100));
          
      //     balanceFiat('USDT').then(balance => {
      //       let priceNow = arrayPrice[key][1]
      //       if(balance > 5) {
      //         futuressHoulder(key, 20).then(data => {
      //           futuresMarginType(key).then(data => {
      //             opn('https://www.binance.com/ru/futures/' + key)
      //             let numberCoinKey = ((balance / priceNow) / 2).toFixed(); // количество монеты в покупку
      //             let priceCoinKey = (priceNow - (priceNow * 0.001)).toFixed(numberOfSigns(priceNow)); // планируемая цена входа в позицию для лимитного ордера

      //             // buyMarketCoin(key, numberCoinKey).then(orderId => {
      //             //   opn('https://www.binance.com/ru/futures/' + key)
      //             //   // statusOrder(key, orderId).then(avgPrice => {
      //             //   //   // console.log(new Date().toLocaleTimeString() + ' ' + key + ' Текущая цена: ' + priceNow + ' Цена в позиции: ' + avgPrice);
      //             //   //   //  opn('https://www.binance.com/ru/futures/' + key)
      //             //   // })
      //             // })
      //           })
      //         })
      //       }
      //     })
      //   }
      // }
    }
    console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');
  }

  

  setTimeout(() => {
    futuresPrices()
  }, timeout)
}

futuresPrices()
futuresPositionRisk()





