import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Theme from './Theme';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import router from './route/router';
import App from './App';
import { ContextProvider } from './contexts/contextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ThemeProvider theme={Theme}>
    <ContextProvider>
    <RouterProvider router={router}/>
  </ContextProvider>
  </ThemeProvider>
    
);
