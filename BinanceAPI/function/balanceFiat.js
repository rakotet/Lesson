module.exports = async function balanceFiat(currency, binance) { // Баланс деняк
    try { 
      let data = await binance.futuresBalance() 
  
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      } 
        data = data.filter(obj => obj.asset === currency)
        let balance = Number(data[0]['crossWalletBalance'])
        return balance
  
    } catch(e) {
      console.log(e);
      console.log(new Date().toLocaleTimeString() + ' - ' + 'balanceFiat');
    }
  }