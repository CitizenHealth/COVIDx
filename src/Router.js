import React, { Suspense, lazy, useContext, useState } from "react"
import { Router, Switch, Route, Redirect } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"

// Route-based code splitting
const Home = lazy(() =>
  import("./views/pages/Home")
);

const Page2 = lazy(() =>
  import("./views/pages/Page2")
);

const Login = lazy(() =>
  import("./views/pages/authentication/login/Login")
);

const MapComponent = lazy(() =>
  import("./views/pages/MapComponent")
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


export default function AppRouter(props) {

  return (
    <Router history={history}>
      <Redirect from="/" to="/home" />
      <Switch>
        <AppRoute
          path="/home"
          component={Home}
        />
        <AppRoute
          path="/page2"
          component={Page2}
        />
        <AppRoute
          path="/login"
          component={Login}
          fullLayout
        />
        <AppRoute
          path="/map"
          component={MapComponent}
        />
        <AppRoute 
          path="/profile"
          component={ Profile }
        />
      </Switch>
    </Router>
  )
}