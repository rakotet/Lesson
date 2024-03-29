module.exports = async function traideOpenSymbolAll(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType, priceSymbolPamp) { 
    try {
  
      data = await binance.futuresPrices() 
  
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту traideOpenSymbolAll')
      }
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'traideOpenSymbolAll');
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
      
      let counterOpenPosition = 0 // счетчик, сколько уже открыли сделок в этом цикле

      for(let key in arrayPrice) {
        if((arrayPrice[key][0] - arrayPrice[key][1]) < 0) {
          let difference = arrayPrice[key][0] - arrayPrice[key][1]
          difference = difference * (-1)
  
          if(((difference / arrayPrice[key][1]) * 100) >= percent) {
              if((arrayPrice[key][1] < 10) && key.endsWith('USDT') && ((difference / arrayPrice[key][1]) * 100) < 50) {
                console.log(new Date().toLocaleTimeString() + ' - ' + key + ' Текущая цена: ' + arrayPrice[key][1] + ' - Памп - ' +  ((difference / arrayPrice[key][1]) * 100));
                opn('https://www.binance.com/ru/futures/' + key)
                if(counterOpenPosition < 10) {
                  priceSymbolPamp(key)
                }
                counterOpenPosition++
            }
          }
        } 
        else if ((arrayPrice[key][0] - arrayPrice[key][1]) > 0) {
          let difference = arrayPrice[key][0] - arrayPrice[key][1]
          if(((difference / arrayPrice[key][1]) * 100) >= 3) {
            console.log(new Date().toLocaleTimeString() + ' - ' + key + ' - Дамп - ' +  ((difference / arrayPrice[key][1]) * 100));
            //opn('https://www.binance.com/ru/futures/' + key)
          }
        }
      }

      counterOpenPosition = 0

      console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');
    }
  
    setTimeout(() => {
      traideOpenSymbolAll(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType, priceSymbolPamp)
    }, timeout)
  }

  


  // async function priceSymbolPamp(binance, sellMarketCoin, opn, fs, coin, futuressHoulder, futuresMarginType, getCandles) {
  //   try {
  //      let data = await binance.futuresPrices({symbol: coin}) 
  
  //     if(data.code) {
  //       console.log(data.code + ' - ' + data.msg);
  //       throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту priceSymbolPamp')
  //     }

  //     let numberCoinKey = (30 / Number(data['price'])).toFixed();

  //     let resultFile = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})

  //     if(Number(resultFile) < 3) { // проверка на количество открытых сделок
  //       openPosition(coin, binance).then(data => {
  //         if(data) {
  //           getCandles(coin, binance).then(data => {
  //             if(data) {
  //               futuressHoulder(coin, 10, binance).then(data => {
  //                 futuresMarginType(coin, binance).then(data => {
  //                   sellMarketCoin(coin, numberCoinKey, binance).then(orderId => {
  //                     if(orderId) {
  //                       console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку');
  //                       opn('https://www.binance.com/ru/futures/' + coin)
  //                     }
  //                   })
  //                 })
  //               })
  //             } else console.log('Не вошли в позицию getCandles ' + coin);
  //           })
  //         } else console.log('Не вошли в позицию openPosition ' + coin);
  //       })
  //     }

  //   } catch(e) {
  //     console.log(e);
  //     console.log(new Date().toLocaleTimeString() + ' - ' + 'priceSymbolPamp');
  //   }

  // }


  // async function getCandles(coin, binance) { // получить свечи
  //   try{
  //     let data = await binance.futuresCandles(coin, '1m', {limit: 60}) 
  //     if(data.code) {
  //       console.log(data.code + ' - ' + data.msg);
  //     }
      
  //     let volumeCandlesAll = 0

  //     for(let i = 0; i < data.length - 3; i++) {
  //       let volume = Number(data[i][5]) // объём 1
  //       volumeCandlesAll = volumeCandlesAll + volume
  //     }

  //     let meanVolume = volumeCandlesAll / (data.length - 3)
  //     let pamp = 30
  //     let truAndFalse = false

  //     if((Number(data[data.length - 1][5]) > (meanVolume * pamp)) || (Number(data[data.length - 2][5]) > (meanVolume * pamp)) || (Number(data[data.length - 3][5]) > (meanVolume * pamp))) {
  //       truAndFalse =  false
  //     } else {
  //       truAndFalse = true
  //     }

  //     let greenRedCandles = 0
      
  //     for(let i = 2; i < 10; i++) {
  //       if(Number(data[data.length - i][1]) < Number(data[data.length - i][4])) {
  //         greenRedCandles++
  //       } else {
  //         greenRedCandles--
  //       }
  //     }

  //     if(truAndFalse === false || greenRedCandles === 8) {
  //       return false
  //     } else {
  //       return true
  //     }

  //   } catch(e) {
  //     console.log(e);
  //     console.log(new Date().toLocaleTimeString() + ' - ' + 'getCandles');
  //   }
    
  // }

  // async function openPosition(coin, binance) { // Получение открытой позиции по конкретной монете
  //   try {
  //     let data = await binance.futuresPositionRisk({symbol: coin}) 
  
  //     if(data.code) {
  //       console.log(data.code + ' - ' + data.msg);
  //     }
  
  //     if(Number(data[0]['positionAmt']) === 0) {
  //       return true
  //     } else {
  //       return false
  //     }

  //   } catch(e) {
  //     console.log(e);
  //     console.log(new Date().toLocaleTimeString() + ' - ' + 'openPosition');
  //   }
  // }