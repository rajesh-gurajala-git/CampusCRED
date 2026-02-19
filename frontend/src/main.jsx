import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { LoanProvider } from './context/LoanContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoanProvider>
          <App />
        </LoanProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
