import React, { useEffect, useState } from 'react';
import { firebaseApp } from './../../../configs/firebase';
import { Parked, Empty, DotLine } from './styles';
import { Row, Col, Card, Select } from 'antd';
function ManageSlot() {
    const [selectPlace, setSelectPlace] = useState(0)
    const [renderPark, setRenderPark] = useState();
    useEffect(() => {
        getAllSlot();

    }, [selectPlace])

    const getAllSlot = async () => {
        await firebaseApp.database().ref('SlotParking').on('value', function (snapshot) {
            let snap = snapshot.val()
           
            //map All Slot Line in the Specific Place
            let getAllSlotLine = Object.keys(snap[selectPlace]).map((item, index) => {
                let slot = snap[selectPlace][item]

                //map Specific Slot Line in the Specific Place
                let getSpecificSlotLine = Object.keys(slot['AreaPark']).map((item1, index1) => {
                    let numParked = slot['AreaPark'][item1];
                    let numDot = [];
                    numDot.push(<h5 style={{ marginRight: "5px" }} key={index1}>{numParked["Name"]}</h5>)

                    //mark for parked slot
                    for (let a = 0; a < numParked['NumParked']; a++)
                        numDot.push(<Parked key={index1 + a}></Parked>)
                    //mark for parked empty
                    for (let b = numParked['NumParked']; b < 15; b++)
                        numDot.push(<Empty key={index1 + b}></Empty>)

                    return <DotLine key={index1}>{numDot}</DotLine>;
                })
                return (
                    <Col key={index} span={12}>
                        <Card title={slot['Name'] + " Facility"} bordered={false}>
                            {getSpecificSlotLine}
                        </Card>
                    </Col>)

            })
            setRenderPark(getAllSlotLine)
        });

    }
    const onSelectPlace = (value) => {
        setSelectPlace(value)
    }
    return (
        <div className="manage-slot">
            <div className="row">
                <div className="col-xs-12">
                    <Select
                        onChange={(value) => onSelectPlace(value)}
                        value={selectPlace}
                        placeholder="Filter Facility"
                        style={{ width: 140 }}
                    >
                        <Select.Option value={0}>Quang Trung</Select.Option>
                        <Select.Option value={1}>Hoa Khanh</Select.Option>
                        <Select.Option value={2}>254 Nguyen Van Linh</Select.Option>
                        <Select.Option value={3}>334 Nguyen Van Linh</Select.Option>
                    </Select>
                    {/* <div className="manage-slot-header">
                        <div className="selector-place">
                            <select onChange={onSelectPlace} value={selectPlace} name="place" id="input-state" style={{ fontSize: "13px" }} className="form-control-statistic">
                                <option value={0}>Quang Trung</option>
                                <option value={1}>Hoa Khanh</option>
                                <option value={2}>254 Nguyen Van Linh</option>
                                <option value={3}>334 Nguyen Van Linh</option>
                            </select>
                        </div>
                    </div> */}
                </div>

                <Row gutter={[16, 16]}>
                    {renderPark}
                </Row>
            </div>
        </div>
    )
}

export default ManageSlot;