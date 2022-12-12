import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import { UIProvider } from './context/ui';
import { AuthProvider } from './context/auth';
import { Data } from './context/state/stateProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <UIProvider>
      <Provider store={store}>
        <Data>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Data>
      </Provider>
    </UIProvider>
  </AuthProvider>
);
