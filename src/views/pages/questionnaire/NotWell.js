import React, { useState } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { temp_guess_names_and_labels, symptom_names_and_labels } from './QuestionSpecs';
import { RadioGroup, CheckBoxGroup } from './Components';
import { Field } from 'formik';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css"
import "../../../assets/scss/plugins/extensions/slider.scss"

const c_to_f = degrees_c => {
  return degrees_c * 9 / 5 + 32;
}

const slider_pos_to_C = pos => {
  let along = pos / 100;
  return 34 + (42 - 34) * along;
}

const temp_marks_C = {};
const temp_marks_F = {};

for (const [idx, el] of [...Array(9).keys()].map(x => x + 34).entries()) {

  temp_marks_C[idx * 100 / 8] = el.toString() + "°C";
  temp_marks_F[idx * 100 / 8] = c_to_f(el).toString() + "°F";

}

const THERM_DEFAULT = 30;

const HasThermometerInput = props => {
  const [sliderValue, setSliderValue] = useState(30);
  const [tempInC, setTempInC] = useState(true);
  return (
    <Container >
      <Row>
        <h4 style={{ marginBottom: 30 }}>{"What's your temperature?"}</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col calssName="justify-content-center">
          {tempInC ? slider_pos_to_C(sliderValue).toFixed(2).toString() + "°C" :
            c_to_f(slider_pos_to_C(sliderValue)).toFixed(2).toString() + "°F"}
        </Col>
        <Col xs={8}>
          <Slider defaultValue={THERM_DEFAULT}
            marks={tempInC ? temp_marks_C : temp_marks_F}
            onChange={(value) => { props.form.setFieldValue(props.field.name, slider_pos_to_C(value)); setSliderValue(value) }} />
        </Col >
        <Col calssName="justify-content-center">
          <Button color="primary" onClick={() => setTempInC(!tempInC)}>{tempInC ? "°F" : "°C"}</Button>
        </Col>
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
      <h4 style={{ marginTop: 40 }}>Are you feeling any of these symptoms?</h4>
      <CheckBoxGroup values={props.values} names_and_labels={symptom_names_and_labels} />
    </div >
  )
}

export { NotWellPage, slider_pos_to_C, THERM_DEFAULT };