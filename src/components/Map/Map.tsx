import 'leaflet/dist/leaflet.css';
import React from 'react';
import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';

import '../../App.css';

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  iconSize: [24, 36],
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  iconAnchor: [12, 36],
});

L.Marker.prototype.options.icon = DefaultIcon;

type MapProps = MapContainerProps;
const Map: React.FC<MapProps> = props => {
  return (
    <MapContainer
      {...props}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
      />
      {props.children}

      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default Map;
