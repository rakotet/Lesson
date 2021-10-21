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
let arrayPrice = {}
let counter = 0
let data
let timeout

const pnlPlus = 0.004
const pnlMinus = 0.003
const percent = 1
const timeoutSearch = 120000

// traideOpenPampBuy(percent, arrayPrice, counter, data, timeout, opn, binance, balanceFiat, futuressHoulder, futuresMarginType, buyMarketCoin, timeoutSearch, timeoutTraideOpenPamp)
// futuresPositionRiskPampSell(counterPosition, binance, sellMarketCoin, statusOrder, pnlPlus, pnlMinus, timeoutFuturesPositionRisk, profitCounter, currentProfitOne)

traideOpenPampSell(percent, arrayPrice, counter, data, timeout, opn, binance, balanceFiat, futuressHoulder, futuresMarginType, sellMarketCoin, timeoutSearch, timeoutTraideOpenPamp)
futuresPositionRiskPampBuy(counterPosition, binance, buyMarketCoin, statusOrder, pnlPlus, pnlMinus, timeoutFuturesPositionRisk, profitCounter, currentProfitOne)