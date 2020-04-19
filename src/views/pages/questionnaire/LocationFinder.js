import React, { useState, useEffect } from "react";
import { Input } from "reactstrap"
import L from "leaflet";
import * as d3 from "d3";


export default function LocationFinder() {
  const [stateData, setStateData] = useState(null);
  const [countyData, setCountyData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [containingCounty, setContainingCounty] = useState(null);

  const success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLocation([longitude, latitude])
  };
  const error = () => {
    console.log("not returning anything!")
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
  }, [countyData, userLocation])
  // console.log(containingCounty)

  return (
    <div>
      <h2>{ !containingCounty ? "Guessing your location..." : containingCounty }</h2>
      <Input />
    </div>
  )
};