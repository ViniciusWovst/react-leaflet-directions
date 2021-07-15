import 'leaflet/dist/leaflet.css';
import React from 'react';
import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  //  Marker,
  //  Popup,
} from 'react-leaflet';

import '../../App.css';

type MapProps = MapContainerProps;
const Map: React.FC<MapProps> = props => {
  console.log(
    'process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX ',
    process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX,
  );

  return (
    <MapContainer {...props} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
      />
      {props.children}
    </MapContainer>
  );
};

export default Map;
