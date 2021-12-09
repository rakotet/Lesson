module.exports = async function candlesOpenPamp(binance, opn, priceSymbolPamp, priceSymbolDamp, fs) {
    try {
      let resultFile = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})

      if(Number(resultFile) < 3) { // проверка на количество открытых сделок
        let candlesSymboldata = await binance.futuresPrices() 
    
        if(candlesSymboldata.code) {
          console.log(candlesSymboldata.code + ' - ' + candlesSymboldata.msg);
          throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту - candlesOpenPamp')
        }

        for(let coin in candlesSymboldata) {
          if((candlesSymboldata[coin] < 10) && coin.endsWith('USDT')) {
            getCandles(coin, binance, opn, priceSymbolPamp, priceSymbolDamp)
          }
        }
      }
        
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'candlesOpenPamp');
    }

      //console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

      setTimeout(() => {
        candlesOpenPamp(binance, opn, priceSymbolPamp, priceSymbolDamp, fs)
      }, 15000)
}

async function getCandles(coin, binance, opn, priceSymbolPamp, priceSymbolDamp) { // получить свечи
    try{
      let data = await binance.futuresCandles(coin, '3m', {limit: 5}) 
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

      if(true/*Number(data[data.length - 1][5]) >= (meanVolume * 1)*/) {
        if(openPrice > closePrice) {
          let differenceRed = (((openPrice - closePrice) / closePrice) * 100).toFixed(2)

          if(differenceRed >= 2) {
            if(!timeOpenSymbolDamp[coin]) timeOpenSymbolDamp[coin] = 99
            if(Number(new Date().getMinutes()) !== timeOpenSymbolDamp[coin]) {
              console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Дамп - ' + differenceRed + ' цена - ' + closePrice);
              //opn('https://www.binance.com/ru/futures/' + coin)
              timeOpenSymbolDamp[coin] = Number(new Date().getMinutes())
            }
          }

        } else {
          let differenceGreen = (((closePrice - openPrice) / closePrice) * 100).toFixed(2)

          if(differenceGreen >= 1) {
            if(!timeOpenSymbolPamp[coin]) timeOpenSymbolPamp[coin] = 99
            if(Number(new Date().getMinutes()) !== timeOpenSymbolPamp[coin]) {
              console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Памп + ' + differenceGreen + ' цена - ' + closePrice);
              priceSymbolPamp(coin)
              //opn('https://www.binance.com/ru/futures/' + coin)
              timeOpenSymbolPamp[coin] = Number(new Date().getMinutes())
            }
          }
        }
      }

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
  let coinOpen = {}


  