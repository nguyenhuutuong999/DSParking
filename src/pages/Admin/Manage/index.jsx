import React  from 'react';
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
                    <p><FaPenSquare />ĐÁNH GIÁ HỆ THỐNG<span>DSParking</span></p>
                </div>
                <div className="evaluation-content">
                    <div className="evaluation-content-details">
                        <div className="evaluation-system-introduce">
                            <span>Ý KIẾN PHẢN HỒI CỦA NGƯỜI DÙNG VỀ HỆ THỐNG</span>
                            <p>Nhằm cải thiện chất lượng ngày càng tốt hơn, chúng tôi mong muốn bạn đánh giá về hệ thống, và các ý kiến góp ý nếu có, các bạn vui lòng điền và đánh giá theo biểu mẫu dưới đây:</p>
                        </div>
                        <div className="evaluation-system">
                            <div className="evaluation-system-items">
                                <div className="evaluation-title">Tốc độ quét QRCode khi ra/vào cổng: </div>
                                <div className="evaluation-level">
                                    <Radio.Group>
                                        <Radio value={1}>Kém</Radio>
                                        <Radio value={2}>Trung bình</Radio>
                                        <Radio value={3}>Tốt</Radio>
                                        <Radio value={4}>Rất tốt</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="evaluation-system-items">
                                <div className="evaluation-title">Tốc độ phản hồi của web DSParking: </div>
                                <div className="evaluation-level">
                                    <Radio.Group>
                                        <Radio value={1}>Kém</Radio>
                                        <Radio value={2}>Trung bình</Radio>
                                        <Radio value={3}>Tốt</Radio>
                                        <Radio value={4}>Rất tốt</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="evaluation-system-items">
                                <div className="evaluation-title">Tốc độ phản hồi của app DSParking : </div>
                                <div className="evaluation-level">
                                    <Radio.Group>
                                        <Radio value={1}>Kém</Radio>
                                        <Radio value={2}>Trung bình</Radio>
                                        <Radio value={3}>Tốt</Radio>
                                        <Radio value={4}>Rất tốt</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="evaluation-system-items">
                                <div className="evaluation-title">Giao diện web thân thiện với người dùng : </div>
                                <div className="evaluation-level">
                                    <Radio.Group>
                                        <Radio value={1}>Kém</Radio>
                                        <Radio value={2}>Trung bình</Radio>
                                        <Radio value={3}>Tốt</Radio>
                                        <Radio value={4}>Rất tốt</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="evaluation-system-items">
                                <div className="evaluation-title">Giao diện app thân thiện với người dùng : </div>
                                <div className="evaluation-level">
                                    <Radio.Group>
                                        <Radio value={1}>Kém</Radio>
                                        <Radio value={2}>Trung bình</Radio>
                                        <Radio value={3}>Tốt</Radio>
                                        <Radio value={4}>Rất tốt</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="evaluation-system-items">
                                <span style={{width:'35%', padding:'10px 0px'}}>Ý kiến đóng góp của bạn:</span>
                                <Input placeholder="Ý kiến của bạn:" bordered={false} />
                            </div>
                        </div>
                        <Button style={{ marginLeft: '700px', marginTop:'10px', backgroundColor:'brown', color:'white' }}>Gửi</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Evaluation;