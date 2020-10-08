import React from 'react';


function Account() {
    return(
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
    )
}
export default Account;