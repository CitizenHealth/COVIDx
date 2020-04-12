import React, { useEffect, useState, createRef } from 'react';
import L from "leaflet";
import HeatmapOverlay from "leaflet-heatmap";

import "./heatMap.scss";
import "leaflet/dist/leaflet.css"


export default function HeatMap(props) {
  const fakeHeatData = { data: [] };
  const [stateData, setStateData] = useState(null)

  const genFakeData = () => {
    return (Math.random() * (180+180)-180).toFixed(3) * 1;
  };

  useEffect(() => {
    const map = L.map('mapId', {
      center:[0,0],
      zoom:10
    });
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      maxZoom:15,
      minZoom:8,
      tileSize:200,
      zoomOffset:-1,
    }).addTo(map);
    // find user location
    map.locate({ setView:true })
      .on('locationfound', e => {
        let marker = L.marker([e.latitude, e.longitude]).bindPopup("HERE").addTo(map);
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

      await fetch(`http://127.0.0.1:5000/get_all_states_positive`, getPayload)
        .then(res => res.json())
        .then(json => setStateData(json))
        .catch(e => console.log(e))
    };
    fetchStatePositives();
    
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

  return (
    <div id={ 'mapId' } style={{ height:"80vh" }} />
  )
}