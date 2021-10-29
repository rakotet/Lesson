module.exports = async function futuresPositionRiskPampSell(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4) { // авто продажа
    try {
      let data = await binance.futuresPositionRisk() 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - futuresPositionRiskPampSell')
      }
    
      let markets = Object.keys( data );
      for ( let market of markets ) {
        let obj = data[market], size = Number( obj.positionAmt );
        if ( size != 0 ) {
          positionCounter++
          let entryPrice = Number(obj['entryPrice']) // цена входа в позицию
          let markPrice = Number(obj['markPrice']) // текущая цена маркировки
          let positionAmt = Number(obj['positionAmt']) // количество монет в позиции
          let symbol = obj['symbol']
          let pricePlusSell = entryPrice + (entryPrice * pnlPlusSell) // +% PNL
          let priceMinusSell = entryPrice - (entryPrice * pnlMinusSell) 

          let pricePlusBuy = entryPrice + (entryPrice * pnlPlusBuy) // -0.6% PNL с плечом х1 (0,025 USDT)

          if(!counterProebObj[symbol]) counterProebObj[symbol] = 0
          
          if(counterProebObj[symbol] == 1) {
            pricePlusBuy = entryPrice + (entryPrice * pnlPlusBuy1) // вторая докупка
            // ограничитель тут надо сделать

          } else if (counterProebObj[symbol] == 2) {
            pricePlusBuy = entryPrice + (entryPrice * pnlPlusBuy2) 

          } else if (counterProebObj[symbol] == 3) {
            pricePlusBuy = entryPrice + (entryPrice * pnlPlusBuy3) // дальше уже гонка за ракетами, пока не используем, очкуем

          } else if (counterProebObj[symbol] == 4) {
            pricePlusBuy = entryPrice + (entryPrice * pnlPlusBuy4)
            purchaseLevel = 2 // последняя докупка на всю оставшуюся котлету и молимся

          }  else if (counterProebObj[symbol] == 5) { // все пиздец будет минус 50% от депо (скорее всего, но может пойти откат)
            pricePlusBuy = entryPrice + (entryPrice * 0.05)
          } 

          let priceMinusBuy = entryPrice - (entryPrice * pnlMinusBuy) 

          if(!profitCounter[symbol]) profitCounter[symbol] = 0
          if(!dokupkaCounter[symbol]) dokupkaCounter[symbol] = 0

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
                        counterProebObj[symbol] = 0
                        counterPosition++
                        //fs.writeFileSync('./symbolPamp.txt', '')
                        statusOrder(symbol, orderId, binance).then(avgPrice => {
                        console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в плюс: ' + counterPosition)
                      })
                    })
                  }
                }
              }
            
            if(markPrice >= pricePlusBuy) {
              if(counterProebObj[symbol] === 2) { // количество усреднений
                counterProebObj[symbol] = 0
                buyMarketCoin(symbol, positionAmt, binance).then(orderId => {
                  counterPosition--
                  //fs.writeFileSync('./symbolPamp.txt', '')
                  statusOrder(symbol, orderId, binance).then(avgPrice => {
                    console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в минус: ' + counterPosition + '---------------------------------')
                  })
                })
              }

              if(dokupkaCounter[symbol] === 0) {
                dokupkaPrice[symbol] = markPrice
                dokupkaCounter[symbol] = 1
              } else if (dokupkaCounter[symbol] === 1) {
                  dokupkaPrice1[symbol] = markPrice
                  dokupkaCounter[symbol] = 2
              } else if (dokupkaCounter[symbol] === 2) {
                  dokupkaCounter[symbol] = 0
                  if(((dokupkaPrice[symbol] > dokupkaPrice1[symbol]) &&  (dokupkaPrice1[symbol] > markPrice)) || (markPrice - entryPrice) >= (entryPrice * 0.05)) {
                    if(counterProebObj[symbol] < 2) { // количество усреднений
                      counterProebObj[symbol] = (counterProebObj[symbol] + 1)
                      sellMarketCoin(symbol, (positionAmt * purchaseLevel), binance).then(orderId => {
                        statusOrder(symbol, orderId, binance).then(avgPrice => {
                          console.log(new Date().toLocaleTimeString() + ' Докупили: ' + symbol + ' По цене: ' + avgPrice)
                        })
                      })
                    } else {
                      counterProebObj[symbol] = 0
                      buyMarketCoin(symbol, positionAmt, binance).then(orderId => {
                        counterPosition--
                        //fs.writeFileSync('./symbolPamp.txt', '')
                        statusOrder(symbol, orderId, binance).then(avgPrice => {
                        console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в минус: ' + counterPosition + '---------------------------------')
                      })
                    })
                  }
                }
              }
            }

          } else {
            // if(markPrice >= pricePlusSell) {
            //   if(profitCounter[symbol] === 0) {
            //     currentProfitOne[symbol] = markPrice
            //     profitCounter[symbol] = 1
            //   } else if (profitCounter[symbol] === 1) {
            //       profitCounter[symbol] = 0
            //       if(currentProfitOne[symbol] > markPrice) {
            //         counterProeb = 0
            //         sellMarketCoin(symbol, positionAmt, binance).then(orderId => {
            //           counterPosition++
            //           statusOrder(symbol, orderId, binance).then(avgPrice => {
            //             fs.writeFileSync('./symbolPamp.txt', '')
            //             console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в плюс: ' + counterPosition)
            //           })
            //         })
            //       }
            //     }
            //   }
            
            // if(markPrice <= priceMinusSell) {
            //   counterProeb = 0
            //   sellMarketCoin(symbol, positionAmt, binance).then(orderId => {
            //     counterPosition--
            //     statusOrder(symbol, orderId, binance).then(avgPrice => {
            //       fs.writeFileSync('./symbolPamp.txt', '')
            //       purchaseLevel = 1
            //       console.log(new Date().toLocaleTimeString() + ' Продали: ' + symbol + ' По цене: ' + avgPrice + ' - в минус: ' + counterPosition)
            //     })
            //   })
            // }
          }
        }
      }

      fs.writeFileSync('./symbolPamp.txt', String(positionCounter))
      positionCounter = 0

    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresPositionRiskPampSell');
    }
  
    setTimeout(() => {
      futuresPositionRiskPampSell(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4)
    }, timeoutFuturesPositionRisk)
  }

  let purchaseLevel = 2 // множитель докупки
  let positionCounter = 0

  const counterProebObj = {}
  const dokupkaCounter = {}
  const dokupkaPrice = {}
  const dokupkaPrice1 = {}