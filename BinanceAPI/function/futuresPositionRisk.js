module.exports = async function futuresPositionRisk(coin, binance) { 
  try {
    let data = await binance.futuresPositionRisk({symbol: coin}) 
    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }
  
    return Number(data[0]['entryPrice'])
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresPositionRisk');
  }
}