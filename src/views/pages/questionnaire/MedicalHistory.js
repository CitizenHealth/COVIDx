
import React from 'react';
import { Row, Container } from 'reactstrap';
import { CheckBoxGroup, RadioGroup } from './Components';
import { Field } from 'formik';
import {
    age_names_and_labels,
    underlying_condition_names_and_labels,
    sex_names_and_labels,
} from './QuestionSpecs';

import { connect } from "react-redux";
import { setAuth } from "redux/actions/auth/authAction";



export const MedicalHistoryPage = props => {
  if (
    (props.values.age && props.values.sex) &&
    (props.auth.login.isAuthenticated || localStorage.getItem("user_info"))
    ) {
    props.setNextDisabled(false)
  }
  return (
    <Container style={{ marginBottom: 40 }}>
      <Row>
        <h4>How old are you?</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
      <Field
        component={RadioGroup}
        names_and_labels={age_names_and_labels}
        name="age" />
      </Row>
      <Row>
        <h4>Are you male or female?</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Field
          component={RadioGroup}
          names_and_labels={sex_names_and_labels}
          name="sex" />
      </Row>
      <Row>
        <h4>Do you have any of these medical conditions?</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <CheckBoxGroup
          names_and_labels={underlying_condition_names_and_labels}
          values={props.values}
        />
      </Row>
    </Container >
  )
}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { setAuth })(MedicalHistoryPage);
