import React, { useEffect, useState } from "react";
import { firebaseApp } from "./../../../configs/firebase";
import { Parked, Empty, DotLine } from "./styles";
import { Row, Col, Card, Select } from "antd";

import { Text } from '../../../components/styles';

function ManageSlot() {
  const [selectPlace, setSelectPlace] = useState(0);
  const [renderPark, setRenderPark] = useState();
  useEffect(() => {
    getAllSlot();
  }, [selectPlace]);

  const getAllSlot = async () => {
    await firebaseApp
      .database()
      .ref("SlotParking")
      .on("value", function (snapshot) {
        let snap = snapshot.val();

        //map All Slot Line in the Specific Place
        let getAllSlotLine = Object.keys(snap[selectPlace]).map(
          (item, index) => {
            let slot = snap[selectPlace][item];

            //map Specific Slot Line in the Specific Place
            let getSpecificSlotLine = Object.keys(slot["AreaPark"]).map(
              (item1, index1) => {
                let numParked = slot["AreaPark"][item1];
                let numDot = [];
                numDot.push(
                  <Text xxxl w6 style={{ marginRight: 4, minWidth: 32 }} key={index1}>
                    {numParked["Name"]}
                  </Text>
                );

                //mark for parked slot
                for (let a = 0; a < numParked["NumParked"]; a++)
                  numDot.push(<Parked key={index1 + a}></Parked>);
                //mark for parked empty
                for (let b = numParked["NumParked"]; b < 15; b++)
                  numDot.push(<Empty key={index1 + b}></Empty>);

                return <DotLine key={index1}>{numDot}</DotLine>;
              }
            );
            return (
              <Col key={index} span={12}>
                <Card size="small" title={slot["Name"] + " Facility"} bordered={false}>
                  {getSpecificSlotLine}
                </Card>
              </Col>
            );
          }
        );
        setRenderPark(getAllSlotLine);
      });
  };
  const onSelectPlace = (value) => {
    setSelectPlace(value);
  };
  return (
    <div className="manage-slot">
      <Select
        onChange={(value) => onSelectPlace(value)}
        value={selectPlace}
        placeholder="Filter Facility"
        style={{ marginBottom: 16, width: 140 }}
      >
        <Select.Option value={0}>Quang Trung</Select.Option>
        <Select.Option value={1}>Hoa Khanh</Select.Option>
        <Select.Option value={2}>254 Nguyen Van Linh</Select.Option>
        <Select.Option value={3}>334 Nguyen Van Linh</Select.Option>
      </Select>

      <Row gutter={[16, 16]}>{renderPark}</Row>
    </div>
  );
}

export default ManageSlot;
