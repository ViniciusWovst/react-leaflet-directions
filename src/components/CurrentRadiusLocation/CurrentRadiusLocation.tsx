import React, { useEffect } from 'react';
import { Circle, CircleMarker } from 'react-leaflet';

import { LatLngExpression } from 'leaflet';
import { useCurrentLocation } from '../../hooks/useLocation';
import { useTheme } from '@material-ui/core';

import { MotionSensorOptions } from '../../types/sensors';
//import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
  const [orientation, setOrientation] =
    React.useState<DeviceOrientationEvent>();

  const [absolutePosition, setAbsolutePosition] =
    React.useState<number[]>();

  function handleOrientation(event: DeviceOrientationEvent) {
    setOrientation(event);

    // Do stuff with the new orientation data
  }
  useEffect(() => {
    window.addEventListener(
      'deviceorientation',
      handleOrientation,
      true,
    );
    const options: MotionSensorOptions = {
      frequency: 60,
      referenceFrame: 'device',
    };
    const sensor = new window.AbsoluteOrientationSensor(options);

    sensor.addEventListener('reading', () => {
      // model is a Three.js object instantiated elsewhere.
      setAbsolutePosition(sensor.quaternion);
      //model.quaternion.fromArray(sensor.quaternion).inverse();
    });
    sensor.addEventListener('error', error => {
      if (event.type == 'NotReadableError') {
        console.log('Sensor is not available.', error);
      }
    });
    sensor.start();
  }, []);

  console.log(
    'absolutePosition ',
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    //absolutePosition && absolutePosition[0] * 100,
  );

  return (
    <>
      {orientation && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            zIndex: 999999,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          Device orientation
          <br />
          {`Absolute: ${orientation.absolute}`}
          <br />
          {`alpha: ${orientation.alpha}`}
          <br />
          {`beta: ${orientation.beta}`}
          <br />
          {`gamma: ${orientation.gamma}`}
          <br />
          {`type: ${orientation.type}`}
          <br />
        </div>
      )}

      {absolutePosition && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            zIndex: 999999,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          absolutePosition
          <br />
          {`absolutePosition[0]: ${absolutePosition[0]}`}
          <br />
          {`absolutePosition[2]: ${absolutePosition[1]} `}
          <br />
          {`absolutePosition[3]: ${absolutePosition[2]} `}
          <br />
          {`absolutePosition[4]: ${absolutePosition[3]} `}
          <br />
        </div>
      )}
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
