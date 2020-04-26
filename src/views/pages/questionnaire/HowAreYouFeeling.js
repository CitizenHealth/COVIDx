import React, { useState } from 'react'
import {
  Card, CardImg, Row, Col, CardText
} from 'reactstrap';
import HappyIcon from '../../../assets/img/icons/happy.png';
import SadIcon from '../../../assets/img/icons/sad.png';
function Hover(props) {
    const [hov, setHover] = useState(false);
    const onMouseEnterHandler =  function() {
        setHover(true);
        console.log('enter');
    };
    const onMouseLeaveHandler = function() {
        setHover(false);
        console.log('exit');
    };

    var inner = {};
    if(hov) {
        inner = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,

              
        };
    }

    return (
        <div style={inner}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler} >
            {props.children}
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
    return (
      <div>
        <h4 style={{ paddingTop: '20px', paddingBottom: '20px' }}>How are you feeling?</h4>
        <Row>
          <Col>
            <Hover children= {
                <Card className="view overlay" style={{ margin: 'auto' }} onClick={this.handleWell}>
                  <CardImg className="mx-auto" style={{ width: "25%", paddingBottom: 20 }} src={HappyIcon} alt="happy icon" />
                  <CardText className="mx-auto">Feeling well</CardText>
                  <div className="mask flex-center rgba-blue-light"></div>
                </Card> }>
            </Hover>
          </Col>
          <Col>
            <Hover children={
                <Card className="view overlay" style={{ margin:'auto' }} onClick={() => this.props.handler({ activeStep: 2, feelingWell: false })}>
                  <CardImg className="mx-auto" style={{ width: "25%", paddingBottom: 20 }} src={SadIcon} alt="sad icon" />
                  <CardText className="mx-auto">Feeling unwell</CardText>
                  <div className="mask flex-center rgba-blue-light"></div>
                </Card>}>
                </Hover>
          </Col>
        </Row>
      </div>
    )
  }
}

export default HowAreYouFeeling;
