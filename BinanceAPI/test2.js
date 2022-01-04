// const delay = ms => new Promise(res => setTimeout(res, ms));

// async function ff() {
//   for(let i = 0; i < 5; i++) {
//     console.log(i);
//     await delay(5000)
//   }
// }

// ff()


const balanceFiat = require('./function/balanceFiat')
const numberOfSigns = require('./function/numberOfSigns')
//const plate = require('./function/plate')
//let fapi = 'https://www.binance.com/futures/';
let fapi = 'https://www.binance.com/bapi/nft/v1/friendly/nft/mystery-box/';
let fapi2 = 'https://www.binance.com/bapi/nft/v1/private/nft/mystery-box/purchase';
const delay = ms => new Promise(res => setTimeout(res, ms));
const opn = require('opn')
const fs = require('fs')

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});

async function stopShort() { 
  try {
    for(let i = 1; i > 0; i++) {
      let data = await binance.promiseRequest( 'detail?productId=171911173293009920&number=1', false, { base:fapi, type:'TRADE', method:'GET' } ) 
      if(data.code) {
        console.log(data.code + ' - ' + data.msg);
      }
      fs.appendFileSync('symbolPamp.txt', data['data']['currentStore'] + ' - ' + new Date().toLocaleTimeString() + '-' + (new Date()).getMilliseconds() + '\n' 
      + data['data']['totalStore'] + ' - ' + new Date().toLocaleTimeString() + '-' + (new Date()).getMilliseconds() + '\n')
    }
    console.log(data);
    
  } catch(e) {
    console.log(e);
    console.log(new Date().toLocaleTimeString() + ' - ' + 'stopShort');
  }
}

stopShort()


// let mm = 1640818800000
// console.log((new Date(mm)).getHours() + ':' + (new Date(mm)).getMinutes() + ':' + (new Date(mm)).getSeconds())

// for(let i = 0; i < 1000; i++) {
//   stopShort()
//   //delay(5000)
// }

// async function stopShort11111() { 
//   try {
//     let data = await binance.promiseRequest( 'purchase', false, { base:fapi2, type:'TRADE', method:'GET' } ) 
//     if(data.code) {
//       console.log(data.code + ' - ' + data.msg);
//     }
  
//     console.log(data);
//   } catch(e) {
//     console.log(e);
//     console.log(new Date().toLocaleTimeString() + ' - ' + 'stopShort');
//   }
// }

// stopShort11111()