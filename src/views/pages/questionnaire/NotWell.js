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

const DegreesCInput = ({ form, field }) => {
  return (
    <NumericInput 
      mobile 
      defualtValue={ THERM_DEFAULT } 
      precision={ 2 }
      value={ form.values["therm_temp"] }
      onChange={ value => 
        form.setFieldValue(field.name, value) 
      }
    />
  )
}

const DegreesFInput = ({ form, field }) => {
  return (
    <NumericInput 
      mobile 
      defaultValue={ c_to_f(THERM_DEFAULT) } 
      precision={ 2 }
      value={ c_to_f(form.values["therm_temp"]) }
      onChange={value => 
        form.setFieldValue(field.name, f_to_c(value))
      }
    />
  )
}

const ThermNumInput = ({ field, form }) => {
  const [tempInC, setTempInC] = useState(true);

  const tempContent = 
    tempInC 
    ? <DegreesCInput 
      field={ field } 
      form={ form }
    /> 
    : <DegreesFInput 
      field={ field } 
      form={ form }
    />

  return (
    <div>
      { tempContent }
      <span></span>
      <ButtonGroup>
        <Button 
          color={ tempInC ? "primary" : "secondary" } 
          onClick={ () => setTempInC(!tempInC) }
        >
          °C
        </Button>
        <Button 
          color={ !tempInC ? "primary" : "secondary" } 
          onClick={() => setTempInC(!tempInC)}>°F</Button>
      </ButtonGroup>
    </div>
  )
}

const HasThermometerInput = ({ 
  field, 
  form, 
  setNextDisabled, 
  setHasThermometer 
}) => {
  return (
    <Container >
      <Row>
        <h4 style={{ marginBottom: 30 }}>{"What's your temperature?"}</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col >
          <ThermNumInput field={ field } form={ form } />
        </Col>
      </Row>
      <Row>
        <Button 
          color={ "primary" }
          onClick={() => {
            form.setFieldValue("has_thermometer", false);
            setHasThermometer(false);
            form.values.temp_guess===null && setNextDisabled(true);
          }}
        >
          I don't have a thermometer
        </Button>
      </Row>
    </Container>
  )
}

const NoThermometerInput = ({ form, field, setHasThermometer, setNextDisabled }) => {
  const names_and_labels = temp_guess_names_and_labels.map(nl => {
    nl.onChange = () => { setNextDisabled(false) }
    return nl
  })
  return (
    <Container >
      <Row >
        <h4 style={{ marginBottom: 30 }}>How feverish do you feel?</h4>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <RadioGroup
          names_and_labels={ temp_guess_names_and_labels }
          form={ form }
          field={ field }
        />
      </Row>
      <Row>
        <Button 
          color={"primary"}
          onClick={() => {
            form.setFieldValue("has_thermometer", true);
            setHasThermometer(true);
          }}
        >
          I have a thermometer
        </Button>
      </Row>
    </Container>
  )
}


const NotWellPage = ({ form, values, nextDisabled, setNextDisabled }) => {
  const [hasThermometer, setHasThermometer] = useState(true);
  (nextDisabled && form.values.temp_guess != null) && setNextDisabled(false);
  return (
    <div style={{ marginBottom: 40 }}>
      {
        hasThermometer 
        ? <Field
          component={ HasThermometerInput }
          type="range"
          name="therm_temp"
          setHasThermometer={ setHasThermometer }
          setNextDisabled={ setNextDisabled }
        /> 
        : <Field
          component={ NoThermometerInput }
          type="radio"
          name="temp_guess"
          setHasThermometer={ setHasThermometer }
          setNextDisabled={ setNextDisabled }
        />
      }
      <h4 style={{ marginTop: 40 }}>Please select any symptoms you are feeling.</h4>
      <CheckBoxGroup values={ values } names_and_labels={ symptom_names_and_labels } />
    </div>
  )
}

export { NotWellPage, THERM_DEFAULT };