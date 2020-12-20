import React, { useState } from 'react';
import './styles.css';
import { Radio, Form, Input, Button, DatePicker } from 'antd';
import { FaBookReader, FaUser, FaAddressCard } from 'react-icons/fa';

const { TextArea } = Input;
function Support() {
  function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
  }

  const [supportType, setSupportType] = useState('manual');

  const renderSupport = () => {
    if (supportType === 'manual') {
      return (
        <>
          <div className="support-manual" style={{ padding: '30px 0px' }}>
            <p><span>1. Log in: </span>User uses an existing myDTU account to log into DSParking system.</p>
            <p><span>2. Function to change / get QR Code:</span> In the menu bar, click <FaUser /> ‘Profile’ to get the code (for first use) / change the code (for subsequent uses).</p>
            <p><span>3. Top up / Link bank accounts:</span> To do this you need to go to the ticket counter at the security gate to deposit money into your account.</p>
          </div>
        </>
      )
    }
    else {
      return (
        <>
          <div className="support-report">
            <Form
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 10 }}
              layout="horizontal"
            >
              <Form.Item label="Name of the problem: ">
                <Input />
              </Form.Item>
              <Form.Item label="The period of time it happened: ">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Detailed description: ">
                <TextArea style={{ height: '100px' }} />
              </Form.Item>
              <Button style={{ marginLeft: '750px' }}>Send</Button>
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
          <Radio.Button onClick={() => setSupportType('manual')} value="a">User manual</Radio.Button>
          <Radio.Button onClick={() => setSupportType('report')} value="b">Report problem</Radio.Button>
        </Radio.Group>
      </div>
      <div className="support-main">
        <div className="support-header">
          <p><FaBookReader />User manual<span>DSParking</span></p>
        </div>
        <div className="support-content">
          <div className="support-content-details">
            {renderSupport()}
          </div>
        </div>
        <div className="footer-support">
          <p>Urgent contact:  0905264265 - htsung@duytan.edu.vn (Mr.Sung)   0935009473 - nguyentanphat@duytan.edu.vn (Mr.Phat)</p>
        </div>
      </div>
    </div >
  );
}

export default Support;