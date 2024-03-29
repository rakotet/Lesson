module.exports = async function traideOpenSymbol(percent2, arrayPrice, counter, data, timeout, binance, timeoutSearch2, timeoutTraideOpenPamp, symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType, priceSymbolPamp, symbolDamp, priceSymbolDamp) { 
    try {
  
      data = await binance.futuresPrices() 
  
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту traideOpenSymbol')
      }
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'traideOpenSymbol');
      data = await binance.futuresPrices() 
    }
  
    if(counter === 0) {
      for(let key in data) {
        arrayPrice[key] = [Number(data[key])]
        
      }
      counter++
      timeout = timeoutSearch2
      
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
  
          if(((difference / arrayPrice[key][1]) * 100) >= percent2) {
            //console.log(new Date().toLocaleTimeString() + ' - ' + key + ' Текущая цена: ' + arrayPrice[key][1] + ' - Памп - ' +  ((difference / arrayPrice[key][1]) * 100));

            if((arrayPrice[key][1] < 10) && key.endsWith('USDT') && ((difference / arrayPrice[key][1]) * 100) < 50) {
                if(true) {
                  //priceSymbolPamp(key)
                  //opn('https://www.binance.com/ru/futures/' + key)
                  console.log(new Date().toLocaleTimeString() + ' - ' + key + ' Текущая цена: ' + arrayPrice[key][1] + ' - Памп - ' +  ((difference / arrayPrice[key][1]) * 100))
                  //symbolPamp[key] = (difference / arrayPrice[key][1]) * 100
                }
            }
          }
        } else {
          let difference = arrayPrice[key][0] - arrayPrice[key][1]
          if(((difference / arrayPrice[key][1]) * 100) >= percent2) {
            // console.log(new Date().toLocaleTimeString() + ' - ' + key + ' Текущая цена: ' + arrayPrice[key][1] + ' - Дамп - ' +  ((difference / arrayPrice[key][1]) * 100));
            //opn('https://www.binance.com/ru/futures/' + key)
            if((arrayPrice[key][1] < 10) && key.endsWith('USDT')) {
              //opn('https://www.binance.com/ru/futures/' + key)
              console.log(new Date().toLocaleTimeString() + ' - ' + key + ' Текущая цена: ' + arrayPrice[key][1] + ' - Дамп - ' +  ((difference / arrayPrice[key][1]) * 100));
              //symbolDamp[key] = (difference / arrayPrice[key][1]) * 100
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
        if(Number(result) < 10) {
          //fs.writeFileSync('./symbolPamp.txt', max)
          //console.log(new Date().toLocaleTimeString() + ' - ' + max + ' - Памп - ' + symbolPamp[max])
          //opn('https://www.binance.com/ru/futures/' + max)
          //priceSymbolPamp(max)
        }

      } else if(counterObjLength === 1) {
        for(key in symbolPamp) {
            max = key
        }

        let result = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})
        if(Number(result) < 10) {
          //fs.writeFileSync('./symbolPamp.txt', max)
          //console.log(new Date().toLocaleTimeString() + ' - ' + max + ' - Памп - ' + symbolPamp[max])
          //opn('https://www.binance.com/ru/futures/' + max)
          //priceSymbolPamp(max)
        }
      }

      /////////////////

      let counterObjLength2 = 0

      for(key in symbolDamp) {
          counterObjLength2++
      }
      
      if(counterObjLength2 >= 2) {
        let keys = Object.keys(symbolDamp)
        max = keys.reduce(function (a, b) {
            return +symbolDamp[a] > +symbolDamp[b] ? a : b;
        });

        let result = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})
        if(Number(result) < 10) {
          //fs.writeFileSync('./symbolPamp.txt', max)
          //console.log(new Date().toLocaleTimeString() + ' - ' + max + ' - Дамп - ' + symbolDamp[max])
          //opn('https://www.binance.com/ru/futures/' + max)
          //priceSymbolDamp(max)
        }

      } else if(counterObjLength2 === 1) {
        for(key in symbolDamp) {
            max = key
        }

        let result = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})
        if(Number(result) < 10) {
          //fs.writeFileSync('./symbolPamp.txt', max)
          //console.log(new Date().toLocaleTimeString() + ' - ' + max + ' - Дамп - ' + symbolDamp[max])
          //opn('https://www.binance.com/ru/futures/' + max)
          //priceSymbolDamp(max)
        }
      }
      
      symbolPamp = {}
      symbolDamp = {}

      console.log(new Date().toLocaleTimeString() + ' ---------');
    }
  
    
  
    setTimeout(() => {
      traideOpenSymbol(percent2, arrayPrice, counter, data, timeout, binance, timeoutSearch2, timeoutTraideOpenPamp, symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType, priceSymbolPamp, symbolDamp, priceSymbolDamp)
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

  //     futuressHoulder(coin, 10, binance).then(data => {
  //       futuresMarginType(coin, binance).then(data => {
  //         getCandles(coin, binance).then(data => {
  //           if(data) {
  //             sellMarketCoin(coin, numberCoinKey, binance).then(orderId => {
  //               if(orderId) {
  //                 console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку');
  //                 opn('https://www.binance.com/ru/futures/' + coin)
  //                 fs.writeFileSync('./symbolPamp.txt', coin)
  //               }
  //             })
  //           }
  //         })
  //       })
  //     })

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