module.exports = async function candlesOpenPamp(binance, opn) {
    try {
  
        candlesSymboldata = await binance.futuresPrices() 
    
        if(candlesSymboldata.code) {
          console.log(candlesSymboldata.code + ' - ' + candlesSymboldata.msg);
          throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - candlesOpenPamp')
        }
      } catch(e) {
        console.log(e);
        console.log(new Date().toLocaleTimeString() + ' - ' + 'candlesOpenPamp');
      }

      for(let coin in candlesSymboldata) {
        getCandles(coin, binance, opn)
      }

      //console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

      setTimeout(() => {
        candlesOpenPamp(binance, opn)
      }, 15000)
}

let candlesSymboldata = {}

async function getCandles(coin, binance, opn) { // получить свечи
    try{
      let data = await binance.futuresCandles(coin, '1m', {limit: 10}) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
      
      let volumeCandlesAll = 0

      for(let i = 0; i < data.length - 2; i++) {
        let volume = Number(data[i][5]) // объём 1
        volumeCandlesAll = volumeCandlesAll + volume
      }

      let meanVolume = volumeCandlesAll / (data.length - 2)

      let openPrice = Number(data[data.length - 1][1])
      let closePrice = Number(data[data.length - 1][4])

      if(Number(data[data.length - 1][5]) > (meanVolume * 3) /*|| Number(data[data.length - 2][5]) > (meanVolume * 10)*/) {
        if((closePrice < 10) && coin.endsWith('USDT')) {
          if(openPrice > closePrice) {
            let differenceRed = (((openPrice - closePrice) / closePrice) * 100).toFixed(2)

            if(differenceRed >= 0.6) {
              if(!timeOpenSymbolDamp[coin]) timeOpenSymbolDamp[coin] = 99
              if(Number(new Date().getMinutes()) !== timeOpenSymbolDamp[coin]) {
                console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Дамп - ' + differenceRed + ' цена - ' + closePrice);
                opn('https://www.binance.com/ru/futures/' + coin)
                timeOpenSymbolDamp[coin] = Number(new Date().getMinutes())
              }
            }

          } else {
            let differenceGreen = (((closePrice - openPrice) / closePrice) * 100).toFixed(2)

            if(differenceGreen >= 0.6) {
              if(!timeOpenSymbolPamp[coin]) timeOpenSymbolPamp[coin] = 99
              if(Number(new Date().getMinutes()) !== timeOpenSymbolPamp[coin]) {
                console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп + ' + differenceGreen + ' цена - ' + closePrice);
                opn('https://www.binance.com/ru/futures/' + coin)
                timeOpenSymbolPamp[coin] = Number(new Date().getMinutes())
              }
            }
          }
        }
      }

      // if((Number(data[data.length - 1][1]) < Number(data[data.length - 1][4])) 
      // && (Number(data[data.length - 2][1]) > Number(data[data.length - 2][4]))
      // && (Number(data[data.length - 3][1]) > Number(data[data.length - 3][4]))
      // && (Number(data[data.length - 4][1]) > Number(data[data.length - 4][4]))) 
      // {
      //   opn('https://www.binance.com/ru/futures/' + coin)
      //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Три красных 1h 1 зеленых');
      // }

      // let greenRedCandles = 0
      
      // for(let i = 2; i < 12; i++) {
      //   if(Number(data[data.length - i][1]) < Number(data[data.length - i][4])) {
      //     greenRedCandles++
      //   } else {
      //     greenRedCandles--
      //   }
      // }

      // if(greenRedCandles >= 3) {
      //   //opn('https://www.binance.com/ru/futures/' + coin)
      //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - ' + greenRedCandles + ' ЗЕЛЕНЫХ ПОДРЯТ');
      // }

      // if((Number(data[data.length - 2][4]) - Number(data[data.length - 6][1])) > 0) {
      //   if((((Number(data[data.length - 2][4]) - Number(data[data.length - 6][1])) / Number(data[data.length - 2][4])) * 100) >= 3) {
      //     console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Рост 3% или больше за 5 мин');
      //     opn('https://www.binance.com/ru/futures/' + coin)
      //   }
      // }

      // if((Number(data[data.length - 2][4]) - Number(data[data.length - 21][1])) > 0) {
      //   if((((Number(data[data.length - 2][4]) - Number(data[data.length - 21][1])) / Number(data[data.length - 2][4])) * 100) >= 5) {
      //     console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Рост 5% или больше за 20 мин');
      //     opn('https://www.binance.com/ru/futures/' + coin)
      //   }
      // }

    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'getCandles');
    }
    
  }
  
  function getDate(date) { // время свечи
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${new Date().getSeconds()}`
  }

  let timeOpenSymbolDamp = {}
  let timeOpenSymbolPamp = {}