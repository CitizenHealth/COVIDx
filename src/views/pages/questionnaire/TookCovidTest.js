import React from 'react';
import Flatpickr from "react-flatpickr";
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import "flatpickr/dist/themes/material_green.css";

class TookCovidTest extends React.Component {

  render() {
    let date = new Date();
    return (
      <div>
        <Form onSubmit={ (e) => this.handleNextClick(e)}>
          <FormGroup tag="fieldset">
            <legend>When were you tested for COVID-19?</legend>
            <FormGroup check>
              <Flatpickr
                value={date}
                dateFormat={'m-d-Y'}
                options={{dateFormat: 'm-d-Y'}}
              />
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <legend>What was the result for COVID-19?</legend>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="radio2" value={0} onChange={(e) => this.handleNumPeoplePositive(e)}/>{' '}
                Positive
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="radio2" value={1} onChange={(e) => this.handleNumPeoplePositive(e)}/>{' '}
                Negative
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="radio2" value={2} onChange={(e) => this.handleNumPeoplePositive(e)}/>{' '}
                I don't know yet
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

export default TookCovidTest;
