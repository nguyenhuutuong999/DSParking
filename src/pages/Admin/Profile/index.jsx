import React from 'react';
import './styles.css';

import {
  Button,
  Tooltip,
  Tabs,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { FaUser, FaIdCardAlt, FaPortrait, FaBirthdayCake, FaMapMarkerAlt, FaMapMarkedAlt, FaBuilding, FaCity, FaGlobeAsia } from 'react-icons/fa';
function Profile() {
  return (
    <div className="profile">

      <div className="profile-main">
      
        <div className="information">
          <div className="information-content">
            
                <div className="info-user">
                  <div className="info-user-title">
                    <p><FaUser />Tên người dùng:</p>
                    <p><FaIdCardAlt />ID</p>
                    <p><FaPortrait />CMND:</p>
                    <p><FaBirthdayCake />Ngày sinh:</p>
                    <p><FaIdCardAlt />Email: </p>
                    <p><FaMapMarkerAlt />Địa chỉ hiện tại:</p>
                    
                  </div>
                  <div className="info-user-content">
                    <p>Nguyễn Hữu Tường</p>
                    <p>2320716843</p>
                    <p>206296503</p>
                    <p>24/01/1999</p>
                    <p>nguyentbichni@dtu.edu.vn</p>
                    <p>Man Thiện, Hải Châu, Đà Nẵng</p>
                   
                  </div>
                </div>
                <div className="div-btn-edit">
                  <Tooltip title="edit">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} />
                  </Tooltip>
                </div>
             
          </div>
        </div>
      </div>
      {/* <Tooltip title="edit" >
        <Button shape="circle" style={{ backgroundColor: '#8c8c8c' }} icon={<EditOutlined/>} />
      </Tooltip> */}
    </div>
  );
}

export default Profile;
