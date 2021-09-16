const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')

async function priceCoin() { // получение цены всех монет
    data = await binance.futuresPrices() 
    console.info( data );
}

priceCoin()


//----------------------------------------------------

// async function priceCoin(coin, number) { // изменить плечо
//   let data = await binance.futuresLeverage(coin, Number(number)) 
  
//   console.log(data);
// }

// priceCoin('ALGOUSDT', 7)

//----------------------------------------------------

// async function priceCoin() { // Получить все открытые позиции
//   let position_data = await binance.futuresPositionRisk() 
//   let markets = Object.keys( position_data )
//   for ( let market of markets ) {
//     let obj = position_data[market]
//     let size = Number( obj.positionAmt );
//     if ( size == 0 ) continue;
  
//     console.log(obj);
//   }
// }

// priceCoin()

//----------------------------------------------------