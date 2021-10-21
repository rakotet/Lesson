module.exports = async function futuresPositionRisk(counterPosition, binance, buyMarketCoin, statusOrder) { // авто продажа
    try {
      let data = await binance.futuresPositionRisk() 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - futuresPositionRisk')
      }
    
      let markets = Object.keys( data );
      for ( let market of markets ) {
        let obj = data[market], size = Number( obj.positionAmt );
        if ( size != 0 ) {
          let entryPrice = Number(obj['entryPrice']) // цена входа в позицию
          let markPrice = Number(obj['markPrice']) // текущая цена маркировки
          let positionAmt = Number(obj['positionAmt']) // количество монет в позиции
          let symbol = obj['symbol']
          let pricePlus = entryPrice + (entryPrice * 0.004) // +% PNL
          let priceMinus = entryPrice - (entryPrice * 0.003) // -0.6% PNL с плечом х1 (0,025 USDT)
          positionAmt = positionAmt * (-1)
  
          // if(!profitCounter[symbol]) profitCounter[symbol] = 0
  
          // if(markPrice >= pricePlus) {
          //   if(profitCounter[symbol] === 0) {
          //     currentProfitOne[symbol] = markPrice
          //     profitCounter[symbol] = 1
          //   } else if (profitCounter[symbol] === 1) {
          //       profitCounter[symbol] = 0
          //       if(currentProfitOne[symbol] > markPrice) {
          //         sellMarketCoin(symbol, positionAmt).then(orderId => {
          //           statusOrder(symbol, orderId).then(avgPrice => {
          //             counterPosition++
          //             console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в плюс: ' + counterPosition)
          //           })
          //         })
          //       }
          //     }
          //   }
  
          if(markPrice >= pricePlus) {
            buyMarketCoin(symbol, positionAmt).then(orderId => {
              statusOrder(symbol, orderId).then(avgPrice => {
                counterPosition--
                console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в минус: ' + counterPosition)
              })
            })
          }
          
          if(markPrice <= priceMinus) {
            buyMarketCoin(symbol, positionAmt).then(orderId => {
              statusOrder(symbol, orderId).then(avgPrice => {
                counterPosition++
                console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в плюс: ' + counterPosition)
              })
            })
          }
        }
      }
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresPositionRisk');
    }
  
    setTimeout(() => {
      futuresPositionRisk()
    }, 1000)
  }