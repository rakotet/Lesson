module.exports = function futuresCancelAll(coin, binance) { // закрыть все открытые ордера по монете (не позиции)
  setTimeout(() => {
    fC(coin, binance)
  }, 180000)
}

async function fC(coin, binance) {
  try {
    let data = await binance.futuresCancelAll(coin) 

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    return 'ok'
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresCancelAll');
  }
}