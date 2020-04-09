import React, { Suspense, lazy, useContext, useState } from "react"
import { Router, Switch, Route, Redirect } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"

// Route-based code splitting
const Home = lazy(() =>
  import("./views/pages/questionnaire/Questionnaire")
);

const Login = lazy(() =>
  import("./views/pages/authentication/login/Login")
);

const Profile = lazy(() =>
  import("./views/pages/profile/Profile")
);

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig);

// const AuthenticatedContext = React.createContext({
//   authenticated: false,
//   setAuthenticated: () => {}
// });

// const AuthenticatedSwitcher = () => {
//   const { authenticated, setAuthenticated } = useContext(AuthenticatedContext);
//   useEffect(() => {
//     setAuthenticated(!authenticated);
//   });
//   return(authenticated)
// };


export default function AppRouter(props) {
  // const [authenticated, setAuthenticated] = useState(false);
  // const value = { authenticated, setAuthenticated };

  return (
    <Router history={history}>
      <Redirect from="/" to="/home" />
      <Switch>
        <AppRoute
          path="/home"
          component={Home}
        />
        <AppRoute
          path="/login"
          component={Login}
          fullLayout
        />
        <AppRoute
          path="/profile"
          component={ Profile }
        />
      </Switch>
    </Router>
  )
}
// class AppRouter extends React.Component {
//   render() {
//     return (
//       // Set the directory path if you are deploying in sub-folder
//       <Router history={history}>
//         <Redirect from="/" to="/login" />
//         <Switch>
//           <AppRoute
//             path="/home"
//             component={Questionnaire}
//           />
//           <AppRoute
//             path="/page2"
//             component={Page2}
//           />
//           <AppRoute
//             path="/login"
//             component={login}
//             fullLayout
//           />
//           <AppRoute
//             path="/map"
//             component={MapComponent}
//           />
//           <AppRoute
//             path="/profile"
//             component={ Profile }
//           />
//         </Switch>
//       </Router>
//     )
//   }
// }
