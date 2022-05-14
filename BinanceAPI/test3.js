// let http = require('request')

// const idBot = '5302452238:AAEmImsTrmLxdkZxDrQoPL4l1DzBnqhhdZg'
// const idChatPlot = '-1001506995531'
// const idChatManipul = '-1001196361965'
// let coin = 'BTCUSDT'
// let msg = '121221' + '\n' + '<a href="www.binance.com/ru/futures/' + coin + '"' + '>Ссылка на инструмент ' + coin + '</a>'


//   function sendTelega(msg) {
//     msg = encodeURI(msg)

//     http.post(`https://api.telegram.org/bot${idBot}/sendMessage?chat_id=${idChatManipul}&parse_mode=html&text=${msg}&disable_web_page_preview=True`, function (error, response, body) {  
//         if(error) {
//           console.log('error:', error); 
//         }
        
//         if(response.statusCode!==200){
//           console.log(new Date().toLocaleTimeString() + ' - ' + 'Произошла ошибка при отправке сообщения в телеграм');
//           console.log(response.statusCode);
//         }
//       });
//   }

//   sendTelega(msg)

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});

async function historyTraide(coin) {
  try {
    let priceData = await binance.futuresPrices({symbol: coin}) 
    if(priceData.code) {
      console.log(priceData.code + ' - ' + priceData.msg);
    }

    let priceOld = Number(priceData['price'])

    let history = await binance.futuresTrades(coin, {limit: 100} )
    if(history.code) {
      console.log(history.code + ' - ' + history.msg);
    }

    let sellVolume = 0
    let buyVolume = 0

    for(let obj in history) {
      if(priceOld < Number(history[obj]['price'])) {
        sellVolume += Number(history[obj]['quoteQty'])
      } else if(priceOld > Number(history[obj]['price'])) {
        buyVolume += Number(history[obj]['quoteQty'])
      }
    }

    if(sellVolume > buyVolume) {
      console.log(sellVolume + ' SELL')
    } else if(sellVolume < buyVolume) {
      console.log(buyVolume + ' BUY')
    }

    

  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'historyTraide');
  }

  setTimeout(() => {
    historyTraide(coin)
  }, 10)
}

historyTraide('GALUSDT')