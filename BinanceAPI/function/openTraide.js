module.exports = async function openTraide(fs, binance, balanceFiat, futuressHoulder, futuresMarginType, sellMarketCoin, opn, buyMarketCoin) {
    let coin = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})
    if(!coin == '') {
        openPositionSymbol(binance, coin, fs, balanceFiat, futuressHoulder, futuresMarginType, sellMarketCoin, opn, buyMarketCoin)
    }

    setTimeout(()=> {
        openTraide(fs, binance, balanceFiat, futuressHoulder, futuresMarginType, sellMarketCoin, opn, buyMarketCoin)
    }, 3000)
}

let data
let priceCoin = []
let counterPrice = 0
let counterAttempt = 0

async function openPositionSymbol(binance, coin, fs, balanceFiat, futuressHoulder, futuresMarginType, sellMarketCoin, opn, buyMarketCoin) {
    try {
        data = await binance.futuresPrices({symbol: coin}) 
    
        if(data.code) {
          console.log(data.code + ' - ' + data.msg);
          throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту openPositionSymbol')
        }
      } catch(e) {
        console.log(e);
        console.log(new Date().toLocaleTimeString() + ' - ' + 'openPositionSymbol');
      }

      if(counterPrice === 0) {
        priceCoin[0] = Number(data['price'])
        counterPrice++

      } else if(counterPrice === 1) {
        priceCoin[1] = Number(data['price'])
        counterPrice = 0

        if(priceCoin[0] < priceCoin[1]) {
            let price = priceCoin[1]
            balanceFiat('USDT', binance).then(balance => {
                if(balance > 7) {
                  futuressHoulder(coin, 1, binance).then(data => {
                    futuresMarginType(coin, binance).then(data => {
                      let numberCoinKey = ((balance / price) / 2).toFixed(); // количество монеты в покупку                
                                       
                      buyMarketCoin(coin, numberCoinKey, binance).then(orderId => {
                        if(orderId) {
                            console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' открыли сделку');
                            opn('https://www.binance.com/ru/futures/' + coin)
                            fs.writeFileSync('./symbolPamp.txt', '')
                            counterAttempt = 0
                            priceCoin = []
                        }
                      })
                    })
                  })
                } else {
                    fs.writeFileSync('./symbolPamp.txt', '')
                    priceCoin = []
                    console.log(new Date().toLocaleTimeString() + ' - удалили ' + coin);
                }
              })
            } else {
                if(counterAttempt < 2) {
                    counterAttempt++
                } else {
                    fs.writeFileSync('./symbolPamp.txt', '')
                    priceCoin = []
                    counterAttempt = 0
                    console.log(new Date().toLocaleTimeString() + ' - удалили ' + coin);
                }
            }

        priceCoin = []
      }
      
}