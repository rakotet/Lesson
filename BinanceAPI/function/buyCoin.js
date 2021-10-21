module.exports = async function buyCoin(coin, number, price, binance) { // купить монетку лимит
    try {
      let data = await binance.futuresBuy(coin, Number(number), Number(price)) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
    
      // let orderId = data['orderId']
      return Number(data['orderId'])
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'buyCoin');
    }
  }