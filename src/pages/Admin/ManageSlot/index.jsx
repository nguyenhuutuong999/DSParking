import React, { useEffect, useState } from 'react';
import { firebaseApp } from './../../../configs/firebase';
import { Section, Container, Header, Body, ImagePark, Park, Parked, Empty, DotLine } from './styles';

function ManageSlot() {
    const [allSlot, setAllSlot] = useState({});
    const [allSlotCurrentPlace, setAllSlotCurrentPlace] = useState({});
    const [selectPlace, setSelectPlace] = useState(0)
    const [renderPark, setRenderPark] = useState();
    useEffect(() => {
        getAllSlot();
       
       
       
    }, [selectPlace])

    const getAllSlot = async () => {
        const snap = await firebaseApp.database().ref('SlotParking').on('value', function(snapshot){
            setAllSlot(snapshot.val())
            console.log("hghjghj")
        });
        
    }
    const onSelectPlace = (event) => {
        setSelectPlace(event.target.value)
        setAllSlotCurrentPlace(allSlot[event.target.value])

        //map All Slot Line in the Specific Place
        let a = Object.keys(allSlot[event.target.value]).map((item, index) => {
            let slot = allSlot[event.target.value][item]['AreaPark']

            //map Specific Slot Line in the Specific Place
            let b = Object.keys(slot).map((item1, index1) => {
                let numParked = slot[item1]['NumParked'];
                let numDot = [];

                //mark for parked slot
                for (let a = 0; a < numParked; a++)
                    numDot.push(<Parked key = {index1+a}></Parked>)
                //mark for parked empty
                for (let b = numParked; b < 15; b++)
                    numDot.push(<Empty key = {index1+b}></Empty>)

                return <DotLine key = {index1}>{numDot}</DotLine>;
            })
            return (<Section key = {index}>
                <Header></Header>
                <Body>
                    <ImagePark></ImagePark>
                    <Park>
                        {b}
                    </Park>
                </Body>
            </Section>)

        })
        setRenderPark(a)
    }
    return (
        <div className="manage-slot">
            <div className="row">
                <div className="col-xs-12">
                    <div className="manage-slot-header">
                        <div className="selector-place">
                            <select onChange={onSelectPlace} value={selectPlace} name="place" id="input-state" style={{ fontSize: "13px" }} className="form-control-statistic">
                                <option value={0}>Quang Trung</option>
                                <option value={1}>Hoa Khanh</option>
                                <option value={2}>254 Nguyen Van Linh</option>
                                <option value={3}>334 Nguyen Van Linh</option>
                            </select>
                        </div>
                    </div>
                </div>

                <Container >
                    {renderPark}
                </Container>
            </div>
        </div>
    )
}

export default ManageSlot;