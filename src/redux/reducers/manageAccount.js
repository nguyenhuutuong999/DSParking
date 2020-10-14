import * as types from "./../constants/index";
import firebase from "./../../services/firebase";
import history from "./../../util/history";


let user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? user
  : {
      user: "",
      pass: "",
      mess: false,
    };
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      
      var inforAccount = "";
      var result = 0;
      // đợit chút
      const myfunc = async (action) => {
        let a = await firebase
          .database()
          .ref("User/parkingMan/account")
          .orderByChild("id")
          .equalTo(action.account.user)
          .on("value", function (snapshot) {
            snapshot.forEach(async function (data) {
              if (
                data.val().pwd === parseInt(action.account.pass) &&
                data.val().id === action.account.user
              ) {
                inforAccount = data.val();
                result++;
                console.log("check");
              }
            });
          });
        };
        myfunc(action);

        setTimeout(() => {
          if (result !== 0) {
            console.log("check1");
            localStorage.setItem("user", JSON.stringify(action.account));
            history.push("/");
            return action.account;
          } else {
            console.log("check2");
          return  {
              user: "",
              pass: "",
              mess: true,
            };
          }
        }, 1500)
    }
    default:
      return state;
  }
};
export default myReducer;
