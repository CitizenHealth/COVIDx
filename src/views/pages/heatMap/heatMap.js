import React, { 
  useEffect, 
  useState, 
  useMemo, 
  useContext 
} from 'react';
import { UserContext } from "App";

import L from "leaflet";
import * as d3 from "d3";

import "./heatMap.scss";
import "leaflet/dist/leaflet.css";
// import { axiosInstance } from "App";
// import axios from "axios"
import { customGet } from "utility/customFetch";
const formatNumber = num => {
  return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0
}


export default function HeatMap(props) {
  const [stateData, setStateData] = useState(null);
  const [countyData, setCountyData] = useState(null);
  const [storeMap, setStoreMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [containingCounty, setContainingCounty] = useState(null);
  const [hideInstruction, setHideInstruction] = useState(false);
  const user = useContext(UserContext);

  function createDefaultMap() {
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
    map.locate({ setView:true })
      .on('locationfound', e => {
        const radius = e.accuracy/2;
        L.circle(e.latlng, radius).addTo(map);
        setUserLocation(e.latlng);
      })
      .on("locationerror", e => {
        console.log('user not found')
      });
    return map;
  };

  useEffect(() => {
    const map = createDefaultMap();
    if (user) {
      customGet("/get_state_results", user.accessToken)
        .then(res => setStateData(res));
      customGet("/get_county_results", user.accessToken)
        .then(res => setCountyData(res));
    };
    setStoreMap(map);

    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "loading")
    newDiv.setAttribute("id", "loading")
    document.getElementById("map-wrapper").appendChild(newDiv);

  }, []);

  useEffect(() => {
    if (stateData && countyData && containingCounty) {
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
        if (!features) { features=0 }
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

      // console.log(containingCounty)
      // method that we will use to update the control based on feature properties passed
      info.update = function(props) {
        this._div.innerHTML = 
          // `<h3>COVID-19 Stats ${ props ? `in <br />${props.NAME}` : "" }</h3>` + 
          `<div class="info-child"><h6>*you*</h6>` + 
          `<h5>Your County: ${containingCounty && containingCounty.properties.NAME}</h5>` + 
          `<h5>Positive Cases in ${containingCounty && containingCounty.properties.NAME}: ${containingCounty && formatNumber(containingCounty.properties.cases)}</h5></div>` + 
          `<div class="info-child"><h6>*hovered*<h6>` + 
          (props ? 
            `<h5>Positive Cases in ${props.NAME} : ${props.positive ? formatNumber(props.positive) : formatNumber(props.cases)}</h5>` : 
            "<h5>Hover over a state</h5>") + 
          `</div>`+
          `<div class="info-child"><h6>*tip*</h6>` + 
          `<h5>Click a state to view its counties</h5>`
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
        onEachFeature: hoverState,
      });
      gj.once("add", () => {
        const parentElem = document.getElementById("map-wrapper");
        const childElem = document.getElementById("loading");
        parentElem.removeChild(childElem);
      });
      gj.addTo(storeMap);
      // storeMap.fitBounds(L.geoJson(countyData).getBounds());

      // add reset button
      var customControl =  L.Control.extend({
        options: {
          position: 'topright'
        },

        onAdd: function (map) {
          var container = L.DomUtil.create('input');
          container.type="button";
          // container.title="ResetButton";
          container.value = "Fit to USA and reset state view";

          container.onclick = () => {
            map.fitBounds(L.geoJson(countyData).getBounds());
            map.eachLayer(layer => {
              layer instanceof L.GeoJSON && map.removeLayer(layer);
            })
            gj.addTo(storeMap);
          };

          return container;
        }
      });
    storeMap.addControl(new customControl());
    };
  }, [stateData, countyData, containingCounty])

  
  useEffect(() => {
    // find intersecting countydata and userlocation
    console.log('countyData @ => ', countyData)
    if (countyData && userLocation) {
      countyData.payload.features.forEach(county => {
        let location = [userLocation.lng, userLocation.lat];
        // console.log(location)
        d3.geoContains(county, location) && setContainingCounty(county);
      })
    }
  }, [countyData, userLocation])

  // console.log(containingCounty)


  const onClickInstruction = () => {
    setHideInstruction(true);
  };

  return (
    <div className="map-wrapper" id="map-wrapper">
      <div id={ 'mapId' } />
      <div className={ hideInstruction ? "popup hide" : "popup" } id="instruction-box">
        {/* <div className="exit">x</div> */}
        <h2>Instructions:</h2>
        <p>
          This map will show COVID-19 cases by state and county. 
          <strong> To view county results, please click on a state! </strong>
          The map will then zoom into that state's county's results.
        </p>
        <p>
          We like to think that the colors here are intuitive: green is <strong style={{ color:"#14ff00" }}>good</strong>, and red is <strong style={{ color:"#ff0000" }}>bad</strong>. 
          These results are split by quartile: state results are measured against states, 
          and county results are measured against counties.
        </p>
        <p>
          You'll also notice a little blue dot. 
          That's where you are (or, at least, our best guess)!
        </p>
        <h2 className="start" onClick={ onClickInstruction }>Start now</h2>
      </div>
    </div>
  )
}