import React, { useEffect, useState, createRef } from 'react';
import L from "leaflet";
import HeatmapOverlay from "leaflet-heatmap";

// import { addressPoints, } from 'example/realworld.10000.js';

import "./heatMap.scss";
import "leaflet/dist/leaflet.css"


export default function HeatMap() {
  // const [gradient, setGradient] = useState(null);
  // const mapId = Math.round(Math.random()*100);
  // console.log(addressPoints)
  const fakeHeatData = { data: [] };

  const genFakeData = () => {
    return (Math.random() * (180+180)-180).toFixed(3) * 1;
  };

  useEffect(() => {
    // setGradient({
    //   0.1: '#89BDE0', 
    //   0.2: '#96E3E6', 
    //   0.4: '#82CEB6',
    //   0.6: '#FAF3A5', 
    //   0.8: '#F5D98B', 
    //   1.0: '#DE9A96'
    // });
    // build base layer for the map
    const map = L.map('mapId', {
      center:[0,0],
      zoom:13
    });
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      maxZoom:5,
      tileSize:512,
      zoomOffset:-1,
    }).addTo(map);
    // find user location
    map.locate({ setView:true })
      .on('locationfound', e => {
        let marker = L.marker([e.latitude, e.longitude]).bindPopup("HERE").addTo(map);
      }).on("locationerror", e => {
        console.log('user not found')
      });
    // add heatmap layer
    for (let i=0; i < 100; i++) {
      let coords = {
        lat: genFakeData(), 
        lon: genFakeData(),
        count:Math.round(Math.random()*100)
      }
      fakeHeatData.data.push(coords);
    };
    const heatLayer = new HeatmapOverlay({
      radius:2,
      maxOpacity:0.8,
      scaleRadius:true,
      useLocalExtrema:true,
      latField:"lat",
      lngField:"lon",
      valueField:"count"
    });
    heatLayer.setData(fakeHeatData);
    map.addLayer(heatLayer)
  }, []);

  return (
    <div id={ 'mapId' } style={{ height:"80vh" }} />
  )
}

// TODO: would be better to name this component something else, so that that publicly displayed url path can be consistent with the component name
// class MapComponent extends React.Component {
//   constructor(props) {
//     super(props);
// 
//     // TODO: alternate ways to handle access to the Leaflet component instances?
//     this.geoJSONRef = React.createRef();
//     this.mapRef = React.createRef();
//     this.controlRef = React.createRef();
// 
//     this.state = {
//       addressPoints: addressPoints,
//       radius: 4,
//       blur: 8,
//       max: 0.5,
//       controlContent: null,
//       grades: [0, 10, 20, 50, 100, 200, 500, 1000],
//       useStreets: true,
//       useHeatmap: true
//     };
//   }
// 
//   render() {
//     const gradient = {
//       0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
//       0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
//     };
// 
//     return (
//       <div>
//         <Map
//           ref={this.mapRef}
//           center={[-37.8869090667, 175.3657417333]} // heatmap
//           zoom={10}
//           style={{ width: '100%', height: '80vh' }}
//           maxZoom={20}
//           minZoom={2}
//         >
//           <LayersControl position="bottomleft">
//             <BaseLayer checked={this.state.useStreets} name="streets">
//               <TileLayer
//                 url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//               />
//             </BaseLayer>
//             <Overlay checked={this.state.useHeatmap} name="heatmap">
//               <LayerGroup>
//                 <HeatmapLayer
//                   fitBoundsOnLoad
//                   fitBoundsOnUpdate
//                   points={this.state.addressPoints}
//                   longitudeExtractor={m => m[1]}
//                   latitudeExtractor={m => m[0]}
//                   gradient={gradient}
//                   intensityExtractor={m => parseFloat(m[2])}
//                   // intensityExtractor={m => 1}
//                   radius={Number(this.state.radius)}
//                   blur={Number(this.state.blur)}
//                   max={Number.parseFloat(this.state.max)}
//                   maxZoom={20}
//                 />
//               </LayerGroup>
//             </Overlay>
//           </LayersControl>
//           <Control
//             ref={this.controlRef}
//             position="topright"
//           >
//             {/* TODO: change to SCSS styles (what this template uses) ... */}
//             <div style={{
//               paddingTop: '6px',
//               paddingBottom: '6px',
//               paddingLeft: '8px',
//               paddingRight: '8px',
// 
//               backgroundColor: 'white',
//             }}>
//               <div style={{
//                 fontSize: '1.5rem',
//                 color: '#777'
//               }}>COVID-19 Cases</div>
//             </div>
//           </Control>
//           <ScaleControl position="topleft"></ScaleControl>
//         </Map>
//       </div>
//     );
//   }
// }

// export default MapComponent;