import React, { useState, useEffect } from 'react';
import './styles.css';
import QRCode from 'qrcode.react';

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

import {
  firebaseApp,
} from '../../../configs/firebase';

import AvatarDefault from '../../../img/avatardefault.jpg'

const { TabPane } = Tabs;
function Profile() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

  const [userData, setUserData] = useState({});
  console.log("Profile -> userData", userData)

  const authData = JSON.parse(localStorage.getItem('authData'));

  const [editProfileForm] = Form.useForm();

  useEffect(() => {
    firebaseApp.database().ref(`/users/${authData.uid}`).on('value', (snapshot) => {
      setUserData({ ...snapshot.val() });
    })
  }, [])


  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const handleSubmitForm = (e) => {
    console.log('editProfileForm', editProfileForm.getFieldsValue());
  }

  return (
    <div className="profile">
      <div className="div-img">

        <div className="div-img-item">
          <div className="div-img-item-details">
            <img src={authData.avatar ? authData.avatar : AvatarDefault} alt="Avatar"/>
          </div>
          <div className="div-change-img">
            <p>Thay đổi Avatar</p>
          </div>
        </div>

        <div className="div-img-item">
          <div className="div-img-item-details">
            <QRCode value={`${authData.uid}${authData.qrPin}`} size={160} className="img-profile-qrcode"/>
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
                              htmlType="button"
                              type="primary"
                              shape="circle"
                              icon={<SaveOutlined />}
                              onClick={() => handleSubmitForm()}
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
                          form={editProfileForm}
                          name="basic"
                          initialValues={userData}
                        >
                          <Form.Item
                            label="Tên người dùng:"
                            name="name"
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label="Mã sinh viên:"
                            name="studentCode"
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
                            <Input name="email" />
                          </Form.Item>
                          <Form.Item
                            label="Địa chỉ/Tổ/Thôn:"
                            name="address"
                          >
                            <Input name="address" />
                          </Form.Item>
                          <Form.Item
                            label="Phường/Xã:"
                            name="village"
                          >
                            <Input name="village" />
                          </Form.Item>
                          <Form.Item
                            label="Quận/Huyện:"
                            name="town"
                          >
                            <Input name="town" />
                          </Form.Item>
                          <Form.Item
                            label="Tỉnh/Thành phố:"
                            name="city"
                          >
                            <Input name="city" />
                          </Form.Item>
                          <Form.Item
                            label="Quốc gia:"
                            name="nation"
                          >
                            <Input name="nation" />
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
                          <p>{userData.name}</p>
                          <p>{userData.studentCode}</p>
                          <p>206296503</p>
                          <p>24/01/1999</p>
                          <p>{userData.email}</p>
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
