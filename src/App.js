import React, { useState, useReducer } from "react"
import "./components/@vuexy/rippleButton/RippleButton"

import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"

import Login from "./views/pages/authentication/login/Login"
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

import { PrivacyPolicy } from "views/pages/privacyPolicy/privacyPolicy"

import { login } from "redux/reducers/auth/loginReducer"
import { setAuth } from "redux/actions/auth/authAction";
import { store } from "redux/storeConfig/store";
import { connect } from "react-redux";


const ProtectedRoute = ({ auth, token, render, fail }) => {
  if (!auth) {
    if (fail) {
      return fail();
    }
    return null;
  }
  return render();
};

const mapStateToProps = state => ({ auth: state.auth });
export function App(props) {
  const token = localStorage.getItem('token');
  return (
    <>
    <Router>
      <Switch>
        <Route path="/privacy-policy"><PrivacyPolicy /></Route>
      </Switch>
    </Router>
    <ProtectedRoute 
      auth={ props.auth.login }
      token={ token }
      render={ () => <ViewRouter /> }
      fail={() => <FullPageLayout><Login /></FullPageLayout>}
    />
    </>
  )
}

export default connect(mapStateToProps)(App);