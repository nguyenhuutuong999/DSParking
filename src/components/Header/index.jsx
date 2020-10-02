import React from 'react';
import './styles.css';

import {FaCaretDown, FaQrcode, FaBell} from 'react-icons/fa';
import Avatar from '../../img/avatar.jpg'
import VietNam from '../../img/vietnam.webp'

function Header() {
  return (
    <div className="header">
      <ul className="header-list">
          <div className="header-items"><img style={{width:'45px', height:'30px'}} src={VietNam} alt="Avatar"></img></div>
          <div className="header-items"><img style={{width:'30px', height:'30px', borderRadius:'50%'}} src={Avatar} alt="Avatar"></img></div>
          <a className="header-items" href="#"><FaBell/></a>
          <a className="header-items" href="#"><FaQrcode/></a>
          <a className="header-items" href="#"><FaCaretDown/></a>
      </ul>  
    </div>
  );
}

export default Header;