import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

class YouBeenTestedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testTaken: null
    };
    this.props.handler({
      person_test_date: null,
      person_tested: null,
    })
  }

  handleTestedChanged = e => {
    this.props.handler({ person_tested: e.target.value });
    if (e.target.value.startsWith('y')) {
      this.setState({ testTaken: true });
    }
    else {
      this.setState({ testTaken: false });
    }
  }

  handleDateChanged = e => {
    this.props.handler({ person_test_date: e.target.value })
  }

  render() {
    return <Card>
      <CardBody>
        <Form>
          <FormGroup tag="fieldset">
            <legend>Have you been tested for COVID-19?</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'no_does_not_want'}
                  onChange={(e) => this.handleTestedChanged(e)} />{' '}
                No, don't want to
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'no_does_want'}
                  onChange={(e) => this.handleTestedChanged(e)} />{' '}
                No, want to
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'yes_positive'}
                  onChange={(e) => this.handleTestedChanged(e)} />{' '}
                Yes, tested negative
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'yes_negative'}
                  onChange={(e) => this.handleTestedChanged(e)} />{' '}
                Yes, tested positive
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'yes_waiting'}
                  onChange={(e) => this.handleTestedChanged(e)} />{' '}
                Yes, waiting for results
              </Label>
            </FormGroup>
            {this.state.testTaken &&
              <FormGroup>
                <Label>Date of test</Label>
                <Input type="date" name="date" onChange={e => this.handleDateChanged(e)} />
              </FormGroup>
            }
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  }
}

class HouseholdBeenTestedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testTaken: null
    };
    this.props.handler({
      household_test_date: null,
      household_tested: null,
    })
  }

  handleDateChanged = e => {
    this.props.handler({ household_test_date: e.target.value })
  }

  handleTestedChanged = e => {
    this.props.handler({ household_tested: e.target.value });
    if (e.target.value.startsWith('y')) {
      this.setState({ testTaken: true });
    }
    else {
      this.setState({ testTaken: false });
    }
  }

  handlePrevClick = () => {
    this.props.handler({ activeStep: 2 })
  }
  handleNextClick = () => {
    this.props.handler({ activeStep: 5 })
  }

  render() {
    return <Card>
      <CardBody>
        <Form>
          <FormGroup tag="fieldset">
            <legend>Has anyone in your household been tested for COVID-19?</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'no'}
                  onChange={(e) => this.handleTestedChanged(e)} />{' '}
                No
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'yes_positive'}
                  onChange={(e) => this.handleTestedChanged(e)} />{' '}
                Yes, tested negative
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'yes_negative'}
                  onChange={(e) => this.handleTestedChanged(e)} />{' '}
                Yes, tested positive
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'yes_waiting'}
                  onChange={(e) => this.handleTestedChanged(e)} />{' '}
                Yes, waiting for results
              </Label>
            </FormGroup>
            {this.state.testTaken &&
              <FormGroup>
                <Label>Date of test</Label>
                <Input type="date" name="date" onChange={e => this.handleDateChanged(e)} />
              </FormGroup>
            }
          </FormGroup>
        </Form>
        <Button onClick={this.handlePrevClick}>Prev</Button>
        <Button onClick={this.handleNextClick}>Next</Button>
      </CardBody>
    </Card>
  }
}

class HaveYouBeenTested extends React.Component {
  render() {
    return <div>
      <YouBeenTestedCard handler={this.props.handler} />
      <HouseholdBeenTestedCard handler={this.props.handler} />
    </div>
  }
}

export default HaveYouBeenTested;
