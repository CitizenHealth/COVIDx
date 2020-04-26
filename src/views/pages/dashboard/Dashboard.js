import React, { useState } from 'react';
import {
  Card, CardBody, Container, Row, Button,
} from "reactstrap";
import { connect } from "react-redux";
import { setAuth } from "redux/actions/auth/authAction";
import Questionnaire from "../questionnaire/Questionnaire"
import HeatMap from "../heatMap/heatMap"
const Dashboard = (props) => {
    const [comingSoon, setComingSoon] = useState(false);
    return (<Container>
        <Row className="mx-auto h-100">
          <Card className="col-12 col-lg-5 mx-auto">
            <CardBody>
                <Questionnaire />
            </CardBody>
          </Card>
          <Card className="col-12 col-lg-5 mx-auto h-100" >
            <CardBody>
                <h2>Wearable Data</h2>
                <p>Connecting your Fitbit, Apple Watch, or other wearable device will allow us to show you more personalized insights.</p>
                <p className={comingSoon ? '' : 'd-none'}>Coming soon!</p>
                <Button className="text-white mx-auto font-weight-bold align-self-center mt-2" block={true} color="primary"
                    onClick={() => setComingSoon(true)}>Connect to HumanAPI</Button>
            </CardBody>
          </Card>
        </Row>
        <Row className="mx-auto">
            <Card className="mx-auto col-12 col-lg-11">
                <HeatMap/>
            </Card>
        </Row>
    </Container>);
}
export default Dashboard;
