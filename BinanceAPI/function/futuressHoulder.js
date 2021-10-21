module.exports = async function futuressHoulder(coin, houlder, binance) { // выставление плеча
    try {
      data = await binance.futuresLeverage(coin, houlder) 
  
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
  
      return data['leverage']
  
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'futuressHoulder');
    }
  }