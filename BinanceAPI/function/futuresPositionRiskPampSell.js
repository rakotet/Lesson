module.exports = async function futuresPositionRiskPampSell(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4, futuresCancelAll) { // авто продажа
    try {
      let data = await binance.futuresPositionRisk() 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - futuresPositionRiskPampSell')
      }
    
      let markets = Object.keys( data );
      for ( let market of markets ) {
        let obj = data[market], size = Number( obj.positionAmt );
        if ( size != 0 && obj['symbol'] !== 'btc') {
          let purchaseLevel = 3 // множитель докупки

          positionCounter++

          let unRealizedProfit = Number(obj['unRealizedProfit'])
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

          } else if (counterProebObj[symbol] == 2) {
            pricePlusBuy = entryPrice + (entryPrice * pnlPlusBuy2) 

          } else if (counterProebObj[symbol] == 3) {
            pricePlusBuy = entryPrice + (entryPrice * pnlPlusBuy3) // дальше уже гонка за ракетами, пока не используем, очкуем

          } else if (counterProebObj[symbol] == 4) {
            pricePlusBuy = entryPrice + (entryPrice * pnlPlusBuy4)
            //purchaseLevel = 2 // последняя докупка на всю оставшуюся котлету и молимся

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
                        dokupkaCounter[symbol] = 0
                        counterPosition++
                        //fs.writeFileSync('./symbolPamp.txt', '')
                        statusOrder(symbol, orderId, binance).then(avgPrice => {
                        console.log('\n' + new Date().toLocaleTimeString() + ' Продали Памп: ' + symbol + ' По цене: ' + avgPrice + '  в плюс: ' + unRealizedProfit + ';  ' + counterPosition + ' +++++++++++++++++++++++++++')
                        pribl = pribl + unRealizedProfit
                        console.log('Общая прибыль: ' + pribl + '\n');
                      })
                    })
                  }
                }
              }
            
            if(markPrice >= pricePlusBuy) {
              // if(counterProebObj[symbol] === 0) { // количество усреднений
              //   counterProebObj[symbol] = 0
                buyMarketCoin(symbol, positionAmt, binance).then(orderId => {
                  dokupkaCounter[symbol] = 0
                  counterPosition--
                  //fs.writeFileSync('./symbolPamp.txt', '')
                  statusOrder(symbol, orderId, binance).then(avgPrice => {
                    console.log('\n' + new Date().toLocaleTimeString() + ' Продали Памп: ' + symbol + ' По цене: ' + avgPrice + '  в минус: ' + unRealizedProfit + ';  ' + counterPosition + ' ---------------------------------')
                    pribl = pribl + unRealizedProfit
                    console.log('Общая прибыль: ' + pribl + '\n');
                  })
                })
              //}

              // if(dokupkaCounter[symbol] === 0) {
              //   dokupkaPrice[symbol] = markPrice
              //   dokupkaCounter[symbol] = 1
              //   getCandles(symbol, binance).then(data => {
              //     candlesRed[symbol] = data
              //   })
              // } else if (dokupkaCounter[symbol] === 1) {
              //     dokupkaCounter[symbol] = 0
              //     if(/*(dokupkaPrice[symbol]  > markPrice) && ((dokupkaPrice[symbol]  - markPrice) >= (markPrice * 0.001))) && */ candlesRed[symbol]) {
              //       if(counterProebObj[symbol] < 0) { // количество усреднений
              //         counterProebObj[symbol] = (counterProebObj[symbol] + 1)
              //         sellMarketCoin(symbol, (positionAmt * purchaseLevel), binance).then(orderId => {
              //           statusOrder(symbol, orderId, binance).then(avgPrice => {
              //             console.log(new Date().toLocaleTimeString() + ' Докупили: ' + symbol + ' По цене: ' + avgPrice)
              //           })
              //         })
              //       } 
              //     } else if (((markPrice - entryPrice) >= (entryPrice * 0.08))) {
              //       sellMarketCoin(symbol, positionAmt, binance).then(orderId => {
              //         statusOrder(symbol, orderId, binance).then(avgPrice => {
              //           console.log(new Date().toLocaleTimeString() + 'Докупили позицию что бы не ликвиднуло ' + symbol + ' По цене: ' + avgPrice)
              //         })
              //       })
              //     }
              //   } 
              }

          } else {
            if(markPrice >= pricePlusSell) {
              if(profitCounter[symbol] === 0) {
                currentProfitOne[symbol] = markPrice
                profitCounter[symbol] = 1
              } else if (profitCounter[symbol] === 1) {
                  profitCounter[symbol] = 0
                  if(currentProfitOne[symbol] < markPrice) {
                    sellMarketCoin(symbol, positionAmt, binance).then(orderId => {
                      counterProebObj[symbol] = 0
                      dokupkaCounter[symbol] = 0
                      counterPosition++
                      //futuresCancelAll(symbol, binance)
                      statusOrder(symbol, orderId, binance).then(avgPrice => {
                      console.log('\n' + new Date().toLocaleTimeString() + ' Продали Дамп: ' + symbol + ' По цене: ' + avgPrice + '  в плюс: ' + unRealizedProfit + ';  ' + counterPosition + ' +++++++++++++++++++++++++++')
                      pribl = pribl + unRealizedProfit
                      console.log('Общая прибыль: ' + pribl + '\n');
                    })
                  })
                }
              }
            }
            
            if(markPrice <= priceMinusSell) {
              sellMarketCoin(symbol, positionAmt, binance).then(orderId => {
                counterProebObj[symbol] = 0
                dokupkaCounter[symbol] = 0
                counterPosition--
                statusOrder(symbol, orderId, binance).then(avgPrice => {
                  console.log('\n' + new Date().toLocaleTimeString() + ' Продали Дамп: ' + symbol + ' По цене: ' + avgPrice + '  в минус: ' + unRealizedProfit + ';  ' + counterPosition + '---------------------------------')
                  pribl = pribl + unRealizedProfit
                  console.log('Общая прибыль: ' + pribl + '\n');
                })
              })
            }
          }
        }
      }

      //fs.writeFileSync('./symbolPamp.txt', String(positionCounter))
      positionCounter = 0

      //console.log(new Date().toLocaleTimeString() + ' ---------');

    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresPositionRiskPampSell');
    }
  
    setTimeout(() => {
      futuresPositionRiskPampSell(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs, pnlPlusBuy1, pnlPlusBuy2, pnlPlusBuy3, pnlPlusBuy4, futuresCancelAll)
    }, timeoutFuturesPositionRisk)
  }

  let positionCounter = 0
  let pribl = 0

  const counterProebObj = {}
  const dokupkaCounter = {}
  const dokupkaPrice = {}
  const candlesRed = {}



  async function getCandles(coin, binance) { // получить свечи
    try{
      let data = await binance.futuresCandles(coin, '1m', {limit: 2}) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }

      let oneOpen = Number(data[data.length - 1][1])
      let oneClose = Number(data[data.length - 1][4])
      let twoOpen = Number(data[data.length - 2][1])
      let twoClose = Number(data[data.length - 2][4])
      
      if(((twoOpen - twoClose) >= (twoOpen * 0.0015)) 
      && (((oneOpen - oneClose) >= (oneOpen * 0.0015)) && ((oneOpen - oneClose) < (oneOpen * 0.003)))) {
        return true
      } else {
        return false
      }

    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'getCandles');
    }
    
  }

  