const rp = require('request-promise') // подключаем модуль

module.exports = async function(city = '') { // Экспортируем метод "наружу" через глобальный объект module, что бы его можно было использовать в других наших файлах
    if(!city) {
        throw new Error('Имя города не может быть пустым')
    }

    const KEY = '3f78232419ad1fdf9dd20770167bc16f' // ключь API с сайта дающего погоду
    const uri = 'http://api.openweathermap.org/data/2.5/weather' // URL куда отправлять запрос (с сайта дающего погоду)

    const options = { // объект конфигурации для нашего запроса (свойства данного объекта описанны в описании пакета request-promise на сайте https://www.npmjs.com/package/request-promise)
        uri, // равносильно uri: uri т.к. в пакете request-promise как раз uri
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    }

    try {
        const data = await rp(options) // ожидание асинхронного запроса и запись результата в переменную response
        const celsius = (data.main.temp - 32) * 5/9 // переводим Кельвины в градусы Цельсия

        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch(error) {
        
        return {
            weather: null,
            error: error.error.message
        }
    }
    
}   