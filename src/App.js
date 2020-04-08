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

const linkShare = () => {
  fetch("https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyB5Pi7YveAC7biXFWZXjxU_z6aI1LLi-eY", {
    method:"POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      longDynamicLink: "https://covidx.page.link/?link=http://covidx.app&apn=http://covidx.app"
    })
  });
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