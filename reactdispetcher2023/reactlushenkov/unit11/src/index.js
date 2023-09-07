import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers/index'
import initialState from './store/initialState'

const store = createStore(rootReducer, initialState) // создаём хранилище с начальными данными и редусерами

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* // все вложенные в него компаненты получат доступ к данынм store */}
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
