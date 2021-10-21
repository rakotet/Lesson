module.exports = async function futuresMarginType(coin, binance) { // выставление маржы
    try {
      data = await binance.futuresMarginType(coin, 'ISOLATED') 
  
      if(data.code) {
        // console.log(data.code + ' - ' + data.msg);
      }
  
      return 1
  
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'futuressHoulder');
    }
  }