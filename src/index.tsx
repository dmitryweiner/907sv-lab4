import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './components/Store';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    {' '}
    <App />
  </Provider>,
  rootElement
);
