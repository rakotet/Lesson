module.exports = async function traideOpenPampBuy(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType) { 
    try {
  
      data = await binance.futuresPrices() 
  
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту traideOpenPampBuy')
      }
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'traideOpenPampBuy');
      data = await binance.futuresPrices() 
    }
  
    if(counter === 0) {
      for(let key in data) {
        arrayPrice[key] = [Number(data[key])]
        
      }
      counter++
      timeout = timeoutSearch
      
    } else if(counter === 1) {
      for(let key in data) {
        arrayPrice[key][1] = Number(data[key])
        
      }
      counter = 0
      timeout = timeoutTraideOpenPamp
      
      for(let key in arrayPrice) {
        if((arrayPrice[key][0] - arrayPrice[key][1]) < 0) {
          let difference = arrayPrice[key][0] - arrayPrice[key][1]
          difference = difference * (-1)
  
          if(((difference / arrayPrice[key][1]) * 100) >= percent) {
            //console.log(new Date().toLocaleTimeString() + ' - ' + key + ' Текущая цена: ' + arrayPrice[key][1] + ' - Памп - ' +  ((difference / arrayPrice[key][1]) * 100));

            if((arrayPrice[key][1] < 20) && key.endsWith('USDT') && ((difference / arrayPrice[key][1]) * 100) < 5) {
                symbolPamp[key] = (difference / arrayPrice[key][1]) * 100
            }
          }
        } 

      }

      let counterObjLength = 0

      for(key in symbolPamp) {
          counterObjLength++
      }
      
      if(counterObjLength >= 2) {
        let keys = Object.keys(symbolPamp)
        max = keys.reduce(function (a, b) {
            return +symbolPamp[a] > +symbolPamp[b] ? a : b;
        });

        let result = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})
        if(result == '') {
          priceSymbolPamp(binance, sellMarketCoin, opn, fs, max, futuressHoulder, futuresMarginType, getCandles)

          console.log(new Date().toLocaleTimeString() + ' - ' + max + ' - Памп - ' + symbolPamp[max])
        }

      } else if(counterObjLength === 1) {
        for(key in symbolPamp) {
            max = key
        }

        let result = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})
        if(result == '') {
          priceSymbolPamp(binance, sellMarketCoin, opn, fs, max, futuressHoulder, futuresMarginType, getCandles)

          console.log(new Date().toLocaleTimeString() + ' - ' + max + ' - Памп - ' + symbolPamp[max])
        }
      }
      
      symbolPamp = {}

      console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');
    }
  
    
  
    setTimeout(() => {
      traideOpenPampBuy(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType)
    }, timeout)
  }




  async function priceSymbolPamp(binance, sellMarketCoin, opn, fs, coin, futuressHoulder, futuresMarginType, getCandles) {
    try {
       let data = await binance.futuresPrices({symbol: coin}) 
  
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту priceSymbolPamp')
      }

      let numberCoinKey = (30 / Number(data['price'])).toFixed();

      futuressHoulder(coin, 10, binance).then(data => {
        futuresMarginType(coin, binance).then(data => {
          getCandles(coin, binance).then(data => {
            if(data) {
              sellMarketCoin(coin, numberCoinKey, binance).then(orderId => {
                if(orderId) {
                  console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку');
                  opn('https://www.binance.com/ru/futures/' + coin)
                  fs.writeFileSync('./symbolPamp.txt', '1')
                }
              })
            }
          })
        })
      })

    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'priceSymbolPamp');
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

      if((Number(data[data.length - 1][5]) > (meanVolume * pamp)) || (Number(data[data.length - 2][5]) > (meanVolume * pamp)) || (Number(data[data.length - 3][5]) > (meanVolume * pamp))) {
        return false
      } else {
        return true
      }

    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'getCandles');
    }
    
  }