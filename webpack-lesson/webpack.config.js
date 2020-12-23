const path = require('path') // подключием модуль nojs для работы с путями папок и файлов
const HTMLPlugin = require('html-webpack-plugin') // подключаем модуль(плагин) webpack для создания html страниц
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключаем плагин для работы с css файлами в отдельном файле
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // подключаем плагин для оптимизации css файлов
const TerserPlugin = require("terser-webpack-plugin") // подключаем плагин для оптимизации js файлов


module.exports = { // экспортируем модуль наружу
    //mode: 'production', // указываем мод для вебпака (production - это собрать проэкт и оптимизировать его, убрать лишние пробелы и т.д. , development - это мод для изучения исходного кода и разработки)
    entry: './src/index.js', // точка входа в программу
    output: { // точка выхода, передаётся в виде объекта
        filename: 'bundle.js', // название файла в который будет идти сборка
        path: path.resolve(__dirname, 'dist') // путь конечного файла, 1 путь до текущего файла, 2 название папки для конечного файла
    },
    optimization: { // подключаем свойства плагина для оптимизации css и js файлов
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new TerserPlugin()
        ]
    },
    devServer: { // настройка devServer
        contentBase: path.resolve(__dirname, 'dist'), // конечная папка проэкта
        port: 4200 // на этом порту будет запущен наш локальный сервер
    },
    plugins: [ // инициализируем плагины в вебпаке (просто создаём экземпляр класса плагина который хотим подключить и передаём в его конструктор свойства в виде объекта)
        new HTMLPlugin({
            filename: 'index.html', // имя файла который сгенерирует webpack в папку dist
            template: './src/index.html' // указываем шаблон html файла который будет взят за основу нашего проэкта
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css' // выходной файл css
        })
    ],
    resolve: { // сдесь мы указываем разрешение файлов которые мы можем не прописывать когда указываем import
        extensions: ['.js', '.ts']
    },
    module: { // подключаем css-loader и mini-css-extract-plugin и less-loader (свойства и их описание смотреть на офф сайте)
        rules: [
            {
                test: /\.css$/, // регулярное выражение которым мы определяем расширение файла (в нашем случае .css)
                use: [MiniCssExtractPlugin.loader, 'css-loader'] // чем обрабатывать, 1 приминять наши файлы css к проэкту, 2 загружать css файлы
            },
            {
                test: /\.less$/, // регулярное выражение которым мы определяем расширение файла (в нашем случае .less)
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] // чем обрабатывать, 1 приминять наши файлы css к проэкту, 2 и 3 загружать less и css файлы
            },
            {
                test: /\.scss$/, //Подключаем scss
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
            },
            {
                test: /\.(js|ts)$/, // установка свойств для babel
                exclude: /node_modules/,
                loader: "babel-loader"
              }
        ]
    }
}