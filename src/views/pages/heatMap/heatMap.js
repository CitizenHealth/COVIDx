import React, { useEffect, useState, createRef } from 'react';
import L from "leaflet";
import HeatmapOverlay from "leaflet-heatmap";

import * as d3 from "d3";

import "./heatMap.scss";
import "leaflet/dist/leaflet.css"


export default function HeatMap(props) {
  const fakeHeatData = { data: [] };
  const [stateData, setStateData] = useState(null);
  const [countyData, setCountyData] = useState(null);
  const [storeMap, setStoreMap] = useState(null);

  // const genFakeData = () => {
  //   return (Math.random() * (180+180)-180).toFixed(3) * 1;
  // };

  useEffect(() => {
    const map = L.map('mapId', {
      center:[0,0],
      zoom:3
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom:7,
      minZoom:3,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // find user location
    // const onLocationFound(e) => {
    //   const radius = e.accuracy/2;
    //   L.marker(e.latlng).addTo(map).bindPopup("HERE").openPopup();
    //   L.circle(e.latlng, radius).addTo(map);
    // };
    map.locate({  })
      .on('locationfound', e => {
        const radius = e.accuracy/2;
        // L.marker([e.latitude, e.longitude]).bindPopup("HERE").openPopup().addTo(map);
        L.circle(e.latlng, radius).addTo(map);
      })
      .on("locationerror", e => {
        console.log('user not found')
      });
    // fetch data from server to serve up state data
    const fetchStatePositives = async () => {
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
    // fetch county data for filtered view
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

    fetchStatePositives();
    fetchCountyData();
    setStoreMap(map);
  }, []);

  useEffect(() => {
    if (stateData && countyData) {
      // create the color gradients...
      const gradient = {
        low: {
          color:"#14ff00"
        },
        medium: {
          color:"#bcc300"
        },
        high: {
          color: "#eb8700"
        },
        super_high: {
          color: "#ff0000"
        },
      }
      const getColor = ({ features, level }) => {
        const positives = level==='state' ? 
        (
          stateData.features
            .map(state => state.properties.positive)
            .filter(state => state)
        ) : 
        (
          countyData.features
            .map(state => state.properties.cases)
            .filter(state => state)
        )
        positives.sort((a, b) => a - b);
        const quartiles = [0, 0.25, 0.50, 1].map(p => {
          let q = d3.quantile(positives, p);
          return q
        });
        return (
          features <= quartiles[0] ? gradient.low.color :
          features <= quartiles[1] ? gradient.medium.color :
          features <= quartiles[2] ? gradient.high.color :
          gradient.super_high.color
        )
      };
      const style = feature => {
        let feat
        if (feature.properties.positive) {
          feat = { 'features': feature.properties.positive, 'level': 'state'}
        } else {
          feat = { 'features': feature.properties.cases, 'level': 'county' }
        }
        return {
          fillColor: getColor(feat),
          weight: 1,
          color: 'white',
          fillOpacity:0.5,
        }
      };
      // add info box
      var info = L.control();

      info.onAdd = function(map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
      };

      // method that we will use to update the control based on feature properties passed
      info.update = function(props) {
        this._div.innerHTML = 
          `<h3>COVID-19 Stats ${ props ? `in <br />${props.NAME}` : "" }</h3>` + 
          (props ? 
            `<h4>Positive Cases: ${props.positive ? props.positive : props.cases}</h4>` : 
            "<h4>Hover over a state</h4>")
        // this._div.innerHTML = '<h4>Positive results in </h4>' +  (props ?
        //   '<b>' + props.positive + '</b><br />' : 'Hover over a state');
      };
      info.addTo(storeMap);


      // add hover states
      const highlightFeature = e => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity:0.8
        });
        info.update(layer.feature.properties)
      };

      const resetHighlight = e => {
        // geojson.resetStyle(e.target)
        const layer = e.target;
        layer.setStyle({
          fillOpacity:0.5
        });
        info.update();
      };

      const showCountyData = e => {
        if (e.target.feature.properties.positive) {
          storeMap.fitBounds(e.target.getBounds());
          storeMap.removeLayer(e.target)
          const stateName = e.target.feature.properties.NAME;
          const statePayload = countyData.features.filter(feat => feat.properties.STATE_NAME===stateName);
          const countyPayload = { ...statePayload, features:statePayload };
          let gjCounty = L.geoJson(countyPayload, {
            style: style, 
            onEachFeature:hoverState
          });
          gjCounty.addTo(storeMap);
        }
      };

      const hoverState = (feature, layer) => {
        layer.on({
          mouseover:highlightFeature,
          mouseout:resetHighlight,
          click: showCountyData
        });
      };

      let gj = L.geoJson(stateData, {
        style: style, 
        onEachFeature:hoverState
      });
      gj.addTo(storeMap);
      storeMap.fitBounds(L.geoJson(countyData).getBounds());

      // add county filter
    };
  }, [stateData, countyData])

  return (
    <div id={ 'mapId' } style={{ height:"80vh" }} />
  )
}