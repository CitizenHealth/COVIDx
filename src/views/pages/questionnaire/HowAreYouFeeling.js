import React, { useState } from 'react'
import {
  Card, CardImg, Row, Col, CardText, Modal, Button, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import HappyIcon from '../../../assets/img/icons/happy.png';
import SadIcon from '../../../assets/img/icons/sad.png';

class HowAreYouFeeling extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      emotion: null
    };
  }

  handleWell = () => {
    this.props.form.setFieldValue("feeling_well", true);
    this.props.handler({ activeStep: 1 });
  }
  handleNotWell = () => {
    this.props.form.setFieldValue("feeling_well", false);
    this.props.handler({ activeStep: 2 });
  }

  render() {
    return (
      <div>
        <h2>Self Health Check-in</h2>
        <h4 className="text-center pt-1" style={{ paddingBottom: '20px' }}>How are you feeling?</h4>
        <Row>
          <Col>
                <Card className="py-2 view overlay mx-auto" 
                    onClick={this.handleWell} 
                  >
                  <CardImg className="mx-auto" style={{ width: "25%", paddingBottom: 20 }} src={HappyIcon} alt="happy icon" />
                  <Button color="primary" className="mx-auto text-center font-weight-bold" >Feeling well</Button>
                </Card> 
          </Col>
          <Col>
            <Card className="mx-auto py-2 view overlay" style={{ margin:'auto' }} onClick={() => this.props.handler({ activeStep: 2, feelingWell: false })}>
                  <CardImg className="mx-auto" style={{ width: "25%", paddingBottom: 20 }} src={SadIcon} alt="sad icon" />
                  <Button color="primary" className="mx-auto text-center font-weight-bold">Feeling unwell</Button>
                </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default HowAreYouFeeling;
