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

async function buyCoin(coin, number, price) { // купить монетку по рынку
  try {
    let data = await binance.futuresBuy(coin, Number(number), Number(price)) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    // let orderId = data['orderId']
    // return orderId
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'buyCoin');
  }
}

async function sellMarketCoin(coin, number) { // продать монетку по рынку
  try {
    let data = await binance.futuresMarketSell(coin, Number(number)) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    // let orderId = data['orderId']
    // return orderId
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'sellMarketCoin');
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
          futuressHoulder(key, 10).then(data => {
            futuresMarginType(key).then(data => {
              opn('https://www.binance.com/ru/futures/' + key)
            })
          })
          // balanceFiat('USDT').then(balance => {
          //   // console.log('Монетка: ' + key + ' Баланс: ' + balance + " Баланс 10%: " + (balance * 0.1) + ' Количество на покупку: ' + (balance / arrayPrice[key][1]).toFixed());
          //   futuressHoulder(key, 10).then(data => {
          //     futuresMarginType(key).then(data => {
          //       console.log(arrayPrice[key][1]);
          //       buyCoin(key, (balance / arrayPrice[key][1]).toFixed(), arrayPrice[key][1])
          //       opn('https://www.binance.com/ru/futures/' + key)
          //     })
          //   })
          // })
        }

      } else if ((arrayPrice[key][0] - arrayPrice[key][1]) > 0) {
        let difference = arrayPrice[key][0] - arrayPrice[key][1]
        if(((difference / arrayPrice[key][1]) * 100) >= percent) {
          console.log(new Date().toLocaleTimeString() + ' - ' + key + ' - Дамп - ' +  ((difference / arrayPrice[key][1]) * 100));
          // balanceFiat('USDT').then(balance => {
          //   futuressHoulder(key, 10).then(data => {
          //     futuresMarginType(key).then(data => {
          //       sellMarketCoin(key, (balance / arrayPrice[key][1]).toFixed())
          //       opn('https://www.binance.com/ru/futures/' + key)
          //     })
          //   })
          // })
        }
      }
    }
    console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');
  }

  

  setTimeout(() => {
    futuresPrices()
  }, timeout)
}

futuresPrices()






