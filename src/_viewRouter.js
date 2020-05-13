import React, { Suspense, lazy, useState } from "react"
import {
  Card, CardBody, Container, Row, Button,
} from "reactstrap";

import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect 
} from "react-router-dom"
import { history } from "./history"
// import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"
import HeatMap from "./views/pages/heatMap/heatMap";
import Profile from "./views/pages/profile/Profile"
import Home from "./views/pages/Home";
import { PrivacyPolicy } from "./views/pages/privacyPolicy/privacyPolicy"
import Questionnaire from "./views/pages/questionnaire/Questionnaire"
import Dashboard from "./views/pages/dashboard/Dashboard"


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


export default function ViewRouter(props) {

  return (
    <Router history={history}>
      {/* <Redirect from="/" to="/dashboard" /> */}
      <Switch>
        <RouteConfig
          exact 
          path="/"
          component= {Dashboard}
        />
        <RouteConfig
          path="/map"
          component={ HeatMap }
        />
        <RouteConfig 
          path="/profile"
          component={ Profile }
        />
        <RouteConfig 
          path="/health-report"
          component={ props => ( 
            <Row className="mx-auto h-100">
            <Card className="col-12 col-lg-5 mx-auto">
              <CardBody>
                  <Questionnaire />
              </CardBody>
            </Card> 
            </Row>)
          }
        />
        <Route 
          path="/privacy-policy"
          component={ PrivacyPolicy } 
        />
      </Switch>
    </Router>
  )
}
