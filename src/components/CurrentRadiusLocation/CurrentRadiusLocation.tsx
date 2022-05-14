import React from 'react';
import { Circle, CircleMarker } from 'react-leaflet';

import { LatLngExpression } from 'leaflet';
import { useCurrentLocation } from '../../hooks/useLocation';
import { useTheme } from '@material-ui/core';

type CurrentRadiusLocationProps = {
  position?: LatLngExpression;
  children?: React.ReactNode;
};

const CurrentRadiusLocation: React.FC<
  CurrentRadiusLocationProps
> = ({ children }) => {
  const { currentLocation } = useCurrentLocation();
  console.log('currentLocation ', currentLocation);
  const theme = useTheme();

  return (
    <>
      <Circle
        center={currentLocation || [0, 0]}
        radius={currentLocation?.accuracy || 0}
        pathOptions={{
          fillColor: theme.palette.primary.main,
          fillOpacity: 0.35,
          stroke: false,
        }}
      >
        {children}
      </Circle>

      <CircleMarker
        center={currentLocation || [0, 0]}
        radius={5}
        pathOptions={{
          stroke: true,
          weight: 1,
          //fill: true,
          color: 'white',
          fillColor: theme.palette.primary.main,
          fillOpacity: 1,
        }}
      />
    </>
  );
};

export default CurrentRadiusLocation;
