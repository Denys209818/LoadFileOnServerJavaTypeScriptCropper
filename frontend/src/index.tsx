import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  // Компонет, який підключає redux-сховище
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
