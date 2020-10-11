import React , {useState} from 'react';
import './styles.css';

import { Radio, Form, Input, Button, Select, DatePicker } from 'antd';
import { FaBookReader, FaUser, FaAddressCard } from 'react-icons/fa';
const { TextArea } = Input;
function Support() {
  function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
  }

  const [supportType, setSupportType] = useState('manual');
  
  const renderSupport = () => {
    if(supportType === 'manual') {
      return(
        <>
          <div className="support-manual">
              <p><span>1. Đăng nhập: </span>Người dùng sử dụng tài khoản myDTU đã có sẵn để đăng nhập vào hệ thống DSParking.</p>
              <p><span>2. Chức năng thay đổi/ lấy mã QR Code:</span> Ở thanh menu, click vào <FaUser /> ‘Thông tin cá nhân’ để lấy mã ( đối với lần sử dụng đầu tiên) / thay đổi mã (đối với những lần sử dụng sau đó).</p>
              <p><span>3. Nạp thẻ / Liên kết tài khoản Ngân hàng:</span> Để thực hiện chức năng này bạn cần click vào  <FaAddressCard /> ‘ Tài khoản DSPay’.</p>
              <p>Nếu bạn chọn phương thức thanh toán bằng cách nạp thẻ: click vào nút Nạp thẻ, sau        đó một textbox sẽ hiện ra, bạn cần điền đầy đủ thoong tin có trong textbox và nhấn OK.</p>
              <p>Nếu bạn chọn phương thức thanh toán bằng cách liên kêt với tài khoản Ngân hàng (đã có sẵn): click vào nút Liên kết, sau đó sẽ được chuyển đến mọt trang mới, bạn cần điền tất cả thông tin được yêu cầu cung cấp. Sau đó nhấn OK và đợi trong vài giây để thực hiện thao tác liên kết.</p>
          </div>
        </>
      )
    }
    else {
      return(
        <>
        <div className="support-report">
              <Form
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 10 }}
                layout="horizontal"
              >
                <Form.Item label="Tên sự cố: ">
                  <Input />
                </Form.Item>
                <Form.Item label="Khoảng thời gian xảy ra: "> 
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Mô tả chi tiết: ">
                  <TextArea style={{ height: '100px' }} />
                </Form.Item>
                <Button style={{ marginLeft: '550px' }}>Gửi</Button>
              </Form>
            </div>
        </>
      )
    }
  }
  return (
    <div className="support">
      <div className="radio-group">
        <Radio.Group onChange={onChange} defaultValue="a">
          <Radio.Button onClick= {() =>  setSupportType('manual')} value="a">Hướng dẫn sử dụng</Radio.Button>
          <Radio.Button onClick= {() =>  setSupportType('report')} value="b">Báo cáo sự cố</Radio.Button>
        </Radio.Group>
      </div>
      <div className="support-main">
        <div className="support-header">
          <p><FaBookReader />HƯỚNG DẪN SỬ DỤNG<span>DSParking</span></p>
        </div>
        <div className="support-content">
          <div className="support-content-details">
            {renderSupport()}
          </div>
        </div>
        <div className="footer-support">
          <p>Liên hệ khẩn cấp:  0905264265 - htsung@duytan.edu.vn (T.Sung)   0935009473 - nguyentanphat@duytan.edu.vn (T.Phát)</p>
        </div>
      </div>
    </div >
  );
}

export default Support;