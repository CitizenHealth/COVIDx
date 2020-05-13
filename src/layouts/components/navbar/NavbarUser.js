import React, { useContext } from "react"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import * as Icon from "react-feather";
import googleSvg from "assets/img/svg/google.svg";
import guestIcon from "assets/img/svg/user.svg"
import { UserContext } from "App";

import { auth, googleProvider, facebookProvider, anonymousSignIn } from "configs/auth";

const UserDropdown = ({ userData, signInWith }) => {
  const loggedOut = (
    <DropdownMenu right style={{ width: "min-content", left: "-78px" }}>
      <DropdownItem tag="a" onClick={() => signInWith(facebookProvider)}>
        <Icon.Facebook size={14} className="mr-50" />
        <span className="align-middle">Facebook</span>
      </DropdownItem>
      <DropdownItem tag="a" onClick={() => signInWith(googleProvider)}>
        <img
          src={googleSvg}
          className="mr-50"
          style={{ height: "1rem", fill: "black !important" }}
          alt="Google login button"
        />
        <span className="align-middle">Google</span>
      </DropdownItem>
      <DropdownItem tag="a" onClick={() => anonymousSignIn()}>
        <div style={{ display: "inline-block", marginRight: 5}}>
          <Icon.User size={18} />
        </div>
        <span className="align-middle">Guest</span>
      </DropdownItem>
    </DropdownMenu>
  );

  const loggedIn = 
    (<DropdownMenu right style={{ width:"min-content" }}>
      <DropdownItem 
        tag="a" 
        href=""
        onClick = { () => auth.signOut().then(() => console.log("sign out successful")) }
      >
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>)

  return (
    userData ? loggedIn : loggedOut
  )
}

export default function NavbarUser(props) {
  const user = useContext(UserContext);

  const signInWith = provider => {
    auth.signInWithPopup(provider).then(res => {
      console.log("logged in!")
    })
  };

  return (
    <ul className="nav navbar-nav navbar-nav-user float-right">
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle tag="a" className="nav-link dropdown-user-link">
          <div className="user-nav d-sm-flex d-none">
            <span className="user-name text-bold-600">
              {user ? user.displayName : "Log In"}
            </span>
          </div>
          <span data-tour="user">
            {user ? (
              <img
                src={user.imgLink || guestIcon}
                className="round"
                height="40"
                width="40"
                alt="avatar"
                style={{ color: "#626262" }}
              />
            ) : (
              <Icon.User />
            )}
          </span>
        </DropdownToggle>
        <UserDropdown userData={user} signInWith={signInWith} />
      </UncontrolledDropdown>
    </ul>
  );
}

