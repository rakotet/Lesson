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

      console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');

      setTimeout(() => {
        candlesOpenPamp(binance, opn)
      }, 300000)
}

let candlesSymboldata = {}

async function getCandles(coin, binance, opn) { // получить свечи
    try{
      let data = await binance.futuresCandles(coin, '1h', {limit: 12}) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
      
      let volumeCandlesAll = 0

      for(let i = 0; i < data.length - 2; i++) {
        let volume = Number(data[i][5]) // объём 1
        volumeCandlesAll = volumeCandlesAll + volume
      }

      let meanVolume = volumeCandlesAll / (data.length - 2)

      if(Number(data[data.length - 1][5]) > (meanVolume * 5) /*|| Number(data[data.length - 2][5]) > (meanVolume * 10)*/) {
        opn('https://www.binance.com/ru/futures/' + coin)
        console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - МЕГА ОБЬЁМ в 5 раз больше среднего');
      }

      // if((Number(data[data.length - 1][1]) < Number(data[data.length - 1][4])) 
      // && (Number(data[data.length - 2][1]) < Number(data[data.length - 2][4]))
      // && (Number(data[data.length - 3][1]) < Number(data[data.length - 3][4]))
      // && (Number(data[data.length - 4][1]) > Number(data[data.length - 4][4])) 
      // && (Number(data[data.length - 5][1]) > Number(data[data.length - 5][4]))) 
      // {
      //   opn('https://www.binance.com/ru/futures/' + coin)
      //   console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Три красных 1h 2 зеленых');
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