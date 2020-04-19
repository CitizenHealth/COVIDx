import React, { useState } from 'react';
import HowAreYouFeeling from "./HowAreYouFeeling";
import { Field, Formik } from "formik";
import {
  Card, CardBody, Container, Row, Button,
} from "reactstrap";
import Wizard from "../../../components/@vuexy/wizard/WizardComponent"
import "rc-slider/assets/index.css"
import "../../../assets/scss/plugins/extensions/slider.scss"
import {
  symptom_names_and_labels,
  underlying_condition_names_and_labels,
} from './QuestionSpecs'
import { NotWellPage, slider_pos_to_C, THERM_DEFAULT } from './NotWell';
import { TestedPage, HouseholdTestedPage } from './Tested';
import MedicalHistoryPage from './MedicalHistory';
import LocationPage from './Location';


// Override default Wizard behaviour so we can go back to HowAreYouFeeling
const WizardStep = props => {
  const [nextDisabled, setNextDisabled] = useState(("nextDisabled" in props));
  return (
    <div>
      <props.component {...props}
        setNextDisabled={setNextDisabled}
      />
      <div className="wizard-actions d-flex justify-content-between">
        <Button color="primary" onClick={props.onPrev}>
          Prev
            </Button>
        <Button color="primary" onClick={props.onNext} disabled={nextDisabled}>
          {("final" in props) ? "Submit" : "Next"}
        </Button>
      </div>
    </div >
  )
}


const NotWellWizard = props => {
  const [activeStep, setActiveStep] = useState(0);
  let steps = [
    {
      title: 1, content: <WizardStep
        component={LocationPage}
        onPrev={props.backToStart}
        onNext={() => setActiveStep(activeStep + 1)}
      />
    },
    {
      title: 2, content: <WizardStep
        component={NotWellPage}
        onPrev={() => setActiveStep(activeStep - 1)}
        onNext={() => { setActiveStep(activeStep + 1) }}
        values={props.values}
      />
    },
    {
      title: 3, content: <WizardStep
        component={TestedPage}
        onPrev={() => setActiveStep(activeStep - 1)}
        onNext={() => setActiveStep(activeStep + 1)}
        values={props.values}
      />
    },
    {
      title: 4, content: <WizardStep
        component={MedicalHistoryPage}
        onPrev={() => setActiveStep(activeStep - 1)}
        onNext={props.onSubmit}
        values={props.values}
        final
        nextDisabled
      />
    },
  ]
  return <Wizard
    steps={steps}
    onFinish={props.submitForm}
    activeStep={activeStep}
    pagination={false} />
}

const FeelingWellWizard = props => {
  const [activeStep, setActiveStep] = useState(0);
  let steps = [
    {
      title: 1, content: <WizardStep
        component={LocationPage}
        onPrev={props.backToStart}
        onNext={() => setActiveStep(activeStep + 1)}
      />
    },
    {
      title: 2, content: <WizardStep
        component={HouseholdTestedPage}
        onPrev={() => setActiveStep(activeStep - 1)}
        onNext={() => setActiveStep(activeStep + 1)}
        values={props.values}
        nextDisabled
      />
    },
    {
      title: 4, content: <WizardStep
        component={MedicalHistoryPage}
        onPrev={() => setActiveStep(activeStep - 1)}
        onNext={props.onSubmit}
        values={props.values}
        nextDisabled
        final
      />
    },
  ]
  return <Wizard
    steps={steps}
    onFinish={props.submitForm}
    activeStep={activeStep}
    pagination={false} />
}


class SelectQuestionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    }
  }

  handleUpdate = update => {
    this.setState(update);
  };

  render() {
    switch (this.state.activeStep) {
      case 0: return <Field component={HowAreYouFeeling} handler={this.handleUpdate} />;
      case 1: return <FeelingWellWizard
        values={this.props.values}
        submitForm={this.props.submitForm}
        backToStart={() => this.setState({ activeStep: 0 })}
      />;
      case 2: return <NotWellWizard
        validateField={this.props.validateField}
        values={this.props.values}
        submitForm={this.props.submitForm}
        backToStart={() => this.setState({ activeStep: 0 })}
      />;
      default: throw new Error(`Invalid activeStep ${this.props.activeStep}`)
    }
  }
}

var initialValues = {};

for (let names_and_labels of [
  underlying_condition_names_and_labels,
  symptom_names_and_labels
]) {
  for (let spec of names_and_labels) {
    initialValues[spec.name] = false;
  }
}

initialValues.self_tested = null
initialValues.self_tested_date = null
initialValues.household_tested = null
initialValues.household_tested_date = null
initialValues.sex = null
initialValues.age = null
initialValues.temp_guess = null
initialValues.therm_temp = slider_pos_to_C(THERM_DEFAULT)


const Questionnaire = (props) => {
  return <Formik
    initialValues={initialValues}
    onSubmit={(values) => alert(JSON.stringify(values))}>
    {(props) => (
      <Container >
        <Row className='justify-content-center'>
          <Card style={{ width: '66%' }}>
            <CardBody>
              <SelectQuestionnaire values={props.values} submitForm={props.submitForm}
                validateField={props.validateField} />
            </CardBody>
          </Card>
        </Row>
      </Container >
    )}
  </Formik >
}

export default Questionnaire;
