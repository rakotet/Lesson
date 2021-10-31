module.exports = async function faifCandles(binance, opn, futuressHoulder, futuresMarginType, sellMarketCoin) {
    try {
  
        candlesSymboldata = await binance.futuresPrices() 
    
        if(candlesSymboldata.code) {
          console.log(candlesSymboldata.code + ' - ' + candlesSymboldata.msg);
          throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - faifCandles')
        }
      } catch(e) {
        console.log(e);
        console.log(new Date().toLocaleTimeString() + ' - ' + 'faifCandles');
      }

      for(let coin in candlesSymboldata) {
        searchCandles(coin, binance, opn, Number(candlesSymboldata[coin]), futuressHoulder, futuresMarginType, sellMarketCoin)
      }

      console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

      setTimeout(() => {
        faifCandles(binance, opn, futuressHoulder, futuresMarginType, sellMarketCoin)
      }, 60000)
}

let candlesSymboldata = {}

async function searchCandles(coin, binance, opn, price, futuressHoulder, futuresMarginType, sellMarketCoin) { // получить свечи
    try{
      let data = await binance.futuresCandles(coin, '1m', {limit: 5}) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
      
      let grinCandles = 0
      let redCandles = 0

      for(let i = 0; i < data.length - 2; i++) {
        if(Number(data[i][1]) < Number(data[i][4])) {
          grinCandles++
        }
      }

      if(Number(data[data.length - 2][1]) > Number(data[data.length - 2][4])) {
        redCandles++
      }

      if((grinCandles === 3) && (redCandles === 1)) {
        console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' 3 зеленых одна красная');
        let numberCoinKey = (30 / price).toFixed();
        
        openPosition(coin, binance).then(data => {
          if(data) {
            getCandles(coin, binance).then(data => {
              if(data) {
                futuressHoulder(coin, 10, binance).then(data => {
                  futuresMarginType(coin, binance).then(data => {
                    // opn('https://www.binance.com/ru/futures/' + coin)

                    sellMarketCoin(coin, numberCoinKey, binance).then(orderId => {
                      if(orderId) {
                        console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку');
                        // opn('https://www.binance.com/ru/futures/' + coin)
                      }
                    })
                  })
                })
              } else console.log('Не вошли в позицию getCandles ' + coin);
            })
          } else console.log('Не вошли в позицию openPosition ' + coin);
        })
      }

    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'getCandles');
    }
    
  }

  
  async function getCandles(coin, binance) { // получить свечи
    try{
      let data = await binance.futuresCandles(coin, '1m', {limit: 60}) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
      
      let volumeCandlesAll = 0

      for(let i = 0; i < data.length - 3; i++) {
        let volume = Number(data[i][5]) // объём 1
        volumeCandlesAll = volumeCandlesAll + volume
      }

      let meanVolume = volumeCandlesAll / (data.length - 3)
      let pamp = 30
      let truAndFalse = false

      if((Number(data[data.length - 1][5]) > (meanVolume * pamp)) || (Number(data[data.length - 2][5]) > (meanVolume * pamp)) || (Number(data[data.length - 3][5]) > (meanVolume * pamp))) {
        truAndFalse =  false
      } else {
        truAndFalse = true
      }

      let greenRedCandles = 0
      
      for(let i = 2; i < 10; i++) {
        if(Number(data[data.length - i][1]) < Number(data[data.length - i][4])) {
          greenRedCandles++
        } else {
          greenRedCandles--
        }
      }

      if(truAndFalse === false || greenRedCandles === 8) {
        return false
      } else {
        return true
      }

    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'getCandles');
    }
    
  }

  async function openPosition(coin, binance) { // Получение открытой позиции по конкретной монете
    try {
      let data = await binance.futuresPositionRisk({symbol: coin}) 
  
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
  
      if(Number(data[0]['positionAmt']) === 0) {
        return true
      } else {
        return false
      }

    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'openPosition');
    }
  }