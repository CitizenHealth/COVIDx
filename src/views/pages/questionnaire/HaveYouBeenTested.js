import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class HaveYouBeenTested extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      testTaken: null,
      numPeoplePositive: null
    }
  }

  handleTestedChanged = (e) => {
      this.setState({
        testTaken: e.target.value
      })
  };

  handleNumPeoplePositive = (e) => {
    this.setState({
      numPeoplePositive: e.target.value
    })
  };

  handleNextClick = e => {
    e.preventDefault();

    const testedAnswers = {
      testTaken: this.state.testTaken,
      numPeoplePositive: this.state.numPeoplePositive,
    };

    this.props.haveYouBeenTestedAnswers(testedAnswers);
  };

  render() {
    return (
      <div>
        <Form onSubmit={ (e) => this.handleNextClick(e)}>
          <FormGroup tag="fieldset">
            <legend>Have you been tested for your illness?</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'covid_19'}
                       onChange={(e) => this.handleTestedChanged(e)}/>{' '}
                COVID-19
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'influenza'}
                       onChange={(e) => this.handleTestedChanged(e)}/>{' '}
                Influenza
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'something_else'}
                       onChange={(e) => this.handleTestedChanged(e)}/>{' '}
                Something else
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'not_tested'}
                       onChange={(e) => this.handleTestedChanged(e)}/>{' '}
                I have not been tested
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>How many people in your household have symptoms or tested positive for COVID-19?</legend>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="radio2" value={0} onChange={(e) => this.handleNumPeoplePositive(e)}/>{' '}
                0
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="radio2" value={1} onChange={(e) => this.handleNumPeoplePositive(e)}/>{' '}
                1
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="radio2" value={2} onChange={(e) => this.handleNumPeoplePositive(e)}/>{' '}
                2
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="radio2" value={3} onChange={(e) => this.handleNumPeoplePositive(e)}/>{' '}
                3
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="radio2" value={4} onChange={(e) => this.handleNumPeoplePositive(e)}/>{' '}
                4
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="radio2" value={5} onChange={(e) => this.handleNumPeoplePositive(e)}/>{' '}
                5
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

export default HaveYouBeenTested;
