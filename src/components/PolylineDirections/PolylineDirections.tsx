/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  WithStyles,
  withStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { Polyline, Popup } from 'react-leaflet';
import { TRouteInformation } from '../../types';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import { Polyline as LeafletPolyline } from 'leaflet';
import * as geojson from 'geojson';

const styles = (/*theme: Theme*/) => ({
  polyline: {
    //backgroundColor: theme.palette.primary.main,
    color: props => (props.selected ? 'red' : 'black'),
  },
});

//export interface PendingUpdatesCardProps extends WithStyles<typeof styles> {}
export interface PolylineDirectionsProps
  extends WithStyles<typeof styles> {
  routeInformation: TRouteInformation;
  selected?: boolean;
  routeSelected: () => void;
}
const PolylineDirections: React.FC<PolylineDirectionsProps> = ({
  routeInformation,
  selected,
  //classes,
  routeSelected,
}) => {
  const leafletRef =
    useRef<
      LeafletPolyline<
        geojson.LineString | geojson.MultiLineString
      >
    >();

  const theme = useTheme();

  useEffect(() => {
    if (leafletRef && leafletRef.current) {
      leafletRef.current.openPopup();
    }
  }, []);

  return (
    <Polyline
      ref={leafletRef}
      eventHandlers={{
        click: () => {
          routeSelected();
        },
      }}
      pathOptions={{
        color: selected ? theme.palette.primary.main : 'grey',
        opacity: 0.7,
        weight: 8,
      }}
      positions={routeInformation.positions}
    >
      <Popup closeButton={false}>
        <div
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            color="primary"
            component="h2"
            style={{
              fontSize: 12,
              fontWeight: 'bold',
            }}
          >
            <div>
              <DirectionsCarIcon color="primary" />
            </div>
            {parseInt(routeInformation.duration.toString())} min
          </Typography>
          <Typography style={{ fontSize: 12 }} component="h2">
            <b>{routeInformation.distance.toFixed(2)} km</b>
          </Typography>
        </div>
      </Popup>
    </Polyline>
  );
};

export default withStyles(styles)(
  React.memo(PolylineDirections),
);
