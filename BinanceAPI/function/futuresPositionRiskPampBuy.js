module.exports = async function futuresPositionRiskPampBuy(counterPosition, binance, buyMarketCoin, statusOrder, pnlPlus, pnlMinus, timeoutFuturesPositionRisk, profitCounter, currentProfitOne) { // авто продажа
    try {
      let data = await binance.futuresPositionRisk() 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - futuresPositionRiskPampBuy')
      }
    
      let markets = Object.keys( data );
      for ( let market of markets ) {
        let obj = data[market], size = Number( obj.positionAmt );
        if ( size != 0 ) {
          let entryPrice = Number(obj['entryPrice']) // цена входа в позицию
          let markPrice = Number(obj['markPrice']) // текущая цена маркировки
          let positionAmt = Number(obj['positionAmt']) // количество монет в позиции
          let symbol = obj['symbol']
          let pricePlus = entryPrice + (entryPrice * pnlPlus) // +% PNL
          let priceMinus = entryPrice - (entryPrice * pnlMinus) // -0.6% PNL с плечом х1 (0,025 USDT)

          if(positionAmt < 0) {
            positionAmt = positionAmt * (-1)
          }
          
          if(!profitCounter[symbol]) profitCounter[symbol] = 0
  
          if(markPrice <= priceMinus) {
            if(profitCounter[symbol] === 0) {
              currentProfitOne[symbol] = markPrice
              profitCounter[symbol] = 1
            } else if (profitCounter[symbol] === 1) {
                profitCounter[symbol] = 0
                if(currentProfitOne[symbol] < markPrice) {
                    buyMarketCoin(symbol, positionAmt, binance).then(orderId => {
                    statusOrder(symbol, orderId, binance).then(avgPrice => {
                      counterPosition++
                      console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в плюс: ' + counterPosition)
                    })
                  })
                }
              }
            }
  
          // if(markPrice >= pricePlus) {
          //   sellMarketCoin(symbol, positionAmt, binance).then(orderId => {
          //     statusOrder(symbol, orderId, binance).then(avgPrice => {
          //       counterPosition++
          //       console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в плюс: ' + counterPosition)
          //     })
          //   })
          // }
          
          if(markPrice >= pricePlus) {
            buyMarketCoin(symbol, positionAmt, binance).then(orderId => {
              statusOrder(symbol, orderId, binance).then(avgPrice => {
                counterPosition--
                console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в минус: ' + counterPosition)
              })
            })
          }
        }
      }
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresPositionRiskPampBuy');
    }
  
    setTimeout(() => {
        futuresPositionRiskPampBuy(counterPosition, binance, buyMarketCoin, statusOrder, pnlPlus, pnlMinus, timeoutFuturesPositionRisk, profitCounter, currentProfitOne)
    }, timeoutFuturesPositionRisk)
  }