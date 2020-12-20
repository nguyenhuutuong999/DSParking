import React from 'react';
import './styles.css';
import {firebaseApp} from './../../../configs/firebase';

import { FaUser, FaIdCardAlt, FaPortrait, FaBirthdayCake, FaMapMarkerAlt} from 'react-icons/fa';
import { useEffect } from 'react';
import { useState } from 'react';
function Profile() {

 const[userInfor,setUserInfor] = useState({});
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    firebaseApp.database().ref("User/information/admin/"+user.id)
    .on('value', (snapshot) => {
      setUserInfor(snapshot.val());
      
    })
  }, [])

  return (
    <div className="profile-admin">

      <div className="profile-main">
      
        <div className="information">
          <div className="information-content">
            
                <div className="info-user">
                  <div className="info-user-title">
                    <p><FaUser />Name:</p> 
                    
                    <p><FaPortrait />ID:</p>
                    <p><FaBirthdayCake />Day of Birth:</p>
                    <p><FaIdCardAlt />Phone:</p>

                    <p><FaIdCardAlt />Email: </p>
                    <p><FaMapMarkerAlt />Address:</p>
                    
                  </div>
                  <div className="info-user-content">
                    <p>{userInfor.name}</p>
                    <p>{userInfor.idA}</p>
                    <p>{userInfor.birthday}</p>
                    <p>{userInfor.phone}</p>
                    <p>{userInfor.email}</p>
                    <p>{userInfor.address}</p>
                   
                  </div>
                </div>
             
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Profile;
