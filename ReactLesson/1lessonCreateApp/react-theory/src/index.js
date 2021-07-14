import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App title={'I am from Props!'}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
