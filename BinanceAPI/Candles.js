const balanceFiat = require('./function/balanceFiat')
const buyCoin = require('./function/buyCoin')
const sellCoin = require('./function/sellCoin')
const futuressHoulder = require('./function/futuressHoulder')
const futuresMarginType = require('./function/futuresMarginType')
const statusOrder = require('./function/statusOrder')
const sellMarketCoin = require('./function/sellMarketCoin')
const buyMarketCoin = require('./function/buyMarketCoin')
const futuresPositionRisk = require('./function/futuresPositionRisk')
const numberOfSigns = require('./function/numberOfSigns')
const futuresPrices = require('./function/futuresPrices')

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'yTrguRvjlECCZg4haqpPkM2byGn0sojZS5UT4F2KHoy3Vzf0nxWvATrgoSEFbaX5',
  APISECRET: 'WfTYhUO7LcLTCorB1vWe1YSDOUvj9jNetKnxUpLHH1bjUVbGQITJUaoxhmuMqw0I'
});
const fs = require('fs')
const opn = require('opn')


const profitCounter = {}
const currentProfitOne = {}
let counterPosition = 0

const percent = 0.7
let arrayPrice = {}
let counter = 0
let data
let timeout


futuresPrices(percent, arrayPrice, counter, data, timeout, opn, binance, balanceFiat, futuressHoulder, futuresMarginType, sellMarketCoin)
futuresPositionRisk(counterPosition, binance, buyMarketCoin, statusOrder)





