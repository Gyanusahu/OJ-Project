import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {Toaster} from 'react-hot-toast'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Toaster/>
    <App />
    </BrowserRouter>
);
