import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { axios, HelmetProvider } from './utils/import.js';
import { StoreProvider } from './utils/Store';

axios.defaults.baseURL = import.meta.env.DEV
  ? 'http://localhost:8080'
  : import.meta.env.VITE_PLATFORM === 'vercel'
  ? ''
  : 'https://elisamazonapi.netlify.app/.netlify/functions';
console.log(import.meta.env.DEV);
console.log(import.meta.env.VITE_PLATFORM);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
