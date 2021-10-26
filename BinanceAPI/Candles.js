const balanceFiat = require('./function/balanceFiat')
const buyCoin = require('./function/buyCoin')
const sellCoin = require('./function/sellCoin')
const futuressHoulder = require('./function/futuressHoulder')
const futuresMarginType = require('./function/futuresMarginType')
const statusOrder = require('./function/statusOrder')
const sellMarketCoin = require('./function/sellMarketCoin')
const buyMarketCoin = require('./function/buyMarketCoin')
const futuresPositionRiskPampSell = require('./function/futuresPositionRiskPampSell')
const futuresPositionRiskPampBuy = require('./function/futuresPositionRiskPampBuy')
const numberOfSigns = require('./function/numberOfSigns')
const traideOpenPampBuy = require('./function/traideOpenPampBuy')
const traideOpenPampSell = require('./function/traideOpenPampSell')
const traideOpenSymbol = require('./function/traideOpenSymbol')
const openTraide = require('./function/openTraide')
const candlesOpenPamp = require('./function/candlesOpenPamp')

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')
const opn = require('opn')

const profitCounter = {}
const currentProfitOne = {}
const timeoutFuturesPositionRisk = 1000
const timeoutTraideOpenPamp = 1000
let counterPosition = 0
let arrayPrice = {} // объект цен из которых расщитывается памп
let symbolPamp = {} // объект с памп монетами и % их пампа
let counter = 0
let data
let timeout
let max = ''

const pnlPlusSell = 0.003 // Long (+ это +)
const pnlMinusSell = 0.003

const pnlPlusBuy = 0.005 // Short (всё наоборот + это -)
const pnlMinusBuy = 0.002

const wrapping = 0.002 // + или - к цене входа лимитного ордера
const percent = 0.5
const timeoutSearch = 120000

// setInterval(() => {
//   if((new Date().getSeconds()) === 2) {
//     candlesOpenPamp(binance, opn)
//   }
//   //candlesOpenPamp(binance, opn)
// }, 1000)

traideOpenSymbol(percent, arrayPrice, counter, data, timeout, binance, timeoutSearch, timeoutTraideOpenPamp, symbolPamp, max, fs, opn, sellMarketCoin, buyMarketCoin, futuressHoulder, futuresMarginType)
// openTraide(fs, binance, balanceFiat, futuressHoulder, futuresMarginType, sellMarketCoin, opn, buyMarketCoin)

//traideOpenPampBuy(percent, arrayPrice, counter, data, timeout, opn, binance, balanceFiat, futuressHoulder, futuresMarginType, buyMarketCoin, timeoutSearch, timeoutTraideOpenPamp, buyCoin, numberOfSigns, wrapping, sellMarketCoin, sellCoin)
futuresPositionRiskPampSell(counterPosition, binance, sellMarketCoin, buyMarketCoin, statusOrder, pnlPlusSell, pnlMinusSell, pnlPlusBuy, pnlMinusBuy, timeoutFuturesPositionRisk, profitCounter, currentProfitOne, fs)