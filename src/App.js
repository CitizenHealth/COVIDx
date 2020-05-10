import React, { 
  useEffect, 
  useState, 
  useReducer, 
  createContext, 
  useContext 
} from "react"
import "./components/@vuexy/rippleButton/RippleButton"

import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"

import ViewRouter from "./_viewRouter"
import axios from "axios";

import { auth, googleProvider, facebookProvider } from "configs/auth";

export const baseEndpoint = process.env.REACT_APP_ENDPOINT_URI;

export const UserContext = createContext(null);
export default function App(props) {
  const [userPayload, setUserPayload] = useState(null);

  console.log("current user =>", userPayload)
  const initFirebase = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(token => {
          console.log(user)
          setUserPayload({
            email: user.email,
            displayName: user.displayName,
            accessToken: token,
            imgLink:user.photoURL,
          });
        });
      } else {
        console.log('logging out!');
        setUserPayload(null);
      }
    })
  };

  // have to create account here too
  useEffect(() => {
    console.log("initializing user")
    initFirebase()
  }, [])

  axios.interceptors.request.use(config => {
    const token = "Bearer: " + userPayload.accessToken;
    config.headers.Authorization = token;

    return config;
  });

// check that i can use context in navbaruser
  return (
    <UserContext.Provider
      value={ userPayload }
    >
      <ViewRouter />
    </UserContext.Provider>
  )
}

// export default connect(mapStateToProps)(App);
