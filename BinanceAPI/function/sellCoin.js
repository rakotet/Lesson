module.exports = async function sellCoin(coin, number, price, binance) { // продать монетку лимит
    try {
      let data = await binance.futuresSell(coin, Number(number), Number(price)) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
    
      // let orderId = data['orderId']
      return Number(data['price'])
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'sellCoin');
    }
  }