import React, { Suspense, lazy, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { history } from "./history";
// import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import HeatMap from "./views/pages/heatMap/heatMap";
import Profile from "./views/pages/profile/Profile";
import Home from "./views/pages/Home";
import { PrivacyPolicy } from "./views/pages/privacyPolicy/privacyPolicy";
import Questionnaire from "./views/pages/questionnaire/Questionnaire";
import { InviteFriend } from "./views/pages/inviteFriend/InviteFriend";

const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);

export default function ViewRouter(props) {
  return (
    <Router history={history}>
      <Redirect from="/" to="/map" />
      <Switch>
        <RouteConfig path="/map" component={HeatMap} />
        <RouteConfig path="/profile" component={Profile} />
        <RouteConfig path="/health-report" component={Questionnaire} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <RouteConfig path="/invite-friends" component={InviteFriend} />
      </Switch>
    </Router>
  );
}
