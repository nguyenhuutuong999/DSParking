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
  Space,
  List,
} from 'antd';
import { EditOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { FaUser, FaIdCardAlt, FaPortrait, FaBirthdayCake, FaMapMarkerAlt, FaMapMarkedAlt, FaBuilding, FaCity, FaGlobeAsia } from 'react-icons/fa';

import { WEEKDAY_FORMAT, CHECKIN_FORMAT } from '../../../constants/common';

import moment from 'moment';
import {
  firebaseApp,
} from '../../../configs/firebase';

import AvatarDefault from '../../../img/avatardefault.jpg'

const { TabPane } = Tabs;
function Profile() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

  const [userData, setUserData] = useState({});
  const authData = JSON.parse(localStorage.getItem('authData'));

  const [editProfileForm] = Form.useForm();
  const [checkInHistory, setCheckInHistory] = useState([]);

  useEffect(() => {
    firebaseApp.database().ref(`/users/${authData.uid}`).on('value', (snapshot) => {
      setUserData({ ...snapshot.val() });
    })

    firebaseApp.database().ref(`/users/${authData.uid}/parkingHistory`).on('value', (snapshot) => {
      let snapshotHistoryValue = snapshot.val();
      let newCheckInHistory = [];
      for (let checkInId in snapshotHistoryValue) {
        if (newCheckInHistory.length <= 3) {
          newCheckInHistory = [
            {
              id: checkInId, 
              type: CHECKIN_FORMAT[snapshotHistoryValue[checkInId].type],
              date: moment(snapshotHistoryValue[checkInId].dateTime, 'YYYYMMDDHHmm').format('DD/MM/YYYY'),
              timeIn: moment(snapshotHistoryValue[checkInId].dateTime, 'YYYYMMDDHHmm').format('HH:mm'),
              place: 'null',
            },
            ...newCheckInHistory,
          ]
        }
      }
      setCheckInHistory([...newCheckInHistory]);
    })
  }, [])


  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const handleSubmitForm = () => {
    const profileValue = editProfileForm.getFieldsValue();
    firebaseApp.database().ref(`/users/${authData.uid}`).update({
      name: profileValue.name,
      email: profileValue.email,
      studentCode: profileValue.studentCode,
      identityCard: profileValue.identityCard,
      ...profileValue.birthday && { birthday: profileValue.birthday },
      ...profileValue.address && { address: profileValue.birthday },
      ...profileValue.ward && { ward: profileValue.birthday },
      ...profileValue.district && { district: profileValue.district} ,
      ...profileValue.city && { city: profileValue.city},
      ...profileValue.country && { country: profileValue.country},
    })
    setIsEditProfile(false)
  }

  const renderHistoryList = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={checkInHistory}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.id}
              description={item.type}
            />
            <div>
              <p>{item.timeIn}</p>
              <p>{item.date}</p>
            </div>
          </List.Item>
        )}
      />
    )
  }

  return (
    <div className="profile">
      <div className="div-img">

        <div className="div-img-item">
          <div className="div-img-item-details">
            <img src={authData.avatar ? authData.avatar : AvatarDefault} alt="Avatar" />
          </div>
          <div className="div-change-img">
            <p>Thay đổi Avatar</p>
          </div>
        </div>

        <div className="div-img-item">
          <div className="div-img-item-details">
            <QRCode value={`${authData.uid}${authData.qrPin}`} size={160} className="img-profile-qrcode" />
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
                              type="danger"
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
                          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="Mã sinh viên:"
                          name="studentCode"
                          rules={[{ required: true, message: 'Vui lòng nhập Mã số Sinh Viên!' }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="CMND:"
                          name="identityCard"
                          rules={[{ required: true, message: 'Vui lòng nhập số CMND!' }]}
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
                          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ Email !' }]}
                        >
                          <Input name="email" disabled />
                        </Form.Item>
                        <Form.Item
                          label="Địa chỉ/Tổ/Thôn:"
                          name="address"
                        >
                          <Input name="address" />
                        </Form.Item>
                        <Form.Item
                          label="Phường/Xã:"
                          name="ward"
                        >
                          <Input name="ward" />
                        </Form.Item>
                        <Form.Item
                          label="Quận/Huyện:"
                          name="district"
                        >
                          <Input name="district" />
                        </Form.Item>
                        <Form.Item
                          label="Tỉnh/Thành phố:"
                          name="city"
                        >
                          <Input name="city" />
                        </Form.Item>
                        <Form.Item
                          label="Quốc gia:"
                          name="country"
                        >
                          <Input name="country" />
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
                          <p>{userData.name ? userData.name : '-'}</p>
                          <p>{userData.studentCode ? userData.studentCode : '-'}</p>
                          <p>{userData.identityCard ? userData.identityCard : '-'}</p>
                          <p>{userData.birthday ? userData.birthday : '-'}</p>
                          <p>{userData.email ? userData.email : '-'}</p>
                          <p>{userData.address ? userData.address : '-'}</p>
                          <p>{userData.ward ? userData.ward : '-'}</p>
                          <p>{userData.district ? userData.district : '-'}</p>
                          <p>{userData.city ? userData.city : '-'}</p>
                          <p>{userData.country ? userData.country : '-'}</p>
                        </div>
                      </>
                    )
                }
              </div>
            </TabPane>
            <TabPane tab="Lịch sử gửi xe" key="2">
                {renderHistoryList()}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
