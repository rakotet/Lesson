module.exports = async function traideOpenPampBuy(percent, arrayPrice, counter, data, timeout, opn, binance, balanceFiat, futuressHoulder, futuresMarginType, buyMarketCoin, timeoutSearch, timeoutTraideOpenPamp, buyCoin, numberOfSigns, wrapping) { 
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
            console.log(new Date().toLocaleTimeString() + ' - ' + key + ' Текущая цена: ' + arrayPrice[key][1] + ' - Памп - ' +  ((difference / arrayPrice[key][1]) * 100));
            
            balanceFiat('USDT', binance).then(balance => {
              let priceNow = arrayPrice[key][1]
              if(balance > 7) {
                futuressHoulder(key, 1, binance).then(data => {
                  futuresMarginType(key, binance).then(data => {
                    // opn('https://www.binance.com/ru/futures/' + key)
                    let numberCoinKey = ((balance / priceNow) / 2).toFixed(); // количество монеты в покупку
                    
                    let priceCoinKey = (priceNow - (priceNow * wrapping)).toFixed(numberOfSigns(priceNow)); // планируемая цена входа в позицию для лимитного ордера
  
                    buyCoin(key, numberCoinKey, priceCoinKey, binance).then(orderId => {
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
      traideOpenPampBuy(percent, arrayPrice, counter, data, timeout, opn, binance, balanceFiat, futuressHoulder, futuresMarginType, buyMarketCoin, timeoutSearch, timeoutTraideOpenPamp, buyCoin, numberOfSigns, wrapping)
    }, timeout)
  }
  