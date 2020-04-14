import React from 'react';
import { Button, Form, FormGroup, Label, Input, CustomInput, Card, CardBody, CardText } from 'reactstrap';

class HeaderCard extends React.Component {
  render() {
    return <Card>
      <CardBody>
        <CardText>
          Oh no! Let's figure out if you might have COVID-19 based on some simple questions.
        </CardText>
      </CardBody>
    </Card>
  }
}

class TemperatrueCard extends React.Component {
  constructor(props) {
    super(props);
    this.props.handler({
      thermometer_temp: null
    })
  }
  render() {
    return <Card>
      <CardBody>
        <Form>
          <FormGroup>
            <legend >If you have a thermometer, what's your temperature?</legend>
            <Input plaintext value="89% of all people testing positive for COVID-19 have a fever" />
          </FormGroup>
        </Form>
        <Input type="number" placeholder="Enter temperature..." step={0.1}
          onChange={e => this.props.handler({ thermometer_temp: e.target.value })} />
      </CardBody>
    </Card>
  }
}

class BestGuessCard extends React.Component {
  constructor(props) {
    super(props);
    this.props.handler({
      temp_guess: null
    })
  }
  handleFeverGuess = e => {
    this.props.handler({ temp_guess: e.target.value });
  }
  render() {
    return <Card>
      <CardBody>
        <Form>
          <FormGroup>
            <legend >If you don't have a thermometer, what's your best guess?</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio"
                  name="radio1"
                  value={'no_fever'}
                  onChange={e => this.handleFeverGuess(e)} /> {' '}
              No Fever
            </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'maybe_feverish'}
                  onChange={e => this.handleFeverGuess(e)} /> {' '}
              Maybe feverish
            </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'definitely_fever'}
                  onChange={e => this.handleFeverGuess(e)} /> {' '}
              Definitely a fever
            </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value={'worst_fever'}
                  onChange={e => this.handleFeverGuess(e)} /> {' '}
              Worst fever ever
            </Label>
            </FormGroup>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  }
}

class SymptomsCard extends React.Component {
  constructor(props) {
    super(props);
    this.selected = [];
  }
  handleSymptomsSelection = e => {
    debugger;
    if (e.target.checked) {
      this.selected.push(e.target.value);
    }
    else {
      this.selected = this.selected.filter(x => x !== e.target.value);
    }
    this.props.handler({ symptom_list: this.selected })
  }

  handlePrevClick = () => {
    this.props.handler({ activeStep: 0 })
  }

  handleNextClick = () => {
    this.props.handler({ activeStep: 4 })
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <legend>Are you feeling any of these symptoms?</legend>
              <div>
                <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Dry cough" value={'dry_cough'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Loss of taste and/or smell"
                  value={'no_smell_taste'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Extreme fatigue" value={'extreme_fatigue'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox4" label="Wet cough" value={'wet_cough'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox5" label="Shortness of breath" value={'dry_cough'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox6" label="Abdominal pain" value={'abdominal_pain'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox7" label="Diarrhea" value={'diarrhea'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox8" label="Sore throat" value={'sore_throat'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox9" label="Chills" value={'chills'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox10" label="Nausea and/or vomiting" value={'nausea_vomiting'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox11" label="Pressure feeling in chest" value={'pressure_chest'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox12" label="Pink eye" value={'pink_eye'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
                <CustomInput type="checkbox" id="exampleCustomCheckbox13" label="Other" value={'other'}
                  onChange={(e) => this.handleSymptomsSelection(e)} />
              </div>
            </FormGroup>
          </Form>
          <Button onClick={this.handlePrevClick}>Prev</Button>
          <Button onClick={this.handleNextClick}>Next</Button>
        </CardBody>
      </Card>
    )
  }
}


class NotWell extends React.Component {

  render() {
    return (
      <div>
        <HeaderCard handler={this.props.handler} />
        <TemperatrueCard handler={this.props.handler} />
        <BestGuessCard handler={this.props.handler} />
        <SymptomsCard handler={this.props.handler} />
      </div>
    )
  }
}

export default NotWell;
