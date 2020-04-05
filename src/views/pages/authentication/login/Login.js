import React, { useState, useEffect } from "react"
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

import { auth, provider } from "../auth";

import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"


export default function Login() {

  const [userExist, setUserExist] = useState(null)
  const [userData, setUserData] = useState(null)

  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).then(res => {
      console.log(`DISPLAY NAME: ${ res.user.displayName }`);
      console.log(`EMAIL: ${ res.user.email }`);
      console.log(`UID: ${res.user.uid}`);
      console.log(`ACCESS TOKEN: ${res.credential.accessToken}`);
      setUserData({ 
        user_id:res.user.uid, 
        display_name:res.user.displayName, 
        email:res.user.email 
      })

      const getPayload = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      const fetchUserData = async () => {
        fetch(`http://127.0.0.1:5000/login_user?user_id=${res.user.uid}`, getPayload)
          .then(res => res.json())
          .then(json => setUserExist(json))
          .catch(e => console.log(e));
      };
      fetchUserData();
    })
  };

  useEffect(() => {
    if (userExist && userExist.userExist===false && userData) {
      const postUserData = async () => {
        try {
          const postPayload = {
            method: "POST",
            headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
              user_id:userData.user_id, 
              display_name:userData.display_name, 
              email:userData.email})
          };
          console.log(postPayload)
          await fetch(`http://127.0.0.1:5000/create_user`, postPayload)
            .then(res => console.log(`USER CREATED @ ${userData.user_id}`))
            .catch(e => console.log(e));
        } catch (err) {
          console.log("fetching failed", err);
        }
      };
      postUserData()
    };
  }, [userExist]);

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
                  <h4>Login</h4>
                  <p>Welcome back, please login to your account.</p>
                </CardBody>
                <CardBody>
                  <Button.Ripple 
                    className="btn-google" color="" 
                    onClick={ signInWithGoogle }
                  >
                    <Row>
                      <Col lg="2">
                        <img src={ googleSvg } onClick={ signInWithGoogle } style={{ height:"1.5rem"}} />
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
                  <Button.Ripple className="btn-facebook" color="" style={{ marginBottom:"0.5rem" }}>
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
                <CardBody style={{ paddingTop:"0" }}>
                  <Button.Ripple className="btn-twitter" color="" style={{ marginBottom:"0.5rem" }}>
                    <Row>
                      <Col lg="2">
                        <Twitter style={{ color:"white" }}/>
                      </Col>
                      <Col lg="10" style={{ display:"flex", alignItems:"center" }}>
                        <h4 style={{ color:"white" }}>
                          Sign in with Twitter
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