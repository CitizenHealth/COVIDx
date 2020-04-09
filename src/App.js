import React, { useState, useReducer } from "react"
import Router from "./Router"
import "./components/@vuexy/rippleButton/RippleButton"

import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"

import Login from "./views/pages/authentication/login/Login"
import FullPageLayout from "layouts/FullpageLayout"


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
    <Router />
  )
}
