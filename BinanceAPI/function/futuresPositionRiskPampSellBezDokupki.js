module.exports = async function futuresPositionRiskPampSellBezDokupki(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4) { // авто продажа
  try {
    let data = await binance.futuresPositionRisk() 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
      throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - futuresPositionRiskPampSellBezDokupki')
    }
  
    let markets = Object.keys( data );
    for ( let market of markets ) {
      let obj = data[market], size = Number( obj.positionAmt );
      if ( size != 0 ) {
        let entryPrice = Number(obj['entryPrice']) // цена входа в позицию
        let markPrice = Number(obj['markPrice']) // текущая цена маркировки
        let positionAmt = Number(obj['positionAmt']) // количество монет в позиции
        let symbol = obj['symbol']
        let pricePlusSell = entryPrice + (entryPrice * pnlPlusSell) // +% PNL
        let priceMinusSell = entryPrice - (entryPrice * pnlMinusSell) 

        let pricePlusBuy = entryPrice + (entryPrice * pnlPlusBuy) // -0.6% PNL с плечом х1 (0,025 USDT)
        let priceMinusBuy = entryPrice - (entryPrice * pnlMinusBuy) 

        if(!profitCounter[symbol]) profitCounter[symbol] = 0

        if(positionAmt < 0) {
          positionAmt = positionAmt * (-1)

          if(markPrice <= priceMinusBuy) {
            if(profitCounter[symbol] === 0) {
              currentProfitOne[symbol] = markPrice
              profitCounter[symbol] = 1
            } else if (profitCounter[symbol] === 1) {
                profitCounter[symbol] = 0
                if(currentProfitOne[symbol] < markPrice) {
                    buyMarketCoin(symbol, positionAmt, binance).then(orderId => {
                      counterPosition++
                      statusOrder(symbol, orderId, binance).then(avgPrice => {
                        console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в плюс: ' + counterPosition)
                      })
                    })
                  }
                }
              }
          
          if(markPrice >= pricePlusBuy) {
            buyMarketCoin(symbol, positionAmt, binance).then(orderId => {
              counterPosition--
              statusOrder(symbol, orderId, binance).then(avgPrice => {
                console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в минус: ' + counterPosition + ' ---------------------------------')
              })
            })
          }

        } else {
          if(markPrice >= pricePlusSell) {
            if(profitCounter[symbol] === 0) {
              currentProfitOne[symbol] = markPrice
              profitCounter[symbol] = 1
            } else if (profitCounter[symbol] === 1) {
                profitCounter[symbol] = 0
                if(currentProfitOne[symbol] > markPrice) {
                  sellMarketCoin(symbol, positionAmt, binance).then(orderId => {
                    counterPosition++
                    statusOrder(symbol, orderId, binance).then(avgPrice => {
                      console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в плюс: ' + counterPosition)
                    })
                  })
                }
              }
            }
          
          if(markPrice <= priceMinusSell) {
            sellMarketCoin(symbol, positionAmt, binance).then(orderId => {
              counterPosition--
              statusOrder(symbol, orderId, binance).then(avgPrice => {
                console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в минус: ' + counterPosition)
              })
            })
          }
        }
      }
    }
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresPositionRiskPampSellBezDokupki');
  }

  setTimeout(() => {
    futuresPositionRiskPampSellBezDokupki(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4)
  }, timeoutFuturesPositionRisk)
}
