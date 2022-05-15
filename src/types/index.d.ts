import { LatLngExpression } from 'leaflet';
import { AbsoluteOrientationSensor, Gyroscope } from './sensors';

export type TRouteInformation = {
  positions: LatLngExpression[] | LatLngExpression[][];
  distance: number;
  duration: number;
};

//export type WindowCustom = Window & {

//};

declare global {
  interface Window {
    AbsoluteOrientationSensor: typeof AbsoluteOrientationSensor;
    Gyroscope: typeof Gyroscope;
  }
}
