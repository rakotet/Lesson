import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';
import App from './components/App/App';
import store from './components/store/store'
import {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals';


//window.location.href = 'https://sso.eurochem.ru/login?return_to=http%3A//logistics.sibgenco.ru'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
