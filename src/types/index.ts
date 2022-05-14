import { LatLngExpression } from 'leaflet';

export type TRouteInformation = {
  positions: LatLngExpression[] | LatLngExpression[][];
  distance: number;
  duration: number;
};
