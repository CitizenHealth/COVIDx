import React, { useState } from 'react'
import {
  Card, CardImg, Row, Col, CardText, Modal, Button, ModalHeader, ModalBody, ModalFooter, Container
} from 'reactstrap';
import VeryWellIcon from '../../../assets/img/icons/very_well.png';
import WellIcon from '../../../assets/img/icons/well.png';
import NeutralIcon from '../../../assets/img/icons/neutral.png';
import UnwellIcon from '../../../assets/img/icons/unwell.png';
import VeryUnwellIcon from '../../../assets/img/icons/very_unwell.png';

const EmojiButton = props => {
  return (
    <Button className="mx-auto text-center font-weight-bold" style={{ width: '66%' }} onClick={props.onClick}>
      <Container>
        <Row>
          <Col xs={3}>
            <img src={props.src} alt="" />
          </Col>
          <Col >
            <div style={{ width: '100%', paddingTop: 20, fontSize: 17 }} >
              {props.text}
            </div>
          </Col>
        </Row>
      </Container>
    </Button>
  )
}


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
        <Row style={{ marginBottom: 15 }}>
          <EmojiButton color="primary" src={VeryWellIcon} text="Very well" onClick={() => this.props.handler({ activeStep: 1, feelingWell: true })} />
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <EmojiButton color="primary" src={WellIcon} text="Well" onClick={() => this.props.handler({ activeStep: 1, feelingWell: true })} />
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <EmojiButton color="primary" src={NeutralIcon} text="Neutral" onClick={() => this.props.handler({ activeStep: 1, feelingWell: true })} />
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <EmojiButton color="primary" src={UnwellIcon} text="Unwell" onClick={() => this.props.handler({ activeStep: 2, feelingWell: false })} />
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <EmojiButton color="primary" src={VeryUnwellIcon} text="Very unwell" onClick={() => this.props.handler({ activeStep: 2, feelingWell: false })} />
        </Row>
      </div >
    )
  }
}


export default HowAreYouFeeling;
