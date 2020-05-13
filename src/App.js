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

import { auth, googleProvider, facebookProvider } from "configs/auth";


export const UserContext = createContext(null);
export default function App(props) {
  const [userPayload, setUserPayload] = useState(null);

  console.log("current user =>", userPayload)
  const initFirebase = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(token => {
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

  useEffect(() => {
    console.log("initializing user")
    initFirebase()
  }, [])


  return (
    <UserContext.Provider
      value={ userPayload }
    >
      <ViewRouter />
    </UserContext.Provider>
  )
}

// export default connect(mapStateToProps)(App);
