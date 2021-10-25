module.exports = async function traideOpenPampBuy(percent, arrayPrice, counter, data, timeout, opn, binance, balanceFiat, futuressHoulder, futuresMarginType, buyMarketCoin, timeoutSearch, timeoutTraideOpenPamp, buyCoin, numberOfSigns, wrapping, sellMarketCoin, sellCoin) { 
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
            let priceNow = arrayPrice[key][1]
            getCandles(key, binance).then(data => {
              if(data) {
                balanceFiat('USDT', binance).then(balance => {
                  if(balance > 1) {                   
                    let numberCoinKey = ((balance / priceNow) / 5).toFixed(); // количество монеты в покупку
                    let priceCoinKey = (priceNow + (priceNow * wrapping)).toFixed(numberOfSigns(priceNow))
                    sellCoin(key, numberCoinKey, priceCoinKey, binance).then(orderId => {
                      if(orderId) {
                        console.log(new Date().toLocaleTimeString() + ' - ' + key + ' Текущая цена: ' + priceNow + ' - Памп - ' +  ((difference / priceNow) * 100));
                        opn('https://www.binance.com/ru/futures/' + key)
                      }
                    })
                  }
                })
              }
            })
            
            // balanceFiat('USDT', binance).then(balance => {
            //   let priceNow = arrayPrice[key][1]
            //   if(balance > 7) {
            //     futuressHoulder(key, 1, binance).then(data => {
            //       futuresMarginType(key, binance).then(data => {
            //         // opn('https://www.binance.com/ru/futures/' + key)
            //         let numberCoinKey = ((balance / priceNow) / 2).toFixed(); // количество монеты в покупку
                    
            //         let priceCoinKey = (priceNow - (priceNow * wrapping)).toFixed(numberOfSigns(priceNow)); // планируемая цена входа в позицию для лимитного ордера
  
            //         buyCoin(key, numberCoinKey, priceCoinKey, binance).then(orderId => {
            //           if(orderId) opn('https://www.binance.com/ru/futures/' + key)
            //           // statusOrder(key, orderId).then(avgPrice => {
            //           //   // console.log(new Date().toLocaleTimeString() + ' ' + key + ' Текущая цена: ' + priceNow + ' Цена в позиции: ' + avgPrice);
            //           //    opn('https://www.binance.com/ru/futures/' + key)
            //           // })
            //         })
            //       })
            //     })
            //   }
            // })
          }
  
        } //else if ((arrayPrice[key][0] - arrayPrice[key][1]) > 0) {
          // let difference = arrayPrice[key][0] - arrayPrice[key][1]
  
        //   if(((difference / arrayPrice[key][1]) * 100) >= percent) {
        //     console.log(new Date().toLocaleTimeString() + ' - ' + key + ' - Дамп - ' +  ((difference / arrayPrice[key][1]) * 100));
        //     opn('https://www.binance.com/ru/futures/' + key)
        //     // balanceFiat('USDT').then(balance => {
        //     //   let priceNow = arrayPrice[key][1]
        //     //   if(balance > 5) {
        //     //     futuressHoulder(key, 20).then(data => {
        //     //       futuresMarginType(key).then(data => {
        //     //         opn('https://www.binance.com/ru/futures/' + key)
        //     //         let numberCoinKey = ((balance / priceNow) / 2).toFixed(); // количество монеты в покупку
        //     //         let priceCoinKey = (priceNow - (priceNow * 0.001)).toFixed(numberOfSigns(priceNow)); // планируемая цена входа в позицию для лимитного ордера
  
        //     //         // buyMarketCoin(key, numberCoinKey).then(orderId => {
        //     //         //   opn('https://www.binance.com/ru/futures/' + key)
        //     //         //   // statusOrder(key, orderId).then(avgPrice => {
        //     //         //   //   // console.log(new Date().toLocaleTimeString() + ' ' + key + ' Текущая цена: ' + priceNow + ' Цена в позиции: ' + avgPrice);
        //     //         //   //   //  opn('https://www.binance.com/ru/futures/' + key)
        //     //         //   // })
        //     //         // })
        //     //       })
        //     //     })
        //     //   }
        //     // })
        //   }
        // }
      }
      
      console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');
    }
  
    
  
    setTimeout(() => {
      traideOpenPampBuy(percent, arrayPrice, counter, data, timeout, opn, binance, balanceFiat, futuressHoulder, futuresMarginType, buyMarketCoin, timeoutSearch, timeoutTraideOpenPamp, buyCoin, numberOfSigns, wrapping, sellMarketCoin, sellCoin)
    }, timeout)
  }


  async function getCandles(coin, binance) { // получить свечи
    try{
      let data = await binance.futuresCandles(coin, '1m', {limit: 30}) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
      
      let volumeCandlesAll = 0

      for(let i = 0; i < data.length - 4; i++) {
        let volume = Number(data[i][5]) // объём 1
        volumeCandlesAll = volumeCandlesAll + volume
      }

      let meanVolume = volumeCandlesAll / (data.length - 4)

      if((Number(data[data.length - 1][5]) > (meanVolume * 5)) || (Number(data[data.length - 2][5]) > (meanVolume * 5)) || (Number(data[data.length - 3][5]) > (meanVolume * 5)) || (Number(data[data.length - 4][5]) > (meanVolume * 5))) {
        return true
      } else {
        return false
      }

    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'getCandles');
    }
    
  }
  