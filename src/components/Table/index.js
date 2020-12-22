import React from 'react';

function Table(props){
    const formatVND = (x) => {
        return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      }
   console.log(props)
    return(
        <tr>
        <th scope="row">{props.index}</th>
        <td>{props.user.id}</td>
        <td>{props.infor.name}</td>
        <td>{props.infor.money?formatVND(parseInt(props.infor.money)):"None"}</td>
        <td>{props.infor.adress}</td>
        <td>{props.infor.birthday}</td>
        <td>
            {
            props.infor.position == "0" ? "Admin":
            props.infor.position == "1" ? "Guard":
            props.infor.position == "2" ? "Teacher":
            props.infor.position == "3" ? "Student":""
        }
        </td>
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