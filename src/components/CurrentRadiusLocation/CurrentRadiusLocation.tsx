/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from 'react';
import { Circle, CircleMarker, Marker } from 'react-leaflet';

import { LatLng, LatLngExpression, DivIcon } from 'leaflet';
import { useCurrentLocation } from '../../hooks/useLocation';
import { useDeviceOrietation } from '../../hooks/useDeviceOrientation';

import { useTheme } from '@material-ui/core';

import styles from './CurrentRadiusLocation.module.css';
//import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import * as ReactDOMServer from 'react-dom/server';

type CurrentRadiusLocationProps = {
  position?: LatLngExpression;
  children?: React.ReactNode;
};

const CurrentRadiusLocation: React.FC<
  CurrentRadiusLocationProps
> = ({ children }) => {
  const currentLocation = useCurrentLocation();
  const deviceOrientation = useDeviceOrietation();
  console.log('currentLocation ', currentLocation);
  console.log('deviceOrientation ', deviceOrientation);

  const theme = useTheme();

  if (!currentLocation) return <div>loading</div>;

  const icon = new DivIcon({
    //className: styles.cone,
    html: ReactDOMServer.renderToString(
      <ArrowUpwardIcon
        className={styles.cone}
        style={{
          transform: `rotate(${
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            deviceOrientation ? deviceOrientation.heading : 0
          }deg)`,
        }}
      />,
    ),

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    iconSize: [0, 0],

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    iconAnchor: [0, 0],
  });

  return (
    <>
      {deviceOrientation && (
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
          {`heading: ${currentLocation.heading}`}
          <br />
          {`heading 2: ${deviceOrientation.heading}`}
          <br />
          {`Absolute: ${deviceOrientation.absolute}`}
          <br />
          {`alpha: ${deviceOrientation.alpha.toFixed(4)}`}
          <br />
          {`beta: ${deviceOrientation.beta.toFixed(4)}`}
          <br />
          {`gamma: ${deviceOrientation.gamma.toFixed(4)}`}
          <br />
          {`type: ${deviceOrientation.type}`}
          <br />
        </div>
      )}

      <Circle
        center={
          new LatLng(
            currentLocation.latitude,
            currentLocation.longitude,
          ) || [0, 0]
        }
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
        center={
          new LatLng(
            currentLocation.latitude,
            currentLocation.longitude,
          ) || [0, 0]
        }
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
      <Marker
        icon={icon}
        position={
          new LatLng(
            currentLocation.latitude,
            currentLocation.longitude,
          ) || [0, 0]
        }
      ></Marker>
    </>
  );
};

export default CurrentRadiusLocation;
