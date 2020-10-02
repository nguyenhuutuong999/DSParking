import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import LayoutLogin from './layouts/Login/LayoutLogin'
import DefaultLayout1 from './layouts/Layout1/LayoutDefault1'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/* <LayoutLogin /> */}
    <DefaultLayout1/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
