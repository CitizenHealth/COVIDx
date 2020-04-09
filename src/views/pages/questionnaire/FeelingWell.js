import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class FeelingWell extends React.Component {

  state = {
    buttonSelected: null
  };

  handleNextClick = e => {
    e.preventDefault();
    this.props.selectSameRoomAsPositiveTest(this.state.buttonSelected);
  };

  handleButtonChange = (e) => {
    alert(e.target.value);
    this.setState({
      buttonSelected: e.target.value
    })
  };

  render() {
    return(
      <div>
        <h4 style={{paddingTop: '20px', paddingBottom: '20px'}}>Feeling Well</h4>
        <Form onSubmit={ (e) => this.handleNextClick(e)}>
          <FormGroup tag="fieldset">
            <legend>Have you been in the same room as someone who has tested positive for COVID-19?</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value='true' onChange={(e) => this.handleButtonChange(e)}/>{' '}
                Yes
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value='false' onChange={(e) => this.handleButtonChange(e)}/>{' '}
                No
              </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input type="radio" name="radio1" value='false' onChange={(e) => this.handleButtonChange(e)}/>{' '}
                I don't know
              </Label>
            </FormGroup>
          </FormGroup>
          <Button>Prev</Button>
          <Button>Next</Button>
        </Form>
      </div>
    )
  }
}

export default FeelingWell;
