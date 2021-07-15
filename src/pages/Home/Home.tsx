import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CurrentLocationPopup from '../../components/CurrentLocationPopup';
import CurrentRadiusLocation from '../../components/CurrentRadiusLocation';
import Map from '../../components/Map';
import SearchToolbar from '../../components/SearchToolbar/SearchToolbar';

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
  console.log('center ', center);
  return (
    <div className={classes.root}>
      <SearchToolbar />
      {center && (
        <Map center={[center.lat, center.lng]}>
          <CurrentRadiusLocation>
            <CurrentLocationPopup
              location={[center.lat, center.lng]}
            />
          </CurrentRadiusLocation>
        </Map>
      )}
    </div>
  );
};

export default Home;
