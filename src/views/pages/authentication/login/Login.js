import React, { useState, useEffect, useContext } from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap"
import { Mail, Lock, Check, Facebook, Twitter, GitHub } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import googleSvg from "../../../../assets/img/svg/google.svg"

import { auth, googleProvider, facebookProvider } from "../auth";
import { AuthenticationContext } from "App";

import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"

import { setAuth } from "redux/actions/auth/authAction";
import { connect } from "react-redux";


const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { setAuth })(Login);

export function Login(props) {
  const [userData, setUserData] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);


  // const signInWithEmail = () => {
  //   auth.signInWithEmailAndPassword(email, password)
  //     .catch(e => console.log(e));
  // };

  // const createAccountWithEmail = () => {
  //   auth.createUserWithEmailAndPassword(email, password)
  //     .catch()
  // };
  const postUserData = async (userDataRes) => {
    const postPayload = {
      method: "POST",
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        user_id:userDataRes.user.uid, 
        display_name:userDataRes.user.displayName, 
        email:userDataRes.user.email
      })
    };
    // http://covidx-dev.eba-mayqvyww.us-west-2.elasticbeanstalk.com
    await fetch(`http://127.0.0.1:5000/create_user`, postPayload)
      .then(res => {
        console.log(`USER CREATED @ ${userData.user_id}`)
        console.log(res.json())
        return res.json()
        // localStorage.setItem('token', userData.accessToken)
      })
      .then(json => props.setAuth({type: "LOGIN", json}))
      .catch(e => `fetching failed ${e}`);
  };

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
        image:userDataRes.additionalUserInfo.profile.picture
      })
    };

    await fetch(`http://127.0.0.1:5000/login_user?user_id=${userDataRes.user.uid}`, getPayload)
      .then(res => res.json())
      .then(res => 
        res.ok ? 
        res : 
        fetch(`http://127.0.0.1:5000/create_user`, postPayload).then(res => res.json())
      )
      .then(json => props.setAuth({type: "LOGIN", json}))
      .catch(e => console.log(e));

    localStorage.setItem('token', userDataRes.credential.accessToken);
  };

  // postUserData()
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
        image:res.additionalUserInfo.profile.picture
      });
      fetchUserData(res);
    })
  };


  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col
              lg="6"
              className="d-lg-block d-none text-center align-self-center px-1 py-0"
            >
              <img src={loginImg} alt="loginImg" />
            </Col>
            <Col lg="6" md="12" className="p-0">
              <Card className="rounded-0 mb-0 px-2">
                <CardBody>
                  <h2 style={{ marginBottom:"2rem" }}>Login</h2>
                  <p>
                    Welcome! You're one step away from a healthcare revolution.
                  </p>
                  <p>
                    Select any of the options below to sign in.
                  </p>
                  {/*<Form onSubmit={ e => e.preventDefault() }>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={ email }
                        onChange={e => setEmail(e.target.value) }
                      />
                      <div className="form-control-position">
                        <Mail size={15} />
                      </div>
                      <Label>Email</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="password"
                        placeholder="Password"
                        value={ password }
                        onChange={ e => setPassword(e.target.value) }
                      />
                      <div className="form-control-position">
                        <Lock size={15} />
                      </div>
                      <Label>Password</Label>
                    </FormGroup>
                    <div className="d-flex justify-content-between">
                      <Button.Ripple color="primary" outline>
                       Register                           
                      </Button.Ripple>
                      <Button.Ripple color="primary" type="submit" onClick={ signInWithEmail }>
                          Login 
                      </Button.Ripple>
                    </div>
                  </Form>*/}
                </CardBody>
                <CardBody>
                  <Button.Ripple 
                    className="btn-google" color="" 
                    onClick={ () => signInWith(googleProvider) }
                  >
                    <Row>
                      <Col lg="2">
                        <img src={ googleSvg } style={{ height:"1.5rem"}} />
                      </Col>
                      <Col lg="10" style={{ display:"flex", alignItems:"center" }}>
                        <h4 style={{ color:"white" }}>
                          Sign in with Google
                        </h4>
                      </Col>
                    </Row>
                  </Button.Ripple>
                </CardBody>
                <CardBody style={{ paddingTop:"0" }}>
                  <Button.Ripple  onClick={ () => signInWith(facebookProvider) } className="btn-facebook" color="" style={{ marginBottom:"0.5rem" }}>
                    <Row>
                      <Col lg="2">
                        <Facebook />
                      </Col>
                      <Col lg="10" style={{ display:"flex", alignItems:"center" }}>
                        <h4 style={{ color:"white" }}>
                          Sign in with Facebook
                        </h4>
                      </Col>
                    </Row>
                  </Button.Ripple>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}