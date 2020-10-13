// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKl5FYZOK7BHYnz4Ah8yYflzWlKP9P_EU",
  authDomain: "fir-exam-ni.firebaseapp.com",
  databaseURL: "https://fir-exam-ni.firebaseio.com",
  projectId: "fir-exam-ni",
  storageBucket: "fir-exam-ni.appspot.com",
  messagingSenderId: "159346041983",
  appId: "1:159346041983:web:4b2da9baeba7cea2b88b4a",
  measurementId: "G-65GTD6ETPY"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
 
const firebaseAppProviders = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export { firebaseApp, firebaseAppAuth, firebaseAppProviders }
