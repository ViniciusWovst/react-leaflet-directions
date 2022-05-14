import { useEffect, useState } from 'react';

interface TLocation {
  lat: number;
  lng: number;
  accuracy: number;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCurrentLocation = (): any => {
  const [currentLocation, setCurrentLocation] =
    useState<TLocation>();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      null,
      options,
    );

    const watchId = navigator.geolocation.watchPosition(
      handlePositionReceived,
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  function handlePositionReceived({ coords }) {
    const { latitude, longitude, accuracy } = coords;
    console.log('coords ', coords);
    setCurrentLocation({
      lat: latitude,
      lng: longitude,
      accuracy: accuracy,
    });
  }

  return { currentLocation };
};

export { useCurrentLocation };
