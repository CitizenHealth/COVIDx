import firebase from 'firebase/app';

// initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "covidx-6344c.firebaseapp.com",
  databaseURL: "https://covidx-6344c.firebaseio.com",
  projectId: "covidx-6344c",
  storageBucket: "covidx-6344c.appspot.com",
  messagingSenderId: "433273910441",
  appId: "1:433273910441:web:e26f5abd2b1e1fb47025b8",
  measurementId: "G-7EZJJ2ZD8L"
};

firebase.initializeApp(firebaseConfig);