import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5Pi7YveAC7biXFWZXjxU_z6aI1LLi-eY",
  authDomain: "covidx-6344c.firebaseapp.com",
  databaseURL: "https://covidx-6344c.firebaseio.com",
  projectId: "covidx-6344c",
  storageBucket: "covidx-6344c.appspot.com",
  messagingSenderId: "433273910441",
  appId: "1:433273910441:web:e26f5abd2b1e1fb47025b8",
  measurementId: "G-7EZJJ2ZD8L"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();