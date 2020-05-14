import React, { useState } from 'react';
import {
  Card, CardBody, Container, Row, Button,
} from "reactstrap";
import { connect } from "react-redux";
import Questionnaire from "../questionnaire/Questionnaire"
import HeatMap from "../heatMap/heatMap";

import "./dashboard.scss";

const Dashboard = (props) => {
  const [comingSoon, setComingSoon] = useState(false);
  return (
    <div className="custom-dashboard">
        <Card className="survey-card">
          <CardBody>
            <Questionnaire />
          </CardBody>
        </Card>
      <div className="widgets">
        <div className="wearable-data-container">
          <Card className="wearable-data">
            <CardBody>
              <h2>Wearable Data</h2>
              <p>Connecting your Fitbit, Apple Watch, or other wearable device will allow us to show you more personalized insights.</p>
              <h5 style={ !comingSoon ? { display:"none" } : null}><i>Coming soon!</i></h5>
              <div className="button-container">
                <Button 
                  color="primary"
                  onClick={() => setComingSoon(true)}
                >
                  Connect to HumanAPI
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        <Card>
          <CardBody>
            <HeatMap/>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
export default Dashboard;
