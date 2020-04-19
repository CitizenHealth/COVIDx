import React from 'react'
import {
  Card, CardImg, Row, Col, CardText
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
        <h4 style={{ paddingTop: '20px', paddingBottom: '20px' }}>How are you feeling?</h4>
        <Row>
          <Col>
            <Card onClick={this.handleWell}>
              <CardImg style={{ width: "25%", paddingBottom: 20 }} src={HappyIcon} alt="happy icon" />
              <CardText>Feeling well</CardText>
            </Card>
          </Col>
          <Col>
            <Card onClick={() => this.props.handler({ activeStep: 2, feelingWell: false })}>
              <CardImg style={{ width: "25%", paddingBottom: 20 }} src={SadIcon} alt="sad icon" />
              <CardText>Feeling unwell</CardText>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default HowAreYouFeeling;
