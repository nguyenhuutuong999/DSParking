import React from 'react';
import './styles.css';

function Evaluation() {
    return (
        <div className="manage">

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="header-manage">
                        <div className="title">Manage Account</div>
                        <form class=" right form-inline d-flex justify-content-center md-form form-sm">
                            <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
                                aria-label="Search" />
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </form>
                    </div>

                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Class</th>
                                <th scope="col">Birthday</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                            </tr>

                        </thead>
                        <tbody>
                            
                            <tr>
                                <th scope="row">1</th>
                                <td>2321144726</td>
                                <td>nguyenhuutuong999</td>
                                <td>Nguyen Huu Tuong</td>
                                <td>K23CMU-TTT</td>
                                <td>24/05/1999</td>
                                <td>Student</td>
                                <td>
                                <button type="button" class="btn btn-success">Enable</button>
                                </td>

                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>2321144726</td>
                                <td>nguyenhuutuong999</td>
                                <td>Nguyen Huu Tuong</td>
                                <td>K23CMU-TTT</td>
                                <td>24/05/1999</td>
                                <td>Student</td>
                                <td>
                                <button type="button" class="btn btn-danger">Disable</button>
                                </td>

                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>2321144726</td>
                                <td>nguyenhuutuong999</td>
                                <td>Nguyen Huu Tuong</td>
                                <td>K23CMU-TTT</td>
                                <td>24/05/1999</td>
                                <td>Student</td>
                                <td> <button type="button" class="btn btn-success">Enable</button></td>

                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>2321144726</td>
                                <td>nguyenhuutuong999</td>
                                <td>Nguyen Huu Tuong</td>
                                <td>K23CMU-TTT</td>
                                <td>24/05/1999</td>
                                <td>Student</td>
                                <td> <button type="button" class="btn btn-danger">Disable</button></td>

                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>2321144726</td>
                                <td>nguyenhuutuong999</td>
                                <td>Nguyen Huu Tuong</td>
                                <td>K23CMU-TTT</td>
                                <td>24/05/1999</td>
                                <td>Student</td>
                                <td> <button type="button" class="btn btn-danger">Disable</button></td>

                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>2321144726</td>
                                <td>nguyenhuutuong999</td>
                                <td>Nguyen Huu Tuong</td>
                                <td>K23CMU-TTT</td>
                                <td>24/05/1999</td>
                                <td>Student</td>
                                <td> <button type="button" class="btn btn-danger">Disable</button></td>

                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>2321144726</td>
                                <td>nguyenhuutuong999</td>
                                <td>Nguyen Huu Tuong</td>
                                <td>K23CMU-TTT</td>
                                <td>24/05/1999</td>
                                <td>Student</td>
                                <td> <button type="button" class="btn btn-success">Enable</button></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    )
}
export default Evaluation;