import * as types from "./../constants/index";
import firebase from "./../../services/firebase";
import history from "./../../util/history";

var user = JSON.parse(localStorage.getItem("user"));

const initialState = user || {}
  /*? user
  : {
      user: "",
      pass: "",
      mess: 5,
    };*/
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      var getUser = firebase
        .database()
        .ref("User/parkingMan/account/" + action.account.user);
      getUser.on(
        "value",
        function (snapshot) {
          //Xử lý
          //Nếu có dữ liệu
          console.log(snapshot.val());
          if (snapshot.val() !== null) {
            var obj = snapshot.val();
            if (obj.pwd === action.account.pass)
              console.log("Đăng nhập chính xác");
            else {
              console.log("fail pass");
              state =   {
                ...state,
                user: 'đ',
                mess: true,
              };
              
             
            }  
          }else {
            console.log("check2");
            state = {
              user: "",
              pass: "",
              mess: true,
            };
          }  
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
          
        }
      );
      // var inforAccount = "";
      // var result = 0;
      // // đợit chút
      // const myfunc = async (action) => {
      //   let a = await firebase
      //     .database()
      //     .ref("User/parkingMan/account")
      //     .orderByChild("id")
      //     .equalTo(action.account.user)
      //     .on("value", function (snapshot) {
      //       inforAccount = snapshot.val().std1.position;
      //       snapshot.forEach(async function (data) {
      //         if (
      //           data.val().pwd === parseInt(action.account.pass) &&
      //           data.val().id === action.account.user
      //         ) {

      //           result++;
      //           console.log("check");
      //         }
      //       });
      //     });
      //   };
      //   myfunc(action);

      //   setTimeout(() => {
      //     if (result !== 0) {
      //       console.log("check1");
      //       console.log(inforAccount);
      //       localStorage.setItem("user", JSON.stringify(action.account));
      //       history.push("/");
      //       return action.account;
      //     } else {
      //       console.log("check2");
      //     return  {
      //         user: "",
      //         pass: "",
      //         mess: true,
      //       };
      //     }
      //   }, 1500)
    }
    default:
      return state;
  }
};
export default myReducer;
