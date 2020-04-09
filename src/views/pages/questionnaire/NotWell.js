import React from 'react';
import {Button, Form, FormGroup, Label, Input, CustomInput} from 'reactstrap';

class NotWell extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      feverInput: null,
      feverSelection: null,
      symptoms: []
    }
  }

  handleNextClick = e => {
    e.preventDefault();

    const symptoms = {
      feverInput: this.state.feverInput,
      feverSelection: this.state.feverSelection,
      symptoms: this.state.symptoms
    };

    this.props.selectSymptomsAndFever(symptoms);
  };

  handleFeverInput = (e) => {
    this.setState({
      feverInput: e.target.value
    })
  };

  handleFeverSelection = (e) => {
    this.setState({
      feverSelection: e.target.value
    })
  };

  handleSymptomsSelection = (e) => {
    if (e.target.checked) {
      this.setState({
        symptoms: [...this.state.symptoms, e.target.value]
      })
    } else {
      let oldSymptoms = this.state.symptoms;
      const index = this.state.symptoms.indexOf(e.target.value);
      oldSymptoms.splice(index, 1);
      this.setState({
        symptoms: oldSymptoms
      })
    }
  };

  render() {
    return (
      <Form onSubmit={ (e) => this.handleNextClick(e)}>
        <FormGroup>
          <legend>If you have a thermometer, what's your temperature?</legend>
          <Input type="number" name="email" id="exampleEmail" placeholder="98.6"
                 onChange={(e) => this.handleFeverSelection(e)}/>
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>If you don't have a thermometer, what's your best guess?</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio"
                     name="radio1"
                     value={'no_fever'}
                     disabled={this.state.feverInput}
                     onChange={(e) => this.handleFeverSelection(e)}/>{' '}
              No Fever
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" value={'maybe_feverish'} disabled={this.state.feverInput}
                     onChange={(e) => this.handleFeverSelection(e)}/>{' '}
              Maybe feverish
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" value={'definitely_fever'} disabled={this.state.feverInput}
                     onChange={(e) => this.handleFeverSelection(e)}/>{' '}
              Definitely a fever
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" value={'worst_fever'} disabled={this.state.feverInput}
                     onChange={(e) => this.handleFeverInput(e)}/>{' '}
              Worst fever ever
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <legend>Are you feeling any of these symptoms?</legend>
          <div>
            <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Dry Cough" value={'dry_cough'}
                         onChange={(e) => this.handleSymptomsSelection(e)}/>
            <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Loss of taste and/or smell"
                         value={'no_smell_taste'}
                         onChange={(e) => this.handleSymptomsSelection(e)}/>
            <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Extreme Fatigue" value={'extreme_fatigue'}
                         onChange={(e) => this.handleSymptomsSelection(e)}/>
            <CustomInput type="checkbox" id="exampleCustomCheckbox4" label="Wet Cough" value={'wet_cough'}
                         onChange={(e) => this.handleSymptomsSelection(e)}/>
          </div>
        </FormGroup>
        <Button>Prev</Button>
        <Button>Next</Button>
      </Form>
    )
  }
}

export default NotWell;
