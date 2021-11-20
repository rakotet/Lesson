module.exports = async function setkaLimitOrders(coin, binance, buyCoin, futuressHoulder, futuresMarginType, numberOfSigns) {
  try {
    let data = await binance.futuresPrices({symbol: coin})
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    let numberCoinKey = (10 / Number(data['price'])).toFixed();
    let priceTo = 0
    let percent = 0
    let price = Number(data['price'])
    let n = 0.03
    
    percent = percent + n
    priceTo = price - (price * percent)
    priceTo = priceTo.toFixed(numberOfSigns(price))

    futuressHoulder(coin, 7, binance).then(data => {
      futuresMarginType(coin, binance).then(data => {
        buyCoin(coin, numberCoinKey, priceTo, binance).then(orderId => {
          if(orderId) {
            console.log(new Date().toLocaleTimeString() + ' - ' + '1' + ' - ' + ' лимитный ордер');

            numberCoinKey = numberCoinKey * 2
            percent = percent + n
            priceTo = price - (price * percent)
            priceTo = priceTo.toFixed(numberOfSigns(price))

            buyCoin(coin, numberCoinKey, priceTo, binance).then(orderId => {
              if(orderId) {
                console.log(new Date().toLocaleTimeString() + ' - ' + '2' + ' - ' + ' лимитный ордер');
    
                numberCoinKey = numberCoinKey * 2
                percent = percent + n
                priceTo = price - (price * percent)
                priceTo = priceTo.toFixed(numberOfSigns(price))
    
                buyCoin(coin, numberCoinKey, priceTo, binance).then(orderId => {
                  if(orderId) {
                    console.log(new Date().toLocaleTimeString() + ' - ' + '3' + ' - ' + ' лимитный ордер');
        
                    numberCoinKey = numberCoinKey * 2
                    percent = percent + n
                    priceTo = price - (price * percent)
                    priceTo = priceTo.toFixed(numberOfSigns(price))
        
                    buyCoin(coin, numberCoinKey, priceTo, binance).then(orderId => {
                      if(orderId) {
                        console.log(new Date().toLocaleTimeString() + ' - ' + '4' + ' - ' + ' лимитный ордер');
            
                        numberCoinKey = numberCoinKey * 2
                        percent = percent + n
                        priceTo = price - (price * percent)
                        priceTo = priceTo.toFixed(numberOfSigns(price))
            
                        buyCoin(coin, numberCoinKey, priceTo, binance).then(orderId => {
                          if(orderId) {
                            console.log(new Date().toLocaleTimeString() + ' - ' + '5' + ' - ' + ' лимитный ордер');
                
                            numberCoinKey = numberCoinKey * 2
                            percent = percent + n
                            priceTo = price - (price * percent)
                            priceTo = priceTo.toFixed(numberOfSigns(price))
                
                            // buyCoin(coin, numberCoinKey, priceTo, binance).then(orderId => {
                            //   if(orderId) {
                            //     console.log(new Date().toLocaleTimeString() + ' - ' + '6' + ' - ' + ' лимитный ордер');
                    
                            //     numberCoinKey = numberCoinKey * 2
                            //     percent = percent + n
                            //     priceTo = price - (price * percent)
                            //     priceTo = priceTo.toFixed(numberOfSigns(price))
                    
                                
                            //   }
                            // })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
    

  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'setkaLimitOrders');
  }
}