import React, { useState, useEffect } from 'react';
import CheckBox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import Radio from "../../../components/@vuexy/radio/RadioVuexy"
import { Input, Container, Row } from "reactstrap"
import { Field } from 'formik';
import * as d3 from "d3";

const MyCheckBox = props => {
  return (
    <CheckBox onChange={
      () => props.form.setFieldValue(props.field.name, !props.field.value)}
      label={props.label} size="lg" />
  )
}


const OtherCheckBox = props => {
  var [checked, setChecked] = useState(false)
  return <div>
    <CheckBox onChange={() => { if (checked) { props.form.setFieldValue(props.field.name, null) }; setChecked(!checked); }} label={props.label} size="lg" />
    {checked && <Input type="text" onChange={(e) => { props.form.setFieldValue(props.field.name, e.target.value) }} />}
  </div>
}

const RadioGroup = props => {
  return (
    <Container>
      {props.names_and_labels.map(x => (
        <Row style={{ marginBottom: 7 }}>
          <Radio onChange={
            () => {
              props.form.setFieldValue(props.field.name, x.name);
              if ("onChange" in x) {
                x.onChange();
              }
            }}
            checked={props.form.values[props.field.name] === x.name}
            label={x.label}
            size="lg"
          />
        </Row>
      ))}
    </Container>
  )
}

const CheckBoxGroup = props => {
  return (
    <Container>
      {props.names_and_labels.map(x => (
        <Row style={{ marginBottom: 7 }} >
          <Field
            component={x.name !== "other" ? MyCheckBox : OtherCheckBox}
            type="checkbox"
            label={x.label}
            name={x.name}
            checked={props.values[x.name]} />
        </Row>
      ))}
    </Container>
  )
}

const InputField = props => {
  const [countyData, setCountyData] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // this should hold coords
  const [countyNames, setCountyNames] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null); // this is the value we want... will also need to get coords if available
  const [countyValues, setCountyValues] = useState(null);


  const success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLocation([longitude, latitude]);
  };

  const fetchCountyData = async () => {
    const getPayload = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    await fetch(`https://www.covidx.app/get_county_results`, getPayload)
      .then(res => res.json())
      .then(json => setCountyData(json.payload))
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetchCountyData();
    navigator.geolocation.getCurrentPosition(success, () => console.log("Location not retrieved!"));
  }, []);

  useEffect(() => {
    if (countyData && userLocation) {
      countyData.features.forEach(county => {
        const containing = d3.geoContains(county, userLocation)
        if (containing) {
          const countyText = `${county.properties.NAME}, ${county.properties.STATE_NAME}`
          setSearchInput(countyText);
          // props.form.setFieldValue("location", countyText)
        }
      })
    }
  }, [countyData, userLocation]);

  useEffect(() => {
    if (countyData) {
      setCountyNames(
        countyData.features.map(
          feature => `${feature.properties.NAME}, ${feature.properties.STATE_NAME}`)
      );
      var tempVals = {}
      countyData.features.forEach(
        feature => {
          tempVals[`${feature.properties.NAME}, ${feature.properties.STATE_NAME}`] = {
            latitude: feature.geometry.coordinates[0][0][0][1],
            longitude: feature.geometry.coordinates[0][0][0][0]
          }
        }
      );
      setCountyValues(tempVals);
    }
  }, [countyData]);

  useEffect(() => {
    props.form.setFieldValue("location", searchInput)
  }, [searchInput]);

  return (
    <>
      <Input className="mt-2"
        placeholder="Start typing in your county..."
        // onChange = { event => setSearchInput(event.target.value) }
        list="search-suggest"
        //value={userLocation ? '' : searchInput}
        onChange={e => {
          if (e.target.value in countyValues) {
            var longitude = countyValues[e.target.value].longitude;
            var latitude = countyValues[e.target.value].latitude;
            props.form.setFieldValue("longitude", longitude);
            props.form.setFieldValue("latitude", latitude);
          }
          setSearchInput(e.target.value)

        }}
        readonly={countyData ? false : "readonly"}
      />
      <datalist id="search-suggest">
        {
          countyValues && Object.keys(countyValues).map(
            key => <option value={key}>{key}</option>
          )
        }
      </datalist>
      {
        !countyValues
          ? (<div className="guess">
            <i className="loading-guess">
              One moment. Getting location data
                </i>
          </div>)
          : null
      }
    </>
  )
}

export { CheckBoxGroup, RadioGroup, InputField }
