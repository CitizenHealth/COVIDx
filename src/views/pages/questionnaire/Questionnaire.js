import React, { useState, useContext } from 'react';
import HowAreYouFeeling from "./HowAreYouFeeling";
import { Field, Formik } from "formik";
import { Button } from "reactstrap";
import Wizard from "../../../components/@vuexy/wizard/WizardComponent"
import "rc-slider/assets/index.css"
import "../../../assets/scss/plugins/extensions/slider.scss"
import {
  symptom_names_and_labels,
  underlying_condition_names_and_labels,
} from './QuestionSpecs'
import { NotWellPage, THERM_DEFAULT } from './NotWell';
import { TestedPage, HouseholdTestedPage } from './Tested';
import MedicalHistoryPage from './MedicalHistory';
import LocationFinder from './LocationFinder';
import { UserContext } from "App";
import { customPost } from "utility/customFetch"
const FormSubmitted = () => {
  return (
    <div>
      <h2 className="pb-1">Thank you for your help!</h2>
      <h4 className="py-1">Report successfully submitted.</h4>
      <h4 className="py-1">Check back in tomorrow to continue the fight against COVID-19!</h4>
    </div>
  )
}

// Override default Wizard behaviour so we can go back to HowAreYouFeeling
const WizardStep = props => {
  const user = useContext(UserContext);
  const [nextDisabled, setNextDisabled] = useState(("nextDisabled" in props));

  return (
    <div>
      <props.component {...props}
        setNextDisabled={setNextDisabled}
      />
      {
        ("final" in props) &&
        user &&
        <div style={{ textAlign: "right", padding: "1rem 0" }}>
          <i>Please log in to save your results</i>
        </div>
      }
      <div className="wizard-actions d-flex justify-content-between">
        <Button color="primary" onClick={props.onPrev}>
          Prev
        </Button>
        <Button color="primary" onClick={props.onNext} disabled={nextDisabled}>
          {
            ("final" in props) ? "Submit" : "Next"
          }
        </Button>
      </div>
    </div>
  )
}

const NotWellWizard = ({ backToStart, values, submitForm, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  let steps = [
    {
      title: 1, content: <WizardStep
        component={LocationFinder}
        onPrev={backToStart}
        onNext={() => setActiveStep(activeStep + 1)}
        values={ values }
      //   nextDisabled
      />
    },
    {
      title: 2, content: <WizardStep
        component={ NotWellPage }
        onPrev={() => setActiveStep(activeStep - 1)}
        onNext={() => { setActiveStep(activeStep + 1) }}
        values={values}
      />
    },
    {
      title: 3, content: <WizardStep
        component={TestedPage}
        onPrev={() => setActiveStep(activeStep - 1)}
        onNext={() => setActiveStep(activeStep + 1)}
        values={values}
      />
    },
    {
      title: 4, content: <WizardStep
        component={MedicalHistoryPage}
        onPrev={() => setActiveStep(activeStep - 1)}
        onNext={onSubmit}
        values={values}
        final
        nextDisabled
      />
    },
  ]
  return <>
    {
      !formSubmitted
        ? (<Wizard
          steps={steps}
          onFinish={() => {
            submitForm();
            setFormSubmitted(true);
          }
          }
          activeStep={activeStep}
          pagination={false} />)
        : (<FormSubmitted />)
    }
  </>
}

const FeelingWellWizard = ({ backToStart, values, onSubmit,submitForm }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  let steps = [
    {
      title: 1, content: <WizardStep
        component={LocationFinder}
        onPrev={backToStart}
        onNext={() => setActiveStep(activeStep + 1)}
        values={values}
      //   nextDisabled
      />
    },
    {
      title: 2, content: <WizardStep
        component={HouseholdTestedPage}
        onPrev={() => setActiveStep(activeStep - 1)}
        onNext={() => setActiveStep(activeStep + 1)}
        values={values}
        nextDisabled
      />
    },
    {
      title: 3, content: <WizardStep
        component={MedicalHistoryPage}
        onPrev={() => setActiveStep(activeStep - 1)}
        onNext={onSubmit}
        values={values}
        nextDisabled
        final
      />
    },
  ]
  return <>
    {
      !formSubmitted
        ? (<Wizard
          steps={steps}
          onFinish={() => {
            submitForm();
            setFormSubmitted(true);
          }
          }
          activeStep={activeStep}
          pagination={false} />)
        : (<FormSubmitted />)
    }
  </>
}

const SelectQuestionnaire = ({ values, submitForm, validateField }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleUpdate = update => {
    setActiveStep(update.activeStep);
  };

  const stepSwitch = () => {
    let component;
    switch (activeStep) {
      case 0: 
        console.log('steppin')
        component = 
          <Field 
            component={ HowAreYouFeeling } 
            handler={ handleUpdate } 
          />;
        break;
      case 1:
        component = 
          <FeelingWellWizard
            values={ values }
            submitForm={ submitForm }
            backToStart={() => setActiveStep(0)}
          />;
        break;
      case 2:
        component = 
          <NotWellWizard
            validateField={ validateField }
            values={ values }
            submitForm={ submitForm }
            backToStart={() => setActiveStep(0)}
          />;
        break;
      default:
        component = <div>oops, you've took a wrong turn!</div>;
    }
    return component;
  }; 
  return stepSwitch();
}


// var initialValues = {};
// for (let names_and_labels of [
//   underlying_condition_names_and_labels,
//   symptom_names_and_labels
// ]) {
//   for (let spec of names_and_labels) {
//     initialValues[spec.name] = false;
//   }
// };
// console.log(underlying_condition_names_and_labels)
// console.log(symptom_names_and_labels)
// console.log(initialValues)

const combinedLabels = [...underlying_condition_names_and_labels, ...symptom_names_and_labels]
const initialValues = combinedLabels.reduce((acc, cur) => {
  acc[cur.name] = false
  return acc
}, {})

initialValues.location = null
initialValues.self_tested = null
initialValues.self_tested_date = null
initialValues.household_tested = null
initialValues.household_tested_date = null
initialValues.sex = null
initialValues.age = 33
initialValues.temp_guess = null
initialValues.therm_temp = THERM_DEFAULT

const handleSubmit = (values, accessToken) => {
  
  if (values.self_tested_date instanceof Date) {
    values.self_tested_date = (values.self_tested_date.getYear() + 1900) + "-" + values.self_tested_date.getMonth() + "-" + values.self_tested_date.getDate();
  }
  if (values.household_tested_date instanceof Date) {
    values.household_tested_date = (values.household_tested_date.getYear() + 1900) + "-" + values.household_tested_date.getMonth() + "-" + values.household_tested_date.getDate();
  }
  if (values.has_thermometer) {
    delete values.temp_guess;
  } else if (values.has_thermometer === false) {
    delete values.therm_temp
  }
  delete values.has_thermometer
  delete values.location

  customPost("/create_survey_response", accessToken, values); // this needs to be tested
}

const Questionnaire = (props) => {
  const user = useContext(UserContext);
  return (<Formik
    initialValues={initialValues}
    onSubmit={values => handleSubmit(values, user.accessToken)}>
    {(props) => (
      <SelectQuestionnaire values={props.values} submitForm={props.submitForm}
        validateField={props.validateField} />
    )}
  </Formik>
  );
}

export default Questionnaire;
