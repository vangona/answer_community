import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import "./styles.css"
import * as serviceWorker from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
