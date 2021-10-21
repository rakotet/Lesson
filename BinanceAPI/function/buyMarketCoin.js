module.exports = async function buyMarketCoin(coin, number, binance) { // купить монетку по рынку
    try {
      let data = await binance.futuresMarketBuy(coin, Number(number)) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
    
      let orderId = data['orderId']
      return orderId
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'buyMarketCoin');
    }
  }