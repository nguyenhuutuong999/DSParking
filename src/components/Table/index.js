import React from 'react';

function Table(props){
    return(
        <tr>
        <th scope="row">{props.index}</th>
        <td>{props.user.id}</td>
        <td>{props.user.position}</td>
        <td>{props.user.fullName}</td>
        <td>{props.user.class}</td>
        <td>{props.user.birthday}</td>
        <td>a</td>
        <td> <button type="button" class="btn btn-success btn-small"><p>Active</p></button></td>
        <th scope="row">
            <div class="dropdown show">
                <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="#">Delete</a>
                    <a class="dropdown-item" href="#">Edit</a>
                </div>
            </div>
        </th>

    </tr>
    )
}
export default Table;