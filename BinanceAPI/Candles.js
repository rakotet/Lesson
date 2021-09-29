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

async function buyCoin(coin, number, price, obj) { // купить монетку лимит
  try {
    let data = await binance.futuresBuy(coin, Number(number), Number(price), obj) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    // let orderId = data['orderId']
    return Number(data['price'])
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

async function sellMarketCoin(coin, number) { // продать монетку по рынку
  try {
    let data = await binance.futuresMarketSell(coin, Number(number)) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    let price = data['price']
    return Number(price)
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'sellCoin');
  }
}

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
        let entryPrice = Number(obj['entryPrice'])
        let markPrice = Number(obj['markPrice'])
        let positionAmt = Number(obj['positionAmt'])
        let pricePlus = entryPrice + (entryPrice * 0.004) // +4% PNL
        let priceMinus = entryPrice - (entryPrice * 0.002) // -4% PNL
      
        // console.log('markPrice >= pricePlus: ' + markPrice + ' | ' + pricePlus);

        if((markPrice >= pricePlus) || (markPrice <= priceMinus)) {
          positionAmt < 0 ? (positionAmt * (-1)) : positionAmt
          sellMarketCoin(obj['symbol'], positionAmt).then(price => {
            console.log(new Date().toLocaleTimeString() + ' Продали: ' + obj['symbol'] + ' По цене: ' + price)
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
  }, 2000)
}

const numberOfSigns = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) ); // находим количество цифр после запятой

//------------------------------------------------------------------------------------------

const percent = 0.7

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
    timeout = 90000

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
          console.log(new Date().toLocaleTimeString() + ' - ' + key + ' - Памп - ' +  ((difference / arrayPrice[key][1]) * 100));
          // futuressHoulder(key, 10).then(data => {
          //   futuresMarginType(key).then(data => {
          //     opn('https://www.binance.com/ru/futures/' + key)
          //   })
          // })
          balanceFiat('USDT').then(balance => {
            if(balance > 30) {
              futuressHoulder(key, 10).then(data => {
                futuresMarginType(key).then(data => {
                  let numberCoinKey = ((balance / arrayPrice[key][1]) / 2).toFixed(); // количество монеты в покупку
                  let priceCoinKey = (arrayPrice[key][1] - (arrayPrice[key][1] * 0.001)).toFixed(numberOfSigns(arrayPrice[key][1])); // планируемая цена входа в позицию
      
                  buyCoin(key, numberCoinKey, priceCoinKey).then(dataBuyCoin => {
                    console.log('Текущая цена: ' + arrayPrice[key][1] + ' Цена попытки: ' + priceCoinKey + ' Количество на покупку: ' + numberCoinKey);
                    console.log('Цена в позиции: ' + dataBuyCoin);
                    // sellCoin(key, numberCoinKey, (dataBuyCoin + (dataBuyCoin * 0.005))).then(dataSellCoin => {
                    //   console.log('цена в позиции на продажу: ' + dataSellCoin);
                    // })
                    // opn('https://www.binance.com/ru/futures/' + key)
                  })
                })
              })
            }
          })
        }

      } //else if ((arrayPrice[key][0] - arrayPrice[key][1]) > 0) {
      //   let difference = arrayPrice[key][0] - arrayPrice[key][1]
      //   if(((difference / arrayPrice[key][1]) * 100) >= percent) {
      //     // console.log(new Date().toLocaleTimeString() + ' - ' + key + ' - Дамп - ' +  ((difference / arrayPrice[key][1]) * 100));
      //     // balanceFiat('USDT').then(balance => {
      //     //   futuressHoulder(key, 10).then(data => {
      //     //     futuresMarginType(key).then(data => {
      //     //       sellMarketCoin(key, (balance / arrayPrice[key][1]).toFixed())
      //     //       opn('https://www.binance.com/ru/futures/' + key)
      //     //     })
      //     //   })
      //     // })
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





