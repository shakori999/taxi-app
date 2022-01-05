import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/lumen/bootstrap.css';
import axios from 'axios';
import { HashRouter } from 'react-router-dom'; // new
import './index.css';
import App from './App';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

ReactDOM.render( // changed
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);