module.exports = async function sellMarketCoin(coin, number, binance, flag = 0) { // продать монетку по рынку
    try {
      let data = await binance.futuresMarketSell(coin, Number(number)) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
    
      let orderId = data['orderId']
      return [orderId, flag]
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'sellCoin');
    }
  }