const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')

// async function priceCoin() { // получение цены всех монет
//     data = await binance.futuresPrices() 
//     console.info( data );
// }

// priceCoin()


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

// async function buyCoin(coin, number) { // купить монетку по рынку
//     try{
//         let data = await binance.futuresMarketBuy(coin, Number(number)) 
//         if(data.code) {
//           console.log(data.code + ' - ' + data.msg);
//         }
//         console.log(data['orderId']);
//     } catch(e) {
//         console.log(e);
//     }
    
//   }

//   buyCoin('ALICEUSDT', 0.03)

  //----------------------------------------------------

//   async function sellCoin(coin, number) { // продать монетку по рынку
//     let data = await binance.futuresMarketSell(coin, Number(number)) 
//     // if(data.code) {
//     //   console.log(data.code + ' - ' + data.msg);
//     // }
//     console.log(data);
//   }

//   sellCoin('ALICEUSDT', 1)
  //----------------------------------------------------

//   async function statusOrder(coin, id) { // информация по ордеру
//     let data = await binance.futuresOrderStatus(coin, {orderId: id}) 
//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//     }
//     console.log(data);
//   }

//   statusOrder('ALICEUSDT', '1740924338')

//----------------------------------------------------

async function balanceFiat(currency) { // Баланс деняк
    let data = await binance.futuresBalance() 
    try {
        if(data.code) {
            console.log(data.code + ' - ' + data.msg);
        } 
    
        data = data.filter(obj => obj.asset === currency)
        let balance = data[0]['crossWalletBalance']
        return balance
    } catch(e) {
        console.log(e);
    }
      
  }

  balanceFiat('USDT').then(data=>console.log(data))

