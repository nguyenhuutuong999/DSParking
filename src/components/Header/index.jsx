import React from 'react';
import './styles.css';

import {FaQrcode, FaBell } from 'react-icons/fa';
import Avatar from '../../img/avatar.jpg'


function Header() {
  return (
    <div className="header-main">
      <div className="title-header">
        <div className="overview">Hi, Tuong !!!</div>
        {/* <div className="greeting">K23CMU - TTT !!!</div> */}
      </div>

      <ul className="header-list">
        <div className="header-items"><img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={Avatar} alt="Avatar"></img></div>
        <a className="header-items" href="#a"><FaBell /></a>
       
      </ul>
    </div>
  );
}

export default Header;