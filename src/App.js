import React, { useState, useReducer } from "react"
import "./components/@vuexy/rippleButton/RippleButton"

import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"

import Login from "./views/pages/authentication/login/Login"
import FullPageLayout from "layouts/FullpageLayout"
import Router from "./Router"
import { 
  BrowserRouter as BRouter, 
  Link, 
  Switch, 
  Route, 
  Redirect 
} from "react-router-dom";
import { PrivacyPolicy } from "views/pages/privacyPolicy/privacyPolicy"


export const AuthenticationContext = React.createContext();

const initialState = {
  isAuthenticated:false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated:true
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated:false
      };
    default:
      return state;
  }
};

export default function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthenticationContext.Provider 
      value={{
        state,
        dispatch
      }}
    >
      <BRouter>
        <Switch>
          <Route path="/privacy-policy"><PrivacyPolicy /></Route>
        </Switch>
      </BRouter>
      <>
        {
          !state.isAuthenticated ? 
          <FullPageLayout><Login /></FullPageLayout> : 
          <Router />
        }
      </>
    </AuthenticationContext.Provider>
  )
}