import React from 'react';
import './styles.css'
import Avatar from '../../img/avatar.jpg';
import VietNam from '../../img/vietnam.webp';
import { FaUser, FaBell, FaCaretDown, FaQrcode, FaChartArea, FaQuestionCircle, FaPenSquare, FaCog, FaSignOutAlt } from 'react-icons/fa';
function DefaultLayout2() {
  return (
    <div className="page">
      <div className="container">

        <div class="row">
          <div class="col-xs-2">
            <div className="logo-wrapper">
              <img src="./../../icon.png" className="img-fluid" alt="Responsive image" />
            </div>
            <div className="navbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaUser className="icons" />
                    <span className="link-text">Thông tin cá nhân</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaBell className="icons" />
                    <div className="link-text">Thông báo</div>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaChartArea className="icons" />
                    <span className="link-text">Thống kê</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    < FaQuestionCircle className="icons" />
                    <span className="link-text">Hỗ trợ</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    < FaPenSquare className="icons" />
                    <span className="link-text">Đánh giá</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaCog className="icons" />
                    <span className="link-text">Cài đặt</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaSignOutAlt className="icons" />
                    <span className="link-text">Đăng xuất</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xs-1">
            <div class="vl"></div>
          </div>

          <div class="col-xs-9">
            <div className="header-main">
              <div className="title-header">
                <div className="overview">Overview</div>
                <div className="greeting">Hi Tuong, Welcome back !!!</div>
              </div>

              <ul className="header-list">

                <div className="header-items"><img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={Avatar} alt="Avatar"></img></div>
                <a className="header-items" href="#"><FaBell /></a>
                <a className="header-items" href="#"><FaQrcode /></a>

              </ul>
            </div>
            <div className="status-line">
              <div className="flex-box">
                <div className="name-depart" >Hoa Khanh</div>
                <div className="value" style={{ color: "rgb(173, 87, 87)" }}>200.000 S</div>

              </div>
              <div className="flex-box">
                <div className="name-depart">Nguyen Van Linh</div>
                <div className="value" style={{ color: "rgb(128, 209, 223)" }}>200.000 S</div>

              </div>
              <div className="flex-box">
                <div className="name-depart">Quang Trung</div>
                <div className="value" style={{ color: "rgb(173, 87, 87)" }}>200.000 S</div>

              </div>
              <div className="flex-box">
                <div className="name-depart">Bach Dang</div>
                <div className="value" style={{ color: "rgb(128, 209, 223)" }}> 200.000 S</div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DefaultLayout2;