import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import Table from "./../../../components/Table/index"
import * as actions from "./../../../redux/actions/index";
import { firebaseApp } from './../../../configs/firebase';
function Manage() {
    // const dispatch = useDispatch();
    // const users = useSelector(state => state.manageAccount.users)
    // const loading = useSelector(state => state.manageAccount.loading)
    // const error = useSelector(state => state.manageAccount.error)
    const [users, setUsers] = useState([])
    useEffect(() => {
        // dispatch(actions.getUserAccount())
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
    }
    
    let index = 0;
    const mapUser = users.map((user) => {
        return <Table user={user} key={user.id} index = {index++}/>
    })

    return (
        <div className="manage">

            <div class="row">
                <div class="col-xs-12">
                    <div className="header-manage">

                        <form class=" right form-inline d-flex justify-content-center md-form form-sm">
                            <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
                                aria-label="Search" />
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </form>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                User
  </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#" value="1">Motorbike Owner</a>
                                <a class="dropdown-item" href="#" value="2">Guard</a>
                                <a class="dropdown-item" href="#" value="3">Place</a>
                            </div>
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
                            {mapUser}

                        </tbody>
                    </table>


                </div>
            </div>



        </div>
    )
}
export default Manage;