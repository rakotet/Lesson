const path = require('path'); // стандартная библиотека для путей 
const nodeExternals = require('webpack-node-externals'); // добавляем библиотеку для отключения внутренних зависимостей вебпака для серверной части (что бы уменьшить bundle сервера)
const NODE_ENV = process.env.NODE_ENV; // какой командой запущен процесс в консоле (насколько я понял)

module.exports = { // объект с настройками вебпака
  target: 'node', // это значит что вебпак будет создавать отдельный bundle файл специально для node т.к. это не клиенская часть
  mode: NODE_ENV ? NODE_ENV : 'development', // если webpack запущен без команды то используем команду development
  entry: path.resolve(__dirname, '../src/server/server.js'), // откуда начинаем собирать приложение
  output: {
    path: path.resolve(__dirname, '../dist/server'), // куда сохранять bundle
    filename: 'server.js' // имя bundle
  },
  resolve: { // расширения файлов нашего проэкта которые должен обрабаотывать вебпак
    extensions: ['.js', '.jsx', 'ts', 'tsx', 'json']
  },
  externals: [nodeExternals()], // смотрим описание выше для nodeExternals
  module: { // объект для настройки loaders вебпака, нужны для того что бы вебпак мог использовать и приобразовывать другие типы файлов, который мы тут укажим
    rules: [{
      test: /\.[tj]sx?$/, // регулярное выражение для tsx и jsx расширений файлов
      use: ['ts-loader'] // спомощью этого лоадера обрабатываем расширения файлов указаныне в test
    }],
  }, 
  optimization: { // отключает минимизацию bundle для удобного поиска ошибок
    minimize: false
  }
} 