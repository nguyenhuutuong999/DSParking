import React from 'react';
import './styles.css'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

function DefaultLayout1() {
  return (
    <div className="page">
      <Header/>
      <Sidebar/>
    </div>
  );
}

export default DefaultLayout1;