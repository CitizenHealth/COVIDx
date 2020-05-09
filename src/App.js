import React, { useState, useReducer } from "react"
import "./components/@vuexy/rippleButton/RippleButton"

import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"

// import Login from "./views/pages/authentication/login/Login"
import FullPageLayout from "layouts/FullpageLayout"
import ViewRouter from "./_viewRouter"
import { 
  BrowserRouter as Router, 
  Link, 
  Switch, 
  Route, 
  IndexRoute,
  BrowserHistory
} from "react-router-dom";

import { fetchUserData, checkToken } from "authentication/login/Login"
import { auth, googleProvider, facebookProvider } from "authentication/auth";

export const baseEndpoint = "https://map.covidx.app"

// import { login } from "redux/reducers/auth/loginReducer"
// import { setAuth } from "redux/actions/auth/authAction";
// import { store } from "redux/storeConfig/store";
// import { connect } from "react-redux";


// const ProtectedRoute = ({ auth, token, render, fail }) => {
//   if (!auth) {
//     // return fail ? fail() : null;
//     return render();
//   }
//   return render();
// };

// const mapStateToProps = state => ({ auth: state.auth });
export default function App(props) {
  return (
    <>
      <ViewRouter />
    </>
  )
}

// export default connect(mapStateToProps)(App);
