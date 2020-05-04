import React, { useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import { temp_guess_names_and_labels, symptom_names_and_labels } from './QuestionSpecs';
import { RadioGroup, CheckBoxGroup } from './Components';
import { Field } from 'formik';
import NumericInput from 'react-numeric-input';
import "rc-slider/assets/index.css"
import "../../../assets/scss/plugins/extensions/slider.scss"


const c_to_f = degrees_c => {
  return degrees_c * 9 / 5 + 32;
}

const f_to_c = degrees_f => {
  return (degrees_f - 32) * 5 / 9;
}

const temp_marks_C = {};
const temp_marks_F = {};

for (const [idx, el] of [...Array(9).keys()].map(x => x + 34).entries()) {

  temp_marks_C[idx * 100 / 8] = el.toString() + "°C";
  temp_marks_F[idx * 100 / 8] = c_to_f(el).toString() + "°F";

}

const THERM_DEFAULT = 36.5;

const DegreesCInput = props => {
  return (
    <NumericInput mobile defualtValue={THERM_DEFAULT} precision={2}
      value={props.form.values["therm_temp"]}
      onChange={(value) => {
        props.form.setFieldValue(props.field.name, value);
      }} />
  )
}

const DegreesFInput = props => {
  return (
    <NumericInput mobile defaultValue={c_to_f(THERM_DEFAULT)} precision={2}
      value={c_to_f(props.form.values["therm_temp"])}
      onChange={(value) => {
        props.form.setFieldValue(props.field.name, f_to_c(value));
      }} />
  )
}

const ThermNumInput = props => {
  const [tempInC, setTempInC] = useState(true);
  return (
    <div>{tempInC ? <DegreesCInput field={props.field} form={props.form}
    /> :
      <DegreesFInput field={props.field} form={props.form}
      />}
      <span></span>
      <ButtonGroup>
        <Button color={tempInC ? "primary" : "secondary"} onClick={() => setTempInC(!tempInC)}>°C</Button>
        <Button color={!tempInC ? "primary" : "secondary"} onClick={() => setTempInC(!tempInC)}>°F</Button>
      </ButtonGroup>
    </div>
  )
}

const HasThermometerInput = props => {
  return (
    <Container >
      <Row>
        <h4 style={{ marginBottom: 30 }}>{"What's your temperature?"}</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col >
          <ThermNumInput field={props.field} form={props.form} />
        </Col >
      </Row>
      <Row><Button color={"primary"}
        onClick={() => {
          props.form.setFieldValue("has_thermometer", false);
          props.setHasThermometer(false);
          if (props.form.values.temp_guess === null) {
            props.setNextDisabled(true);
          }
        }}>
        I don't have a thermometer</Button></Row>
    </Container>
  )
}

const NoThermometerInput = props => {
  var names_and_labels = [...temp_guess_names_and_labels];
  for (var nl of names_and_labels) {
    nl["onChange"] = () => { props.setNextDisabled(false); }
  }
  return (
    <Container >
      <Row >
        <h4 style={{ marginBottom: 30 }}>How feverish do you feel?</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <RadioGroup
          names_and_labels={temp_guess_names_and_labels}
          form={props.form}
          field={props.field}
        />
      </Row>
      <Row>
        <Button color={"primary"}
          onClick={() => {
            props.form.setFieldValue("has_thermometer", true);
            props.setHasThermometer(true);

          }}>I have a thermometer</Button></Row>
    </Container>
  )
}


const NotWellPage = props => {
  const [hasThermometer, setHasThermometer] = useState(true);
  if (props.nextDisabled && (props.form.values.temp_guess != null)) {
    props.setNextDisabled(false);
  }
  return (
    <div style={{ marginBottom: 40 }}>
      {hasThermometer ? <Field
        component={HasThermometerInput}
        type="range"
        name="therm_temp"
        setHasThermometer={setHasThermometer}
        setNextDisabled={props.setNextDisabled}
      /> :
        <Field
          component={NoThermometerInput}
          type="radio"
          name="temp_guess"
          setHasThermometer={setHasThermometer}
          setNextDisabled={props.setNextDisabled}
        />}
      <h4 style={{ marginTop: 40 }}>Please select any symptoms you are feeling.</h4>
      <CheckBoxGroup values={props.values} names_and_labels={symptom_names_and_labels} />
    </div >
  )
}

export { NotWellPage, THERM_DEFAULT };