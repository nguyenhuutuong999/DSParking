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

  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 10 },
  };

  return (
    <div className="profile">
      <div className="div-img">

        <div className="div-img-item">
          <div className="div-img-item-details">
            <img src={Avatar3} alt="Avatar"></img>
          </div>
          <div className="div-change-img">
            <p>Thay đổi Avatar</p>
          </div>
        </div>

        <div className="div-img-item">
          <div className="div-img-item-details">
            <img src={Qrcode} alt="Avatar"></img>
          </div>
          <div className="div-change-img">
            <p>Thay đổi QRCode</p>
          </div>
        </div>
      </div>

      <div className="div-information">
        <div className="information-content">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Thông tin cá nhân" key="1">
              <div className="tab-title">
                <p>Thông tin chi tiết</p>
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
              </div>

              <div className="information-content">
              <div className="info-user-title">
                    <p><FaUser />Tên người dùng:</p>
                    <p><FaIdCardAlt />Mã sinh viên:</p>
                    <p><FaPortrait />CMND:</p>
                    <p><FaBirthdayCake />Ngày sinh:</p>
                    <p><FaIdCardAlt />Email: </p>
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
                        <p>Châu Lâu</p>
                        <p>Điện Thọ</p>
                        <p>Điện Bàn</p>
                        <p>Quảng Nam</p>
                        <p>Việt Nam</p>
                      </div>
                    )
                  }
                </div>
            </TabPane>
            <TabPane tab="Lịch sử gửi xe" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
