import firebase from "firebase";

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBX-bcVW22dRwtdCGrVb9m_fFKInxMzGYo",
    authDomain: "dtuparking.firebaseapp.com",
    databaseURL: "https://dtuparking.firebaseio.com",
    projectId: "dtuparking",
    storageBucket: "dtuparking.appspot.com",
    messagingSenderId: "1059316722935",
    appId: "1:1059316722935:web:1e69b103a0fd02a5cdf7f2",
    measurementId: "G-ZKSEMW84DK"
  };
  // Initialize Firebase
  var fire = firebase.initializeApp(firebaseConfig);

  export default fire;