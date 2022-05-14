import React, { useEffect, useState } from 'react';
import { Popup } from 'react-leaflet';
import {
  fetchCurrentWeatherByLocation,
  TWeather,
} from '../../api/Weather';
import { LatLngExpression } from 'leaflet';
import { Container, Typography } from '@material-ui/core';

type CurrentLocationPopupProps = {
  location: LatLngExpression;
};

const CurrentLocationPopup: React.FC<
  CurrentLocationPopupProps
> = ({ location }) => {
  const [weatherCurrentLocation, setWeatherCurrentLocation] =
    useState<TWeather>(null);

  useEffect(() => {
    async function getWeather() {
      const weather = await fetchCurrentWeatherByLocation(
        location[0],
        location[1],
      );
      setWeatherCurrentLocation(weather[0]);
    }
    if (!weatherCurrentLocation) {
      getWeather();
    }
  }, [location, weatherCurrentLocation]);

  return (
    <Popup>
      <Container
        style={{ flexDirection: 'column', display: 'flex' }}
      >
        <Typography variant="caption">
          Temp. Max.
          <b>{weatherCurrentLocation?.temp2m.max}</b>
        </Typography>
        <Typography variant="caption">
          Temp. Min.
          <b>{weatherCurrentLocation?.temp2m.min}</b>
        </Typography>
      </Container>
    </Popup>
  );
};

export default CurrentLocationPopup;
