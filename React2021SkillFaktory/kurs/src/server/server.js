import express from 'express';
import * as ReactDOM from 'react-dom/server';
import { Header } from '../shared/Header';
import { indexTemplate } from './indexTemplate';

const app = express(); // app теперь главный объект нашего приложиния для работы с сервером express

app.use('/static', express.static('./dist/client'));

app.get('/', (req, res) => { // обрабатывает get запросы на корневом уровне (главная страница) req пришедший запрос, res наш ответ от сервера
  res.send(
    indexTemplate(ReactDOM.renderToString(Header())) // рендерим наше приложение React на сервере и отправляем разметку в качестве ответа
  );
});

app.listen(3000, () => { // настройка сервера, 1 арг какой порт, 2 арг  
  console.log('Server started on http://localhost:3000');
});