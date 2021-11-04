import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import "./styles.css"
import * as serviceWorker from "./serviceWorkerRegistration";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

console.log("index start");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if ("serviceWorker" in navigator) {
  serviceWorker.register()
}

console.log("index end")