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
      <h4 style={{ color: "#525252" }}>Please enter your county</h4>
      <h6 style={{ color: "#525252" }}>Note: We're asking for your county (ex. San Diego, USA), not country (ex. USA)</h6>
      <Field
        component={InputField}
      />
    </div>
  )
};
