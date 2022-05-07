let http = require('request')

const idBot = '5302452238:AAEmImsTrmLxdkZxDrQoPL4l1DzBnqhhdZg'
const idChatPlot = '-1001506995531'
const idChatManipul = '-1001196361965'
let coin = 'BTCUSDT'
let msg = '121221' + '\n' + '<a href="www.binance.com/ru/futures/' + coin + '"' + '>Ссылка на инструмент ' + coin + '</a>'


  function sendTelega(msg) {
    msg = encodeURI(msg)

    http.post(`https://api.telegram.org/bot${idBot}/sendMessage?chat_id=${idChatManipul}&parse_mode=html&text=${msg}&disable_web_page_preview=True`, function (error, response, body) {  
        if(error) {
          console.log('error:', error); 
        }
        
        if(response.statusCode!==200){
          console.log(new Date().toLocaleTimeString() + ' - ' + 'Произошла ошибка при отправке сообщения в телеграм');
          console.log(response.statusCode);
        }
      });
  }

  sendTelega(msg)