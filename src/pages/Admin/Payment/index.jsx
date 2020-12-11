import React, { useEffect } from 'react';
import { useState } from 'react';
import './styles.css';
import { connect } from "react-redux";
import * as actions from "./../../../redux/actions/index";

function Payment(props) {

  const [inforPayment, setInforPayment] = useState({
    id: "",
    price: 0,
  })
  const [getAPI, setAPI] = useState("aaa")

 const onHandleChange = (event) =>{
    var target = event.target;
    var name = target.name;
    var value = target.value;

    setInforPayment({...inforPayment, [name]:value})

  } 
   const callAPI = () =>{
    fetch("http://localhost:3001/")
    .then(res => res.text())
    .then(res => setAPI(res))
  }

  useEffect(() => {
    callAPI()
  }, [])
  const onSubmit = async (e) =>{
    e.preventDefault();
    try {
      let result = await fetch('http://localhost:3001/payment/paymentMoMo', {
        method:'post',
        mode: 'no-cors',
        headers:{
          "Accept":'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(inforPayment)
      });

      console.log(result)
    } catch (error) {
      console.log(error);
    }
    //props.getInforPaymentRequest(inforPayment)
  }
  return (
    <div className="profile">
      <h1>{getAPI}</h1>
     <div class="container">
       <form onSubmit={onSubmit}>
         <div class="form-group row">
           <label for="inputName" class="col-sm-1-12 col-form-label"></label>
           <div class="col-sm-1-12">
             <input type="text" class="form-control" value={inforPayment.id} name="id" onChange={onHandleChange} placeholder="Name"/>
           </div>
         </div>
         <div class="form-group row">
           <label for="inputName" class="col-sm-1-12 col-form-label"></label>
           <div class="col-sm-1-12">
             <input type="number" class="form-control" value={inforPayment.price} name="price" onChange={onHandleChange} placeholder="Price"/>
           </div>
         </div>
         <div class="form-group row">
           <div class="offset-sm-2 col-sm-10">
             <button type="submit" class="btn btn-primary">Action</button>
           </div>
         </div>
       </form>
     </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
  
  } 
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getInforPaymentRequest: (infor) => {
      dispatch(actions.getInforPayment(infor));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);

