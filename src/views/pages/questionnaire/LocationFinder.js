import React, { useState, useEffect } from "react";
import { Input, Button } from "reactstrap"
import { Field } from 'formik';
import { GeoInputField } from './Components';

import "./questionnaire.scss"

export default function LocationFinder({ values, setNextDisabled }) {

  values.location && setNextDisabled(false);

  return (
    <div className="location-finder">
      <h4 style={{ color: "#525252" }}>Please enter your <i>county</i> (i.e.: not your <i>country!</i>)</h4>
      <Field
        component={ GeoInputField }
      />
    </div>
  )
};
