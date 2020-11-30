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

  const [userData, setUserData] = useState({});
  const authData = JSON.parse(localStorage.getItem('authData'));

  const [editProfileForm] = Form.useForm();
  const [checkInHistory, setCheckInHistory] = useState([]);

  useEffect(() => {
    firebaseApp.database().ref(`/users/${authData.uid}`).on('value', (snapshot) => {
      setUserData({ ...snapshot.val() });
    })
  }, [])


  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const handleChangeQRCode = () => {
    firebaseApp.database().ref(`/users/${authData.uid}`).update({
      qrPin: Math.random().toString().substr(2, 4),
    })
  }

  const handleSubmitForm = () => {
    const profileValue = editProfileForm.getFieldsValue();
    firebaseApp.database().ref(`/users/${authData.uid}`).update({
      name: profileValue.name,
      email: profileValue.email,
      studentCode: profileValue.studentCode,
      identityCard: profileValue.identityCard,
      ...profileValue.birthday && { birthday: profileValue.birthday },
      ...profileValue.address && { address: profileValue.address },
      ...profileValue.ward && { ward: profileValue.ward },
      ...profileValue.district && { district: profileValue.district },
      ...profileValue.city && { city: profileValue.city },
      ...profileValue.country && { country: profileValue.country },
    })
    setIsEditProfile(false)
  }

  return (
    <div className="profile">
      <div className="div-information">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin cá nhân" key="1">
            <div className="information-content">
              <div className="user-img">
                <div className="div-avatar">
                  <div className="div-avatar-content">
                    <div className="avatar-content-detail">
                      <div className="avatar-edit">
                        <div className="avatar-edit-btn"><Button><EditOutlined /></Button></div>
                      </div>
                      <img src={authData.avatar ? authData.avatar : AvatarDefault} alt="Avatar" />
                    </div>
                  </div>
                  <p>{userData.name}</p>
                </div>
              </div>

              <div className="user-information">
                <div className="tab-title"></div>

                <div className="information-content">
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
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
