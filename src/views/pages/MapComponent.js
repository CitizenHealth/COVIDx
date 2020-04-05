import React from 'react';
import { Map, TileLayer, Marker, Circle, Polygon, Popup, GeoJSON, ScaleControl } from 'react-leaflet';
import Control from 'react-leaflet-control';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { addressPoints, bigList, statesData } from '../../example/realworld.10000.js';
import { map } from 'leaflet';


const randomizeLocations = (addressPoints) => {
  return addressPoints.map(points => {
    const arr = [];
    for (let i = 0; i < 2; i++) {
      arr.push(points[i] + Math.random());
    }

    return arr.concat(points[2]);
  });
};


// TODO: would be better to name this component something else, so that that publicly displayed url path can be consistent with the component name
class MapComponent extends React.Component {
  constructor(props) {
    super(props);

    // TODO: alternate ways to handle access to the Leaflet component instances?
    this.geoJSONRef = React.createRef();
    this.mapRef = React.createRef();
    this.controlRef = React.createRef();

    this.state = {
      mapHidden: false,
      layerHidden: false,
      addressPoints: addressPoints,
      radius: 4,
      blur: 8,
      max: 0.5,
      limitAddressPoints: false,
      controlContent: null,
      grades: [0, 10, 20, 50, 100, 200, 500, 1000]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  randomize = () => {
    this.setState({
      addressPoints: randomizeLocations(addressPoints)
    });
  }

  // TODO: extending the MapControl class from react-leaflet is probably a better solution ...
  // controlContent { name: String , density: Number }
  updateControl = (controlContent = null) => {
    this.setState({
      controlContent
    });
  }

  highlightFeature = (e) => {
    e.layer.setStyle({
      weight: 5,
      color: '666',
      dashArray: '',
      fillOpacity: 0.7
    });
    // TODO: this has browser compatibility issues?
    e.layer.bringToFront();

    console.log('e.layer: ', e.layer);

    this.updateControl({
      name: e.layer.feature.properties.name,
      density: e.layer.feature.properties.density
    });
  }

  resetHighlight = (e) => {
    this.geoJSONRef.current.leafletElement.resetStyle(e.layer);
    this.updateControl();
  }

  // makeLabel = () => {
  //   grades = [0, 10, 20, 50, 100, 200, 500, 1000],
  //   labels = [];

  //   // loop through our density intervals and generate a label with a colored square for each interval
  //   for (var i = 0; i < grades.length; i++) {
  //     div.innerHTML +=
  //         '<i style="background:' + this.getColor(grades[i] + 1) + '"></i> ' +
  //         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  //   }

  //   return div
  // }

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

  /**
   * Toggle limiting the address points to test behavior with refocusing/zooming when data points change
   */
  toggleLimitedAddressPoints() {
    if (!this.state.limitAddressPoints) {
      this.setState({ addressPoints: addressPoints.slice(500, 1000), limitAddressPoints: true });
    } else {
      this.setState({ addressPoints, limitAddressPoints: false });
    }
  }

  handleClick(e) {
    console.log(e.latlng);
  }

  render() {
    if (this.state.mapHidden) {
      return (
        <div>
          <input
            type="button"
            value="Toggle Map"
            onClick={() => this.setState({ mapHidden: !this.state.mapHidden })}
          />
        </div>
      );
    }

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
          // center={[0, 0]}
            // heatmap
          center={[-37.8869090667, 175.3657417333,]}
            // choropleth
          // center={[36.778259, -119.417931]}
          zoom={1}
          style={{ width: '80%', height: '80vh' }}
          onClick={this.handleClick}
          maxZoom={20}
        >
          {!this.state.layerHidden &&
              <HeatmapLayer
                // fitBoundsOnLoad
                // fitBoundsOnUpdate
                points={this.state.addressPoints}
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                gradient={gradient}
                intensityExtractor={m => parseFloat(m[2])}
                radius={Number(this.state.radius)}
                blur={Number(this.state.blur)}
                max={Number.parseFloat(this.state.max)}
                maxZoom={20}
              />
            }
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON
            ref={this.geoJSONRef}
            data={statesData}
            onEachFeature={(feature, layer) => {
              if (feature.properties && feature.properties.popupContent) {
                layer.bindPopup(feature.properties.popupContent);
              }
            }}
            style={this.style}
            onMouseOver={this.highlightFeature}
            onMouseOut={this.resetHighlight}
            onClick={this.zoomToFeature}
          ></GeoJSON>
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
          <ScaleControl></ScaleControl>
        </Map>

        <input
          type="button"
          value="Toggle Map"
          onClick={() => this.setState({ mapHidden: !this.state.mapHidden })}
        />
        <input
          type="button"
          value="Toggle Layer"
          onClick={() => this.setState({ layerHidden: !this.state.layerHidden })}
        />
        <input
          type="button"
          value="Toggle Limited Data"
          onClick={this.toggleLimitedAddressPoints.bind(this)}
        />
        <input
          type="button"
          value="Randomize Data Points"
          onClick={this.randomize}
        />

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


{/* <Marker position={[0, 0]}></Marker>
<Circle
  center={[-37.9033391333, 175.4244005667]}
  radius={1800}
  color="red"
  fillOpacity="0.5"
>
  <Popup>
    <div>this is content in the popup</div>
  </Popup>
</Circle>

<Polygon
  positions={[
    [-37.8869090667, 175.3657417333],
    [-37.8894207167, 175.4015351167],
    [-37.8927369333, 175.4087452333],
]}
>
</Polygon>
<Popup position={[-37.8927369333, 175.4087452333]}>popup not tied to a specific object</Popup> */}