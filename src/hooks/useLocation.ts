import { useEffect, useState } from 'react';

interface TLocation {
  lat: number;
  lng: number;
}

const useCurrentLocation = (): any => {
  const [currentLocation, setCurrentLocation] =
    useState<TLocation>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (
      position,
    ) {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    const watchId = navigator.geolocation.watchPosition(
      handlePositionReceived,
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  function handlePositionReceived({ coords }) {
    const { latitude, longitude } = coords;
    setCurrentLocation({ lat: latitude, lng: longitude });
  }

  return { currentLocation };
};

export { useCurrentLocation };
