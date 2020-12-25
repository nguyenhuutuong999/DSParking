import React, { useState } from 'react';
import { useEffect } from 'react';
import './styles.css';
import Table from "./../../../components/Table/index"
import { firebaseApp } from './../../../configs/firebase';
function Manage() {
   
    const [users, setUsers] = useState([])
    const [inforUsers, setInforUsers] = useState([])
    const [selectPlace, setSelectPlace] = useState(-1);
    const [keyword, setKeyword] = useState("a");
    useEffect(() => {
        
        getUser()

    }, [])

    async function getUser() {
        let arr = [];
        const snap = await firebaseApp.database().ref("User/account").once('value')
        const snapshotValue = snap.val();

        for (let obj in snapshotValue) {
            Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }
        setUsers(arr)

        let arrInfor = [];
        const snapInfor = await firebaseApp.database().ref("User/information").once('value')
        const snapshotValueInfor = snapInfor.val();

        for (let obj in snapshotValueInfor) {
            Array.prototype.push.apply(arrInfor, [snapshotValueInfor[obj]]);
            
        }
        setInforUsers(arrInfor)
        
    }
    
    function onSelector(event) {
        setSelectPlace(event.target.value);
    }
    function onChangeKeyWord(event){
        setKeyword(event.target.value)
      }

    let filters = users.filter((item) => {
        if(selectPlace == -1){
        return users;
        }else
        return item.position+"" === selectPlace
    })
        
    const mapUser = () =>{
        let index = 0;
        return filters.map((user) => {
            return inforUsers.map((item) =>{
                for (let obj in item) { 
                   if(user.id === obj){
                      
                       if(item[obj].name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
                    return <Table user={user} key={user.id} index={index++} infor = {item[obj]}/>
                   }
                } 
            })
           
        })
    }
   
    
     
    return (
        <div className="manage">

            <div class="row">
                <div class="col-xs-12">
                    <div className="header-manage">

                        <form class=" right form-inline d-flex justify-content-center md-form form-sm">
                            <input value ={keyword}
                                onChange = {onChangeKeyWord} 
                                class="form-control form-control-sm mr-3 w-75" 
                                type="text" 
                                placeholder="Search"
                                aria-label="Search" />
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </form>

                        <div class="selector-actor">
                            <select onChange={onSelector} value={selectPlace} name="place" id="input-state" style={{ fontSize: "13px" }} className="form-control-statistic">
                                <option value={-1}>Filter</option>
                                <option value={0}>GuardBOT</option>
                                <option value={3}>Motorbike Owner</option>
                                <option value={1}>Guard</option>
                                <option value={2}>Teacher</option>
                                <option value={4}>Admin</option>
                                <option value={5}>Place</option>

                            </select>
                        </div>
                        <button className="btn btn-mybutton">Add Account</button>
                    </div>

                </div>

                <div class="col-xs-12 ">

                    <table className="table">
                        <thead className="thead">
                            <tr>

                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Class</th>
                                <th scope="col">Birthday</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>

                        </thead>
                        <tbody>
                            {mapUser()}

                        </tbody>
                    </table>


                </div>
            </div>



        </div>
    )
}
export default Manage;