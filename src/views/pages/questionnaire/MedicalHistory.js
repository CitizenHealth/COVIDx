import React, { useContext } from 'react';
import { Row, Container } from 'reactstrap';
import { CheckBoxGroup, RadioGroup } from './Components';
import { Field } from 'formik';
import {
  age_names_and_labels,
  underlying_condition_names_and_labels,
  sex_names_and_labels,
} from './QuestionSpecs';
import { UserContext } from "App";


import NumericInput from 'react-numeric-input';

const AgeField = ({ form }) => {
  return (
    <NumericInput 
      mobile
      value={ form.values["age"] }
      onChange={value => {
        form.setFieldValue("age", value);
      }} 
    />
  )
}

const MedicalHistoryPage = ({ values, setNextDisabled }) => {
  const user = useContext(UserContext);

  (values.age && values.sex) && user && setNextDisabled(false);

  return (
    <Container style={{ marginBottom: 40 }}>
      <Row>
        <h4>How old are you?</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Field component={AgeField} />
      </Row>
      <Row>
        <h4>What was your sex at birth?</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Field
          component={RadioGroup}
          names_and_labels={sex_names_and_labels}
          name="sex" />
      </Row>
      <Row>
        <h4>Please select any medical conditions you have.</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <CheckBoxGroup
          names_and_labels={underlying_condition_names_and_labels}
          values={values}
        />
      </Row>
    </Container>
  )
}

export default MedicalHistoryPage;