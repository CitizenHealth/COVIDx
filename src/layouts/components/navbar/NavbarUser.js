import React, { useState, useEffect } from "react"
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge
} from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
import axios from "axios"
import * as Icon from "react-feather";
import googleSvg from "assets/img/svg/google.svg";
import classnames from "classnames"
import Autocomplete from "../../../components/@vuexy/autoComplete/AutoCompleteComponent"
import { history } from "../../../history"
import { setAuth } from "redux/actions/auth/authAction";
import { connect } from "react-redux";
import { fetchUserData, checkToken } from "authentication/login/Login"

import { auth, googleProvider, facebookProvider } from "authentication/auth";

const UserDropdown = ({ userData, signInWith }) => {
  const loggedOut = 
    (<DropdownMenu right style={{ width:"min-content" }}>
      <DropdownItem tag="a" onClick = { () => signInWith(facebookProvider) }>
        <Icon.Facebook size={14} className="mr-50" />
        <span className="align-middle">Facebook</span>
      </DropdownItem>
      <DropdownItem tag="a" onClick={ () => signInWith(googleProvider) }>
        <img src={ googleSvg } className="mr-50" style={{ height:"1rem", fill:"black !important" }}/>
        <span className="align-middle">Google</span>
      </DropdownItem>
    </DropdownMenu>)

  const loggedIn = 
    (<DropdownMenu right style={{ width:"min-content" }}>
      <DropdownItem 
        tag="a" 
        href=""
        onClick = { () => localStorage.clear() }
      >
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>)

  return (
    userData ? loggedIn : loggedOut
  )
}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { setAuth })(NavbarUser);
function NavbarUser(props) {

  const signInWith = provider => {
    auth.signInWithPopup(provider).then(res => {
      console.log(`DISPLAY NAME: ${ res.user.displayName }`);
      console.log(`EMAIL: ${ res.user.email }`);
      console.log(`UID: ${res.user.uid}`);
      console.log(`ACCESS TOKEN: ${res.credential.accessToken}`);
      console.log(`IMAGE LINK: ${res.additionalUserInfo.profile.picture}`)
      const payload = { 
        user_id:res.user.uid, 
        display_name:res.user.displayName, 
        email:res.user.email,
        access_token:res.credential.accessToken,
        img_link:res.additionalUserInfo.profile.picture
      };
      const userData = (async () => { 
        const res = await fetchUserData(payload);
        // const resPayload = res.payload
        localStorage.setItem("token", res.payload.access_token);
        props.setAuth({ type:"LOGIN", payload:res.payload });
      })();
    })
  };

  useEffect(() => {
    const checkLocal = localStorage.getItem("token");
    checkLocal && (async () => { 
      const res = await checkToken(checkLocal);
      res && props.setAuth({ type:"LOGIN", payload:res.payload });
      // setUserData(res.payload[0])
    })()
  }, [localStorage]);


  return (
    <ul className="nav navbar-nav navbar-nav-user float-right">
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle tag="a" className="nav-link dropdown-user-link">
          <div className="user-nav d-sm-flex d-none">
            <span className="user-name text-bold-600">
              { 
                props.auth.login.isAuthenticated ? 
                props.auth.login.payload.payload.display_name : 
                "Log In" 
              }
            </span>
          </div>
          <span data-tour="user">
            {
              props.auth.login.isAuthenticated ? 
              <img
                src={ props.auth.login.payload.payload.img_link }
                className="round"
                height="40"
                width="40"
                alt="avatar"
              /> :
              <Icon.User /> 
            }
          </span>
        </DropdownToggle>
        <UserDropdown userData={ props.auth.login.payload } signInWith={ signInWith } />
      </UncontrolledDropdown>
    </ul>
  )
}