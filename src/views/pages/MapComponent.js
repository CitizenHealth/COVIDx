import React from 'react';
import {
  Map,
  TileLayer,
  ScaleControl,
  LayerGroup,
  LayersControl
} from 'react-leaflet';
import Control from 'react-leaflet-control';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { addressPoints, } from '../../example/realworld.10000.js';

const { BaseLayer, Overlay } = LayersControl;

// TODO: would be better to name this component something else, so that that publicly displayed url path can be consistent with the component name
class MapComponent extends React.Component {
  constructor(props) {
    super(props);

    // TODO: alternate ways to handle access to the Leaflet component instances?
    this.geoJSONRef = React.createRef();
    this.mapRef = React.createRef();
    this.controlRef = React.createRef();

    this.state = {
      addressPoints: addressPoints,
      radius: 4,
      blur: 8,
      max: 0.5,
      controlContent: null,
      grades: [0, 10, 20, 50, 100, 200, 500, 1000],
      useStreets: true,
      useHeatmap: true
    };
  }

  render() {
    const gradient = {
      0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
      0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
    };

    return (
      <div>
        <Map
          ref={this.mapRef}
          center={[-37.8869090667, 175.3657417333]} // heatmap
          zoom={10}
          style={{ width: '100%', height: '80vh' }}
          maxZoom={20}
          minZoom={2}
        >
          <LayersControl position="bottomleft">
            <BaseLayer checked={this.state.useStreets} name="streets">
              <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </BaseLayer>
            <Overlay checked={this.state.useHeatmap} name="heatmap">
              <LayerGroup>
                <HeatmapLayer
                  fitBoundsOnLoad
                  fitBoundsOnUpdate
                  points={this.state.addressPoints}
                  longitudeExtractor={m => m[1]}
                  latitudeExtractor={m => m[0]}
                  gradient={gradient}
                  intensityExtractor={m => parseFloat(m[2])}
                  // intensityExtractor={m => 1}
                  radius={Number(this.state.radius)}
                  blur={Number(this.state.blur)}
                  max={Number.parseFloat(this.state.max)}
                  maxZoom={20}
                />
              </LayerGroup>
            </Overlay>
          </LayersControl>
          <Control
            ref={this.controlRef}
            position="topright"
          >
            {/* TODO: change to SCSS styles (what this template uses) ... */}
            <div style={{
              paddingTop: '6px',
              paddingBottom: '6px',
              paddingLeft: '8px',
              paddingRight: '8px',

              backgroundColor: 'white',
            }}>
              <div style={{
                fontSize: '1.5rem',
                color: '#777'
              }}>COVID-19 Cases</div>
            </div>
          </Control>
          <ScaleControl position="topleft"></ScaleControl>
        </Map>

        {/* TODO: Improvement, tie the radius to the current zoom level */}
        {/* <div>
          Radius
          <input
            type="range"
            min={1}
            max={40}
            value={this.state.radius}
            onChange={(e) => this.setState({ radius: e.currentTarget.value })}
          /> {this.state.radius}
        </div> */}
      </div>
    );
  }
}

export default MapComponent;