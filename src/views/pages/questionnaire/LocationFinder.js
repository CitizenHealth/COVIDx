import React, { useState, useEffect } from "react";
import { Input, Button } from "reactstrap"
import { Field } from 'formik';
import { InputField } from './Components';

import "./questionnaire.scss"

export default function LocationFinder(props) {

  if (props.values.location) {
    props.setNextDisabled(false);
  };

  return (
    <div className="location-finder">
      <h2 style={{ color: "#525252" }}>We'll try to guess your county, but if we're wrong, please type it in below!</h2>
      <Field
        component={InputField}
      />
    </div>
  )
};