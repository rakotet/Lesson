module.exports = async function traideOpenPampBuy(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, symbolPamp, max, fs) { 
    try {
  
      data = await binance.futuresPrices() 
  
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
        throw new Error(new Date().toLocaleTimeString() + ' - ' + 'Моя собственная ошибка, сервер не ответил по таймауту')
      }
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'traide');
      data = await binance.futuresPrices() 
    }
  
    if(counter === 0) {
      for(let key in data) {
        arrayPrice[key] = [Number(data[key])]
        
      }
      counter++
      timeout = timeoutSearch
      
    } else if(counter === 1) {
      for(let key in data) {
        arrayPrice[key][1] = Number(data[key])
        
      }
      counter = 0
      timeout = timeoutTraideOpenPamp
      
      for(let key in arrayPrice) {
        if((arrayPrice[key][0] - arrayPrice[key][1]) < 0) {
          let difference = arrayPrice[key][0] - arrayPrice[key][1]
          difference = difference * (-1)
  
          if(((difference / arrayPrice[key][1]) * 100) >= percent) {
            console.log(new Date().toLocaleTimeString() + ' - ' + key + ' Текущая цена: ' + arrayPrice[key][1] + ' - Памп - ' +  ((difference / arrayPrice[key][1]) * 100));

            if((arrayPrice[key][1] < 11) && key.endsWith('USDT')) {
                symbolPamp[key] = (difference / arrayPrice[key][1]) * 100
            }
          }
        }    
      }

      let counterObjLength = 0

      for(key in symbolPamp) {
          counterObjLength++
      }
      
      if(counterObjLength >= 2) {
        let keys = Object.keys(symbolPamp)
        max = keys.reduce(function (a, b) {
            return +symbolPamp[a] > +symbolPamp[b] ? a : b;
        });

        let result = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})
        if(result == '') {
          fs.writeFileSync('./symbolPamp.txt', max)
        }

      } else if(counterObjLength === 1) {
        for(key in symbolPamp) {
            max = key
        }

        let result = fs.readFileSync('./symbolPamp.txt', {encoding: 'utf-8'})
        if(result == '') {
          fs.writeFileSync('./symbolPamp.txt', max)
        }
      }
      
      symbolPamp = {}

      console.log(new Date().toLocaleTimeString() + ' --------------------------------------------------------------------------');
    }
  
    
  
    setTimeout(() => {
      traideOpenPampBuy(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, symbolPamp, max, fs)
    }, timeout)
  }
  