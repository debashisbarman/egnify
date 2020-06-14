import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import AppContainer from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
}
