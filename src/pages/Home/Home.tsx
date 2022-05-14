import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Marker } from 'react-leaflet';
import CurrentLocationPopup from '../../components/CurrentLocationPopup';
import CurrentRadiusLocation from '../../components/CurrentRadiusLocation';
import Map from '../../components/Map';
import SearchToolbar from '../../components/SearchToolbar/SearchToolbar';
import { TLocation } from '../../components/SelectLocation/SelectLocation';

import 'leaflet/dist/leaflet.css';
import { TRouteInformation } from '../../types';
import PolylineDirections from '../../components/PolylineDirections';
//import PolylineDirections from '../../components/PolylineDirections';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      width: '100vw',
      height: '100vh',
    },
  }),
);

const Home: React.FC = () => {
  const [center, setCenter] = useState(null);

  const [indexRouteSelected, setIndexRouteSelected] =
    useState(0);
  const [startLocation, setStartLocation] = useState(null);
  const [routeInformation, setRouteInformation] = useState<
    TRouteInformation[]
  >([]);
  const [destinationLocation, setDestinationLocation] =
    useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (
      position,
    ) {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const classes = useStyles();

  const handleStartLocationSelected = (location: TLocation) => {
    setStartLocation(location);
  };

  const handleDestinationLocationSelected = (
    location: TLocation,
  ) => {
    setDestinationLocation(location);
  };

  const handleSearched = (
    routeInformation: TRouteInformation[],
  ) => {
    console.log('routeInformation ', routeInformation);
    setRouteInformation(routeInformation);
  };

  return (
    <div className={classes.root}>
      <SearchToolbar
        onDestinationLocationSelected={
          handleDestinationLocationSelected
        }
        onStartLocationSelected={handleStartLocationSelected}
        onSearched={handleSearched}
      />
      {center && (
        <Map center={[center.lat, center.lng]}>
          <CurrentRadiusLocation>
            <CurrentLocationPopup
              location={[center.lat, center.lng]}
            />
          </CurrentRadiusLocation>

          {startLocation && (
            <Marker position={startLocation.coords} />
          )}
          {destinationLocation && (
            <Marker position={destinationLocation.coords} />
          )}
          {routeInformation.map((route, index) => {
            return (
              <PolylineDirections
                selected={index == indexRouteSelected}
                key={index}
                routeInformation={route}
                routeSelected={() =>
                  setIndexRouteSelected(index)
                }
              />
            );
          })}
        </Map>
      )}
    </div>
  );
};

export default Home;
