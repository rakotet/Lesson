import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

// Что бы Router заработал, оборачиваем в BrowserRouter наш главный компанент приложения 

const application = (
  <BrowserRouter> 
    <App />
  </BrowserRouter>
)


ReactDOM.render(application, document.getElementById('root'));
registerServiceWorker();
