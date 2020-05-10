import React, { useState, useEffect, useContext } from 'react';
import CheckBox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import Radio from "../../../components/@vuexy/radio/RadioVuexy"
import { Input, Container, Row } from "reactstrap"
import { Field } from 'formik';
import * as d3 from "d3";
import { UserContext } from "App";
import { customGet } from "utility/customFetch";

const MyCheckBox = ({ form, field, label }) => {
  return (
    <CheckBox 
      onChange={ () => 
        form.setFieldValue(field.name, field.value)
      }
      label={ label } 
      size="lg" 
    />
  )
}


const OtherCheckBox = ({ form, field, label }) => {
  var [checked, setChecked] = useState(false)
  const checkHandler = () => {
    return checked ? form.setFieldValue(field.name, null) : setChecked(!checked)
  }
  return (
    <div>
      <CheckBox 
        onChange={ checkHandler }
        label={label} 
        size="lg" 
      />
      {
        checked 
        && <Input 
          type="text" 
          onChange={ e =>
            form.setFieldValue(field.name, e.target.value)
          }
        />
      }
    </div>
  )
}

const RadioGroup = ({ form, field, names_and_labels }) => {


  const content = names_and_labels.map(label => (
    <Row style={{ marginBottom: 7 }}>
      <Radio 
        onChange={() => {
          form.setFieldValue(field.name, label.name);
          "onChange" in label && label.onChange()
        }}
        checked={form.values[field.name] === label.name}
        label={label.label}
        size="lg"
      />
    </Row>
  ))

  return (
    <Container>
      { content }
    </Container>
  )
}

const CheckBoxGroup = ({ names_and_labels, values }) => {
  return (
    <Container>
      {names_and_labels.map(label => (
        <Row style={{ marginBottom: 7 }} >
          <Field
            component={ label.name !== "other" ? MyCheckBox : OtherCheckBox }
            type="checkbox"
            label={ label.label }
            name={ label.name }
            checked={ values[label.name] } 
          />
        </Row>
      ))}
    </Container>
  )
}

const GeoInputField = ({ form }) => {
  // const [countyData, setCountyData] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // this should hold coords
  const [countyNames, setCountyNames] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null); // this is the value we want... will also need to get coords if available
  const [countyValues, setCountyValues] = useState(null);
  const user = useContext(UserContext);


  const success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLocation([longitude, latitude]);
  };

  const countyData = customGet("/get_county_results", user.accessToken);
  useEffect(() => {
    // fetchCountyData();
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
    form.setFieldValue("location", searchInput)
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
            form.setFieldValue("longitude", longitude);
            form.setFieldValue("latitude", latitude);
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

export { CheckBoxGroup, RadioGroup, GeoInputField }
