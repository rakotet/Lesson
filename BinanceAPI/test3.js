
const fs = require('fs')
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'uyaPRnAfTZfAGHnku75rygaAWEFM3THPQzeDCVpsN5sCrGHHD89fQzMENnBvsdsb',
  APISECRET: '1xTGtRmGrfr2OPkIpXD1l6yU6jq8eGifRRBwR9lrJcCm7C9v2QiwTruSKtdqeOf7'
});

async function historyTraide(coin) {
  
  try{
    // let data = await binance.futuresCandles(coin, '1m', {limit: 800}) 
    // //console.log(data);
    // if(data.code) {
    //   console.log(data.code + ' - ' + data.msg);
    // }

    // data = JSON.stringify(data)
    // fs.appendFileSync("coins.txt", data)
    let data = fs.readFileSync("coins.txt", "utf8");
    data = JSON.parse(data)
   
    

    

  } catch(e) {
    //console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'historyTraide');
  }

  
}

historyTraide('CKBUSDT')