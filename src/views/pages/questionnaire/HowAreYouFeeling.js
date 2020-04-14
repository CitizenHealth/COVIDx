import React from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
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



  render() {
    return (
      <div>
        <h4 style={{ paddingTop: '20px', paddingBottom: '20px' }}>How are you feeling?</h4>
        <Row>
          <Col>
            <Card onClick={() => this.props.handler({ activeStep: 1, feelingWell: true })}>
              <CardImg style={{ width: "25%" }} src={HappyIcon} alt="happy icon" />
            </Card>
          </Col>
          <Col>
            <Card onClick={() => this.props.handler({ activeStep: 2, feelingWell: false })}>
              <CardImg style={{ width: "25%" }} src={SadIcon} alt="sad icon" />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default HowAreYouFeeling;
