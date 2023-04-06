import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { GoalContextProvider } from './context/goalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoalContextProvider>
    <App />
    </GoalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
  
);
