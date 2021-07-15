import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider }  from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { restoreCSRF, csrfFetch } from './store/csrf';
import configureStore from './store';

const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.store = store;
  window.csrfFetch = csrfFetch;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
