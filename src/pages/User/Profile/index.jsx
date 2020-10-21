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
  const [userInfo, setUserInfo] = useState([
    {
      id:'1',
      username:'Nguyễn T Bích Na',
      iduser:'2320716843',
      cmnd:'206296503',
      birthday:'24/01/1999',
      email:'nguyentbichni@dtu.edu.vn',
      address:'Châu Lâu',
      village:'Điện Thọ',
      town:'Điện Bàn',
      city:'Quảng Nam',
      nation:'Việt Nam'
    }
  ])

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const handleEditProfile = (modifyValue) => {

    setIsEditProfile(false);
  }

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
                              onClick={() => handleEditProfile()}
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
                {
                  isEditProfile ?
                    (
                        <Form
                          {...layout}
                          name="basic"
                          initialValues={{ remember: true }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        >
                          <Form.Item
                            label="Tên người dùng:"
                            name="username"
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label="Mã sinh viên:"
                            name="iduser"
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="CMND:"
                            name="cmnd"
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Ngày sinh:"
                            name="birthday"
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Email:"
                            name="email"
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Địa chỉ/Tổ/Thôn:"
                            name="address"
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Phường/Xã:"
                            name="village"
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Quận/Huyện:"
                            name="town"
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Tỉnh/Thành phố:"
                            name="city"
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Quốc gia:"
                            name="nation"
                          >
                            <Input />
                          </Form.Item>
                        </Form>
                    )
                    :
                    (
                      <>
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
                        <div className="info-user-content">
                          <p>{userInfo[0].username}</p>
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
                      </>
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
