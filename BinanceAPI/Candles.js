const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')
const opn = require('opn')

const percent = 0.8

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
    timeout = 120000

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
        // console.log('Памп ' + key + ' - ' + ((difference / arrayPrice[key][1]) * 100) + ' - ' + new Date().toLocaleTimeString());
        if(((difference / arrayPrice[key][1]) * 100) >= percent) {
          console.log(new Date().toLocaleTimeString() + ' - ' + key + ' - Памп - ' +  ((difference / arrayPrice[key][1]) * 100));
          opn('https://www.binance.com/ru/futures/' + key)
        }

      } else if ((arrayPrice[key][0] - arrayPrice[key][1]) > 0) {
        let difference = arrayPrice[key][0] - arrayPrice[key][1]
        // console.log('Дамп ' + key + ' - ' + ((difference / arrayPrice[key][1]) * 100) + ' - ' + new Date().toLocaleTimeString());
        if(((difference / arrayPrice[key][1]) * 100) >= percent) {
          console.log(new Date().toLocaleTimeString() + ' - ' + key + ' - Дамп - ' +  ((difference / arrayPrice[key][1]) * 100));
          opn('https://www.binance.com/ru/futures/' + key)
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