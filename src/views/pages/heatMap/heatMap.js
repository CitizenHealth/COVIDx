import React, { useEffect, useState, createRef } from 'react';
import L from "leaflet";
import HeatmapOverlay from "leaflet-heatmap";

import * as d3 from "d3";

import "./heatMap.scss";
import "leaflet/dist/leaflet.css"


export default function HeatMap(props) {
  const fakeHeatData = { data: [] };
  const [stateData, setStateData] = useState(null);
  const [storeMap, setStoreMap] = useState(null);

  const genFakeData = () => {
    return (Math.random() * (180+180)-180).toFixed(3) * 1;
  };

  useEffect(() => {
    const map = L.map('mapId', {
      center:[0,0],
      zoom:10
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom:19,
      minZoom:5,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // find user location
    // const onLocationFound(e) => {
    //   const radius = e.accuracy/2;
    //   L.marker(e.latlng).addTo(map).bindPopup("HERE").openPopup();
    //   L.circle(e.latlng, radius).addTo(map);
    // };
    map.locate({ setView:true })
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

      await fetch(`https://www.covidx.app/get_all_states_positive`, getPayload)
        .then(res => res.json())
        .then(json => setStateData(json.payload))
        .catch(e => console.log(e))
    }; 
    fetchStatePositives();
    setStoreMap(map);
    // create state outlines

    // add heatmap layer
    // for (let i=0; i < 100; i++) {
    //   let coords = {
    //     lat: genFakeData(), 
    //     lon: genFakeData(),
    //     count:Math.round(Math.random()*100)
    //   }
    //   fakeHeatData.data.push(coords);
    // };
    // const heatLayer = new HeatmapOverlay({
    //   radius:2,
    //   maxOpacity:0.8,
    //   scaleRadius:true,
    //   useLocalExtrema:true,
    //   latField:"lat",
    //   lngField:"lon",
    //   valueField:"count"
    // });
    // heatLayer.setData(fakeHeatData);
    // map.addLayer(heatLayer)
  }, []);

  useEffect(() => {
    // stateData.payload
    if (stateData) {
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
      const positives = stateData.features.map(state => state.properties.positive);
      positives.sort((a, b) => a - b);
      const quartiles = [0, 0.25, 0.50, 1].map(p => {
        let q = d3.quantile(positives, p);
        return q
      });
      const getColor = d => {
        return d <= quartiles[0] ? gradient.low.color :
          d <= quartiles[1] ? gradient.medium.color :
          d <= quartiles[2] ? gradient.high.color :
          gradient.super_high.color
      };
      const style = feature => {
        return {
          fillColor: getColor(feature.properties.positive),
          weight: 1,
          color: 'white',
          fillOpacity:0.5,
        }
      }
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
          `<h3>COVID-19 Stats in ${ props ? props.NAME : "THE USA" }</h3>` + 
          (props ? 
            `<h4>Positive Results: ${props.positive}</h4>` : 
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

      const hoverState = (feature, layer) => {
        layer.on({
          mouseover:highlightFeature,
          mouseout:resetHighlight
        });
      };      

      L.geoJson(stateData, {
        style: style, 
        onEachFeature:hoverState
      }).addTo(storeMap);
    };
  }, [stateData])

  return (
    <div id={ 'mapId' } style={{ height:"80vh" }} />
  )
}