module.exports = async function statusOrder(coin, id, binance) { // информация по ордеру
    try {
      let data = await binance.futuresOrderStatus(coin, {orderId: id}) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
  
      let avgPrice = data['avgPrice']
      return Number(avgPrice)
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'statusOrder');
    }
  }