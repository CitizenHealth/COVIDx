import React, { useState } from 'react'
import {
  Card, CardImg, Row, Col, CardText, Modal, Button, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import HappyIcon from '../../../assets/img/icons/happy.png';
import SadIcon from '../../../assets/img/icons/sad.png';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
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
    const overlay = (<div className="mask flex-center rgba-blue-light"></div>);
    return (
      <div>
        <h2>Self Health Check-in</h2>
        <h4 className="text-center pt-1" style={{ paddingBottom: '20px' }}>How are you feeling?</h4>
        <Row>
          <Col>
                <Card className="view overlay mx-auto" 
                    onClick={this.handleWell} 
                  >
                  <CardImg className="mx-auto" style={{ width: "25%", paddingBottom: 20 }} src={HappyIcon} alt="happy icon" />
                  <CardText className="mx-auto text-center">Feeling well</CardText>
                </Card> 
          </Col>
          <Col>
            <Card className="view overlay" style={{ margin:'auto' }} onClick={() => this.props.handler({ activeStep: 2, feelingWell: false })}>
                  <CardImg className="mx-auto" style={{ width: "25%", paddingBottom: 20 }} src={SadIcon} alt="sad icon" />
                  <CardText className="mx-auto text-center">Feeling unwell</CardText>
                  <div className="mask flex-center rgba-blue-light"></div>
                </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default HowAreYouFeeling;
