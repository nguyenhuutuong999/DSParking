import React, {useState, useEffect} from 'react';
import firebase from "./services/firebase";
class App extends React.Component{
  state = {
    students : null
  }
componentDidMount(){
  firebase.database().ref("User/parkingMan/account").orderByChild("id").on("value", function(snapshot){
    console.log(snapshot.val());
    snapshot.forEach(function(data){
      console.log(data.val())
    })
  });
 
}
  render(){
    return( 
      <div className="App">
      
      </div>
    )
  }
}


export default App;
