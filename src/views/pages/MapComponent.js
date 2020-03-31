import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

// TODO: would be better to name this component something else, so that that publicly displayed url path can be consistent with the component name
class MapComponent extends React.Component {
  render() {
    return (
      <Map
        style={{ width: '80%', height: '80vh' }}
        center={[0, 0]}
        zoom={13}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}

export default MapComponent;