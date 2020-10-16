import React, { useState } from 'react';
import './styles.css';

import {
  Button,
  Form,
  Input,
  DatePicker,
  Tooltip,
  Tabs,
  Space
} from 'antd';
import { EditOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { FaUser, FaIdCardAlt, FaPortrait, FaBirthdayCake, FaMapMarkerAlt, FaMapMarkedAlt, FaBuilding, FaCity, FaGlobeAsia } from 'react-icons/fa';


import Avatar3 from '../../../img/avatar3.jpg'
import Qrcode from '../../../img/qrcode.png'


const { TabPane } = Tabs;
function Profile() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  return (
    <div className="profile">

      <div className="profile-main">
        <div className="div-img">
          <div className="div-img-item">
            <div><img style={{ width: '160px', height: '160px' }} src={Avatar3} alt="Avatar"></img></div>
            <div className="div-change-img"><p>Thay đổi avatar</p></div>
          </div>
          <div className="div-img-item">
            <div><img style={{ width: '160px', height: '160px' }} src={Qrcode} alt="Avatar"></img></div>
            <div className="div-change-img"><p>Thay đổi QRCode</p></div>
          </div>
        </div>

        <div className="information">
          <div className="information-content">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Thông tin người dùng" key="1">
                <div className="info-user">
                  <div className="info-user-title">
                    <p><FaUser />Tên người dùng:</p>
                    <p><FaIdCardAlt />Mã sinh viên:</p>
                    <p><FaPortrait />CMND:</p>
                    <p><FaBirthdayCake />Ngày sinh:</p>
                    <p><FaIdCardAlt />Email: </p>
                  </div>
                  {isEditProfile
                    ? (
                      <div className="info-user-content">
                        <Input placeholder="Nguyễn T Bích Ni" />
                        <Input placeholder="2320716843" />
                        <Input placeholder="206296503" />
                        <Input placeholder="24/01/1999" />
                        <Input placeholder="nguyentbichni@dtu.edu.vn" />
                      </div>
                    )
                    : (
                      <div className="info-user-content">
                        <p>Nguyễn T Bích Ni</p>
                        <p>2320716843</p>
                        <p>206296503</p>
                        <p>24/01/1999</p>
                        <p>nguyentbichni@dtu.edu.vn</p>
                      </div>
                    )
                  }
                </div>
                <div className="div-btn-edit">
                  {isEditProfile
                    ? (
                      <>
                        <Space>
                          <Tooltip title="save">
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<SaveOutlined />}
                              onClick={() => setIsEditProfile(false)}
                            />
                          </Tooltip>
                          <Tooltip title="cancel">
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<CloseCircleOutlined />}
                              onClick={() => setIsEditProfile(false)}
                            />
                          </Tooltip>
                        </Space>
                      </>
                    )
                    : (
                      <div className="div-btn-edit">
                        <Tooltip title="edit">
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => setIsEditProfile(true)}
                          />
                        </Tooltip>
                      </div>
                    )
                  }
                </div>
              </TabPane>
              <TabPane tab="Địa chỉ hiện thời" key="2">
                <div className="info-user">
                  <div className="info-user-title">
                    <p><FaMapMarkerAlt />Địa chỉ/Tổ/Thôn:</p>
                    <p><FaMapMarkedAlt />Phường/Xã:</p>
                    <p><FaBuilding />Quận/Huyện:</p>
                    <p><FaCity />Tỉnh/Thành phố:</p>
                    <p><FaGlobeAsia />Quốc gia: </p>
                  </div>
                  {isEditProfile
                    ? (
                      <div className="info-user-content">
                        <Input placeholder="Nguyễn T Bích Ni" />
                        <Input placeholder="2320716843" />
                        <Input placeholder="206296503" />
                        <Input placeholder="24/01/1999" />
                        <Input placeholder="nguyentbichni@dtu.edu.vn" />
                      </div>
                    )
                    : (
                      <div className="info-user-content">
                        <p>Châu Lâu</p>
                        <p>Điện Thọ</p>
                        <p>Điện Bàn</p>
                        <p>Quảng Nam</p>
                        <p>Việt Nam</p>
                      </div>
                    )
                  }
                </div>
                <div className="div-btn-edit">
                  {isEditProfile
                    ? (
                      <>
                        <Space>
                          <Tooltip title="save">
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<SaveOutlined />}
                              onClick={() => setIsEditProfile(false)}
                            />
                          </Tooltip>
                          <Tooltip title="cancel">
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<CloseCircleOutlined />}
                              onClick={() => setIsEditProfile(false)}
                            />
                          </Tooltip>
                        </Space>
                      </>
                    )
                    : (
                      <div className="div-btn-edit">
                        <Tooltip title="edit">
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => setIsEditProfile(true)}
                          />
                        </Tooltip>
                      </div>
                    )
                  }
                </div>

              </TabPane>
            </Tabs>
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
