import { useEffect, useState } from 'react';
/*
interface TLocation {
  lat: number;
  lng: number;
  accuracy: number;
  heading?: number;
}
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCurrentLocation = (): GeolocationCoordinates => {
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates>();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log('position', position);
        setCurrentLocation(position.coords);
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
    //const { latitude, longitude, accuracy } = coords;
    console.log('coords ', coords);
    setCurrentLocation(coords);
  }

  return currentLocation;
};

export { useCurrentLocation };
