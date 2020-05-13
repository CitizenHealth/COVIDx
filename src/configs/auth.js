import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB5Pi7YveAC7biXFWZXjxU_z6aI1LLi-eY",
  authDomain: "covidx-6344c.firebaseapp.com",
  projectId: "covidx-6344c",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const anonimity = () => auth.signInAnonymously()
