import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import { setupStore } from './redux/store';
import App from './App';

const store = setupStore({});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
