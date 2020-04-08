import React from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Circle,
  CircleMarker,
  Polygon,
  Popup,
  GeoJSON,
  ScaleControl,
  LayerGroup,
  LayersControl
} from 'react-leaflet';
import Control from 'react-leaflet-control';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { addressPoints, bigList, statesData, } from '../../example/realworld.10000.js';

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
      useHeatmap: true,
      useChoropleth: false
    };
  }

  // TODO: extending the MapControl class from react-leaflet is probably a better solution ...
  // controlContent { name: String , density: Number }
  updateControl = (controlContent = null, layer) => {
    this.setState((state) => {
      return { controlContent }
    }, () => {
      // TODO: here instead of in highlightFeature because this change wasn't being applied (or at least wasn't showing up) when it was called in highlightFeature
      // TODO: would changing to Redux for state help here?
      if (controlContent) {
        layer.setStyle({
          weight: 5,
          color: '666',
          dashArray: '',
          fillOpacity: 0.4
        });
      }
    });
  }

  highlightFeature = (e) => {
    const layer = e.layer;
    layer.setStyle({
      weight: 5,
      color: '666',
      dashArray: '',
      fillOpacity: 0.4
    });
    // TODO: this has browser compatibility issues?
    // layer.bringToFront();

    console.log('layer: ', layer);

    const { name, density } = layer.feature.properties;
    this.updateControl({ name, density }, layer);
  }

  resetHighlight = (e) => {
    this.geoJSONRef.current.leafletElement.resetStyle(e.layer);
    this.updateControl();
  }

  getColor = (d) => {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
  }

  style = (feature) => {
    return {
      fillColor: this.getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 1
    };
  }

  zoomToFeature = (e) => {
    this.mapRef.current.leafletElement.fitBounds(e.layer.getBounds());
  }

  render() {
    const gradient = {
      0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
      0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
    };

    // TODO: change to SCSS styles
    const legend = this.state.grades.map((grade, i) => {
      return (
        <div key={i} style={{ disply: 'flex', alignItems: 'center', padding: '0.5rem' }}>
          <span key={i} style={{
            display: 'inline-block',
            backgroundColor: this.getColor(grade + 1),
            width: '18px',
            height: '18px',
            // float: 'left',
            marginRight: '8px',
            opacity: 0.7,
          }}></span>
          <span>{`${grade}${this.state.grades[i + 1] ? `-${this.state.grades[i + 1]}` : '+'}`}</span>
        </div>
      );
    });

    return (
      <div>
        <Map
          ref={this.mapRef}
          center={[-37.8869090667, 175.3657417333]} // heatmap
          zoom={10}
          style={{ width: '100%', height: '80vh' }}
          maxZoom={20}
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
                  // fitBoundsOnLoad
                  // fitBoundsOnUpdate
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
              // font: 14px/16px Arial, Helvetica, sans-serif;
              backgroundColor: 'white',
              // background: rgba(255,255,255,0.8);
              // box-shadow: 0 0 15px rgba(0,0,0,0.2);
              // border-radius: 5px;
            }}>
              <h4 style={{
                color: '#777'
              }}>US Population Density</h4>
              {this.state.controlContent ?
                <>
                  <div>{this.state.controlContent.name}</div>
                  <div>{this.state.controlContent.density} people / mi<sup>2</sup></div>
                </>
              : 'Hover over a state'}
            </div>
          </Control>

          {/* TODO: change to SCSS styles */}
          {/* Legend */}
          <Control position="bottomright">
            <div style={{
              backgroundColor: 'white',
              lineHeight: '18px',
              color: '#555'
            }}>
              {legend}
            </div>
          </Control>
          <ScaleControl position="topleft"></ScaleControl>
        </Map>

        <div>
          Radius
          <input
            type="range"
            min={1}
            max={40}
            value={this.state.radius}
            onChange={(e) => this.setState({ radius: e.currentTarget.value })}
          /> {this.state.radius}
        </div>

        <div>
          Blur
          <input
            type="range"
            min={1}
            max={20}
            value={this.state.blur}
            onChange={(e) => this.setState({ blur: e.currentTarget.value })}
          /> {this.state.blur}
        </div>

        <div>
          Max
          <input
            type="range"
            min={0.1}
            max={3}
            step={0.1}
            value={this.state.max}
            onChange={(e) => this.setState({ max: e.currentTarget.value })}
          /> {this.state.max}
        </div>
      </div>
    );
  }
}

export default MapComponent;