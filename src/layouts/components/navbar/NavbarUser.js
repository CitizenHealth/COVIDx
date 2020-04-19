import React, { useState } from "react"
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

import { auth, googleProvider, facebookProvider } from "views/pages/authentication/auth";

const UserDropdown = props => {
  return (
    <DropdownMenu right style={{ width:"min-content" }}>
      <DropdownItem tag="a" onClick = { () => props.signInWith(facebookProvider) }>
        <Icon.Facebook size={14} className="mr-50" />
        <span className="align-middle">Facebook</span>
      </DropdownItem>
      <DropdownItem tag="a" onClick={ () => props.signInWith(googleProvider) }>
        <img src={ googleSvg } className="mr-50" style={{ height:"1rem", fill:"black !important" }}/>
        <span className="align-middle">Google</span>
      </DropdownItem>
    </DropdownMenu>
  )
}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { setAuth })(NavbarUser);
export function NavbarUser(props) {

  const [userData, setUserData] = useState(null);

  const fetchUserData = async (userDataRes) => {
    const getPayload = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    const postPayload = {
      method: "POST",
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        user_id:userDataRes.user.uid, 
        display_name:userDataRes.user.displayName, 
        email:userDataRes.user.email,
        img_link:userDataRes.additionalUserInfo.profile.picture,
      })
    };

    await fetch(`https://www.covidx.app/login_user?user_id=${userDataRes.user.uid}`, getPayload)
      .then(res => res.json())
      .then(res => 
        res.ok ? 
        res : 
        fetch(`https://www.covidx.app/create_user`, postPayload)
          .then(res => res.json())
      )
      .then(json => {props.setAuth({type: "LOGIN", json})})
      .catch(e => console.log(e));

    localStorage.setItem('token', userDataRes.credential.accessToken);
  };

  const signInWith = provider => {
    auth.signInWithPopup(provider).then(res => {
      console.log(`DISPLAY NAME: ${ res.user.displayName }`);
      console.log(`EMAIL: ${ res.user.email }`);
      console.log(`UID: ${res.user.uid}`);
      console.log(`ACCESS TOKEN: ${res.credential.accessToken}`);
      console.log(`IMAGE LINK: ${res.additionalUserInfo.profile.picture}`)
      setUserData({ 
        user_id:res.user.uid, 
        display_name:res.user.displayName, 
        email:res.user.email,
        accessToken:res.credential.accessToken,
        img_link:res.additionalUserInfo.profile.picture
      });
      fetchUserData(res);
    })
  };



  return (
    <ul className="nav navbar-nav navbar-nav-user float-right">
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle tag="a" className="nav-link dropdown-user-link">
          <div className="user-nav d-sm-flex d-none">
            <span className="user-name text-bold-600">
              { props.auth.login ? userData.display_name : "Log In" }
            </span>
          </div>
          <span data-tour="user">
            {
              !props.auth.login ? 
                <Icon.User /> :
                <img
                  src={ userData.img_link }
                  className="round"
                  height="40"
                  width="40"
                  alt="avatar"
                />
            }

          </span>
        </DropdownToggle>
        <UserDropdown {...props} signInWith={ signInWith } />
      </UncontrolledDropdown>
    </ul>
  )
}

// export class NavbarUser extends React.PureComponent {
//   state = {
//     navbarSearch: false,
//     suggestions: []
//   }
// 
//   componentDidMount() {
//     axios.get("/api/main-search/data").then(({ data }) => {
//       this.setState({ suggestions: data.searchResult })
//     })
//   }

  // handleNavbarSearch = () => {
  //   this.setState({
  //     navbarSearch: !this.state.navbarSearch
  //   })
  // }
  // get the user details here


//   render() {
//     // console.log(props)
//     return (
//       <ul className="nav navbar-nav navbar-nav-user float-right">
//         <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
//           <DropdownToggle tag="a" className="nav-link dropdown-user-link">
//             <div className="user-nav d-sm-flex d-none">
//               <span className="user-name text-bold-600">
//                 {this.props.userName}
//               </span>
//             </div>
//             <span data-tour="user">
//               <img
//                 src={this.props.userImg}
//                 className="round"
//                 height="40"
//                 width="40"
//                 alt="avatar"
//               />
//             </span>
//           </DropdownToggle>
//           <UserDropdown {...this.props} />
//         </UncontrolledDropdown>
//       </ul>
//     )
//   }
// }

