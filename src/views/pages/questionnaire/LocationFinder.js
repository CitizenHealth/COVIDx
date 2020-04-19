import React, { useState, useEffect } from "react";
import { Input, Button } from "reactstrap"
import L from "leaflet";
import * as d3 from "d3";

import "./questionnaire.scss"

export default function LocationFinder() {
  const [stateData, setStateData] = useState(null);
  const [countyData, setCountyData] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // this should hold coords
  const [containingCounty, setContainingCounty] = useState(null);
  const [countyNames, setCountyNames] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [searchOutput, setSearchOutput] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null); // this is the value we want... will also need to get coords if available

  const success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLocation([longitude, latitude]);
  };
  const error = () => {
    console.log("not returning anything!");
  };

  const fetchStateData = async () => {
    const getPayload = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    await fetch(`https://www.covidx.app/get_state_results`, getPayload)
      .then(res => res.json())
      .then(json => setStateData(json.payload))
      .catch(e => console.log(e))
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
      .catch(e => console.log(e))
  }; 

  useEffect(() => {
    fetchStateData();
    fetchCountyData();
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (countyData && userLocation) {
      countyData.features.forEach(county => {
        d3.geoContains(county, userLocation) && 
          setContainingCounty(
            `${county.properties.NAME}, ${county.properties.STATE_NAME}`
          );
      })
    }
  }, [countyData, userLocation]);

  useEffect(() => {
    if (countyData) {
      setCountyNames(countyData.features.map(feature => `${feature.properties.NAME}, ${feature.properties.STATE_NAME}`));
    }
  }, [countyData]);


  useEffect(() => {
    if (searchInput && countyNames) {
      const lowerCaseSearchInput = searchInput.toLowerCase();
      const filteredCountyNames = countyNames.filter(county => {
        const lowerCaseCounty = county.toLowerCase();
        return lowerCaseCounty.startsWith(lowerCaseSearchInput);
      });
      setSearchOutput(filteredCountyNames);
    }
  }, [searchInput]);


  return (
    <div className="questionnaire">
      <div className="location-finder">
        <h2 style={{ color:"#525252" }}>We'll try to guess your county, but if we're wrong, please type it in below!</h2>
        <div className="guess">
          {/* <h3>{ !containingCounty ? "Guessing your location" : containingCounty }</h3> */}
          {
            !containingCounty ?
            <i className="loading-guess">
              Guessing your location
            </i> : 
            <h3>
              {containingCounty}
            </h3>
          }
          { containingCounty && <Button color="primary" onClick={ () => setSelectedCounty(containingCounty) }>Is this correct?</Button> }
        </div>
        <Input 
          placeholder="Start typing in your county..." 
          id="location-input" 
          onChange = { event => setSearchInput(event.target.value) }
        />
        <div className={searchInput ? "autocomplete" : "autocomplete hidden"}>
          <ul>
            {
              searchOutput && searchInput && 
              searchOutput.map(
                name => <li key={ name } onClick={ e => setSelectedCounty(name) }>{name}</li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
};