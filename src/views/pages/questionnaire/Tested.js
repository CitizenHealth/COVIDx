import React, { useState } from 'react';
import { RadioGroup } from './Components';
import { Label, Input, Container, Row } from 'reactstrap';
import { Field } from 'formik';
import { household_tested_names_and_labels, self_tested_names_and_labels } from './QuestionSpecs';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { useEffect } from 'react';

const TestedSection_ = props => {
  const [testTaken, setTestTaken] = useState(null);
  let names_and_labels = [...props.names_and_labels];
  names_and_labels[0]["onChange"] = () => { setTestTaken(false); };
  for (let i of [1, 2, 3]) {
    names_and_labels[i]["onChange"] = () => setTestTaken(true);
  }
  return (
    <div>
      <RadioGroup names_and_labels={names_and_labels} form={props.form} field={props.field} />
      {testTaken &&
        <div>
          <Label>Date of test:</Label>
          <Input
            type="date"
            name="date"
            data-date-inline-picker="ture"
            inline-picker
            color="primary"
            value={props.form.values[props.field.name + "_date"]} />
        </div>}
    </div>
  )
}

const TestedSection = props => {
  const [testTaken, setTestTaken] = useState(null);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    props.form.setFieldValue(
      props.field.name + "_date", date)
  }, [date])
  let names_and_labels = [...props.names_and_labels];
  names_and_labels[0]["onChange"] = () => { setTestTaken(false); };
  for (let i of [1, 2, 3]) {
    names_and_labels[i]["onChange"] = () => setTestTaken(true);
  }
  return (
    <div>
      <RadioGroup names_and_labels={names_and_labels} form={props.form} field={props.field} />
      {testTaken &&
        <div>
          <Label>Date of test:</Label>
          <Flatpickr
            options={{ inline: true }}
            value={date}
            onChange={
              value => {
                setDate(value);
              }}
          />
        </div>}
    </div>
  )
}

const validateTestedPage = values => {
  if ((values.self_tested === null) || (values.household_tested === null)) {
    return false;
  }
  var household_valid = true;
  if (values.household_tested === "household_not_tested") {
    household_valid = true;
  }
  else if (values.household_tested_date === null) {
    household_valid = false;
  }

  var self_valid = true;
  if (values.self_tested === "self_not_tested") {
    self_valid = true;
  }
  else if (values.self_tested_date === null) {
    self_valid = false;
  }
  return (household_valid && self_valid);
}

const TestedPage = props => {
  if (validateTestedPage(props.values)) {
    props.setNextDisabled(false);
  }
  else {
    props.setNextDisabled(true);
  }

  return (
    <Container style={{ marginBottom: 40 }}>
      <Row>
        <h4>Have you been tested for COVID-19?</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Field
          component={TestedSection}
          names_and_labels={self_tested_names_and_labels}
          name="self_tested" />
      </Row>
      <Row>
        <h4>Has anyone in your household been tested for COVID-19?</h4>
      </Row>
      <Row>
        <Field
          component={TestedSection}
          names_and_labels={household_tested_names_and_labels}
          name="household_tested" />
      </Row>
    </Container>
  )
}

const validateHouseholdTestedPage = values => {
  if (values.household_tested === null) {
    return false;
  }
  if (values.household_tested === "household_not_tested") {
    return true;
  }
  if (values.household_tested_date === null) {
    return false;
  }
  return true;
}

const HouseholdTestedPage = props => {
  if (validateHouseholdTestedPage(props.values)) {
    props.setNextDisabled(false);
  }
  else {
    props.setNextDisabled(true);
  }
  return (<Container style={{ marginBottom: 40 }}>
    <Row style={{ marginBottom: 30 }}>
      <h4>Has anyone in your household been tested for COVID-19?</h4>
    </Row>
    <Row>
      <Field
        component={TestedSection}
        names_and_labels={household_tested_names_and_labels}
        name="household_tested" />
    </Row>
  </Container>)

}

export { TestedPage, HouseholdTestedPage }