import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import "./styles.css"
import * as serviceWorker from "./serviceWorkerRegistration";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register()