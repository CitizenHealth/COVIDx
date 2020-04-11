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


// export const AuthenticationContext = React.createContext();

// const initialState = {
//   isAuthenticated:false,
// };

// console.log(store.getState());

const ProtectedRoute = ({ auth, render, fail }) => {
  if (auth) {
    if (fail) {
      return fail();
    }
    return null;
  }
  return render();
};

const mapStateToProps = state => ({ isAuthenticated: state.auth });
export default connect(mapStateToProps, { setAuth })(App);

export function App(props) {
  return (
    <>
    <Router>
      <Switch>
        <Route path="/privacy-policy"><PrivacyPolicy /></Route>
      </Switch>
    </Router>
    <ProtectedRoute 
      auth={ !props.isAuthenticated.login.isAuthenticated }
      render={ () => <ViewRouter /> }
      fail={() => <FullPageLayout><Login /></FullPageLayout>}
    />
    </>
  )
}