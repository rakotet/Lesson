const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});

async function futuresCancelAll(coin) { 
  try {
    let data = await binance.futuresLeverageBracket(coin);

    if(data.code) {
      console.log(data.code + ' - ' + data.msg);
    }

    console.log(data[0])
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'futuresCancelAll');
  }

}

futuresCancelAll('BTCUSDT')