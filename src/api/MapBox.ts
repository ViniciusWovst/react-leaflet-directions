const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`;

export type TPlace = {
  place_name: string;
  center: number[];
};
export const fetchLocalMapBox = (
  local: string,
): Promise<TPlace[]> =>
  fetch(
    //`https://nominatim.openstreetmap.org/search.php?q=${local}&format=jsonv2`,
    //`https://nominatim.openstreetmap.org/search?q=${local}}&format=json`,

    //`https://your.pelias.server/v1/autocomplete?text=${local}`,
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`,
  )
    .then(response => response.json())
    .then(data => data.features);

export const fetchDirections = (
  startPosition: number[],
  destinationPosition: number[],
  profile: string,
): any =>
  fetch(
    `https://api.mapbox.com/directions/v5/mapbox/${profile}/${startPosition[1]}%2C${startPosition[0]}%3B${destinationPosition[1]}%2C${destinationPosition[0]}?language=pt-BR?alternatives=true&geometries=polyline&steps=true&${ACCESS_TOKEN_MAP_BOX}`,
  )
    .then(response => response.json())
    .then(data => data);
