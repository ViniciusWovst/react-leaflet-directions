import React from 'react';
import { Circle, CircleMarker } from 'react-leaflet';

import { LatLngExpression } from 'leaflet';
import { useCurrentLocation } from '../../hooks/useLocation';

type CurrentRadiusLocationProps = {
  position?: LatLngExpression;
  children?: React.ReactNode;
};
const CurrentRadiusLocation: React.FC<CurrentRadiusLocationProps> =
  ({ children }) => {
    const { currentLocation } = useCurrentLocation();

    return (
      <>
        <Circle
          center={currentLocation || [0, 0]}
          radius={20}
          pathOptions={{
            //strokeColor: '#8B0000',
            //fillColor: '#8B0000',
            fillOpacity: 0.35,
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        >
          {children}
        </Circle>

        <CircleMarker
          center={currentLocation || [0, 0]}
          radius={5}
          pathOptions={{
            //strokeColor: '#8B0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            //fillColor: '#8B0000',
            fillOpacity: 1,
          }}
        />
      </>
    );
  };

export default CurrentRadiusLocation;
