import 'leaflet/dist/leaflet.css';
import React from 'react';
import {
  MapContainer,
  TileLayer,
  //  Marker,
  //  Popup,
} from 'react-leaflet';

import '../../App.css';

const Map: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const LATITIUDE = 51.505;
  const LONGITUDE = -0.09;

  console.log(
    'process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX ',
    process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX,
  );

  return (
    <MapContainer
      center={[LATITIUDE, LONGITUDE]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
      />
    </MapContainer>
  );
};

export default Map;
