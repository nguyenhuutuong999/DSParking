import React from 'react';
import './styles.css';

import { Radio, Button, Input } from 'antd';
import { FaPenSquare } from 'react-icons/fa';

function Evaluation() {
    // function onChange(e) {
    //     console.log(`radio checked:${e.target.value}`);
    // }
    // const onChangeRadio = (e) => {
    //     this.setState({
    //         value: e.target.value,
    //     });
    // };

    return (
        <div className="evaluation">
            <div className="evaluation-main">
                <div className="evaluation-header">
                    <p><FaPenSquare /><span>DSParking </span> System Evaluation</p>
                </div>
                <div className="evaluation-content">
                    <div className="evaluation-content-details">
                        <div className="evaluation-system-introduce">
                            <span style={{ fontWeight: '600' }}>FEEDBACK OF USER ON THE SYSTEM</span>
                            <p style={{ color: '#d48806' }}>In order to improve the quality more and better, we want you to evaluate the system, and if you have any comments, please fill out and rate according to the form below:</p>
                        </div>
                        <div className="evaluation-system">
                            <div className="evaluation-system-items">
                                <div className="evaluation-title">QRCode scanning speed when come in / come out the port: </div>
                                <div className="evaluation-level">
                                    <Radio.Group>
                                        <Radio value={1}>Poor</Radio>
                                        <Radio value={2}>Average</Radio>
                                        <Radio value={3}>Good</Radio>
                                        <Radio value={4}>Very good</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="evaluation-system-items">
                                <div className="evaluation-title">Web response speed of DSParking: </div>
                                <div className="evaluation-level">
                                    <Radio.Group>
                                        <Radio value={1}>Poor</Radio>
                                        <Radio value={2}>Average</Radio>
                                        <Radio value={3}>Good</Radio>
                                        <Radio value={4}>Very good</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="evaluation-system-items">
                                <div className="evaluation-title">The response speed of the DSParking app: </div>
                                <div className="evaluation-level">
                                    <Radio.Group>
                                        <Radio value={1}>Poor</Radio>
                                        <Radio value={2}>Average</Radio>
                                        <Radio value={3}>Good</Radio>
                                        <Radio value={4}>Very good</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="evaluation-system-items">
                                <div className="evaluation-title">User-friendly web interface: </div>
                                <div className="evaluation-level">
                                    <Radio.Group>
                                        <Radio value={1}>Poor</Radio>
                                        <Radio value={2}>Average</Radio>
                                        <Radio value={3}>Good</Radio>
                                        <Radio value={4}>Very good</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="evaluation-system-items">
                                <div className="evaluation-title">User-friendly app interface: </div>
                                <div className="evaluation-level">
                                    <Radio.Group>
                                        <Radio value={1}>Poor</Radio>
                                        <Radio value={2}>Average</Radio>
                                        <Radio value={3}>Good</Radio>
                                        <Radio value={4}>Very good</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="evaluation-system-items">
                                <span style={{ width: '35%', padding: '10px 0px' }}>Your comments:</span>
                                <Input placeholder="Comments:" bordered={false} />
                            </div>
                        </div>
                        <Button>Send</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Evaluation;