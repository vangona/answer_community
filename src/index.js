import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import "styles/styles.css"
import * as serviceWorker from "utils/serviceWorkerRegistration";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

Sentry.init({
  dsn: "https://fcd371c95b264c58b9ada1ed4d63c6e9@o1065943.ingest.sentry.io/6058254",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if ("serviceWorker" in navigator) {
  serviceWorker.register()
}
