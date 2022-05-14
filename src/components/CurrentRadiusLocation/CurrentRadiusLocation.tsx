import React, { useEffect } from 'react';
import { Circle, CircleMarker } from 'react-leaflet';

import { LatLngExpression } from 'leaflet';
import { useCurrentLocation } from '../../hooks/useLocation';
import { useTheme } from '@material-ui/core';

import { MotionSensorOptions } from '../../types/sensors';

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
  useEffect(() => {
    console.log('useEffect ');
    const options: MotionSensorOptions = {
      frequency: 60,
      referenceFrame: 'device',
    };
    const sensor = new window.AbsoluteOrientationSensor(options);

    sensor.addEventListener('reading', () => {
      // model is a Three.js object instantiated elsewhere.
      console.log('sensor.quaternion', sensor.quaternion);
      //model.quaternion.fromArray(sensor.quaternion).inverse();
    });
    sensor.addEventListener('error', error => {
      if (event.type == 'NotReadableError') {
        console.log('Sensor is not available.', error);
      }
    });
    sensor.start();
  }, []);

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
