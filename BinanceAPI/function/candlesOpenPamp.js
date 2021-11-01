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
      }, 60000)
}

let candlesSymboldata = {}

async function getCandles(coin, binance, opn) { // получить свечи
    try{
      let data = await binance.futuresCandles(coin, '1m', {limit: 60}) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
      
      let volumeCandlesAll = 0

      for(let i = 0; i < data.length - 2; i++) {
        let volume = Number(data[i][5]) // объём 1
        volumeCandlesAll = volumeCandlesAll + volume
      }

      let meanVolume = volumeCandlesAll / (data.length - 2)

      if(Number(data[data.length - 1][5]) > (meanVolume * 35) || Number(data[data.length - 2][5]) > (meanVolume * 35)) {
        opn('https://www.binance.com/ru/futures/' + coin)
        console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - МЕГА ОБЬЁМ');
      }

      let greenRedCandles = 0
      
      for(let i = 2; i < 12; i++) {
        if(Number(data[data.length - i][1]) < Number(data[data.length - i][4])) {
          greenRedCandles++
        } else {
          greenRedCandles--
        }
      }

      if(greenRedCandles === 10) {
        //opn('https://www.binance.com/ru/futures/' + coin)
        console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - 10 ЗЕЛЕНЫХ ПОДРЯТ');
      }

      if((Number(data[data.length - 2][4]) - Number(data[data.length - 6][1])) > 0) {
        if((((Number(data[data.length - 2][4]) - Number(data[data.length - 6][1])) / Number(data[data.length - 2][4])) * 100) >= 3) {
          console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Рост 3% или больше за 5 мин');
          //opn('https://www.binance.com/ru/futures/' + coin)
        }
      }

      if((Number(data[data.length - 2][4]) - Number(data[data.length - 21][1])) > 0) {
        if((((Number(data[data.length - 2][4]) - Number(data[data.length - 21][1])) / Number(data[data.length - 2][4])) * 100) >= 5) {
          console.log(new Date().toLocaleTimeString() + ' - ' + coin + ' - Рост 5% или больше за 20 мин');
          opn('https://www.binance.com/ru/futures/' + coin)
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