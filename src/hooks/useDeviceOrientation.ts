import { useCallback, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DeviceOriention = {
  heading: number;
  alpha: number;
  beta: number;
  gamma: number;
  absolute: boolean;
  type: string;
};

interface DeviceOrientationEventCustom
  extends DeviceOrientationEvent {
  compassHeading: number;
  webkitCompassHeading: number;
}

const useDeviceOrietation = (): DeviceOriention => {
  //const [currentHeading, setCurrentHeading] = useState(0);
  const [currentDeviceOrientation, setCurrentDeviceOrientation] =
    useState<DeviceOriention>({
      heading: 0,
      alpha: 0,
      beta: 0,
      gamma: 0,
      absolute: false,
      type: '',
    });

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const RAD_PER_DEG = Math.PI / 180;
  const toRad = useCallback(
    deg => {
      return deg * RAD_PER_DEG;
    },
    [RAD_PER_DEG],
  );

  const toDeg = useCallback(
    rad => {
      return rad / RAD_PER_DEG;
    },
    [RAD_PER_DEG],
  );

  const compassHeading = useCallback(
    ({ alpha, beta, gamma }) => {
      if (
        typeof alpha !== 'number' ||
        typeof beta !== 'number' ||
        typeof gamma !== 'number'
      ) {
        return 0;
      }

      const _x = toRad(beta);
      const _y = toRad(gamma);
      const _z = toRad(alpha);

      const sX = Math.sin(_x);
      const sY = Math.sin(_y);
      const sZ = Math.sin(_z);

      // const cX = Math.cos(_x);
      const cY = Math.cos(_y);
      const cZ = Math.cos(_z);

      const Vx = -cZ * sY - sZ * sX * cY;
      const Vy = -sZ * sY + cZ * sX * cY;

      // Calculate compass heading
      let heading = Math.atan(Vx / Vy);

      // Convert from half unit circle to whole unit circle
      if (Vy < 0) {
        heading += Math.PI;
      } else if (Vx < 0) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        heading += 2 * Math.PI;
      }

      return toDeg(heading);
    },
    [toDeg, toRad],
  );
  const onDeviceOrientation = useCallback(
    (ev: DeviceOrientationEventCustom) => {
      let heading;
      if ('compassHeading' in ev) {
        heading = ev.compassHeading;
      } else if ('webkitCompassHeading' in ev) {
        heading = ev.webkitCompassHeading;
      } else if (ev.absolute) {
        heading = compassHeading(ev);
      }
      if (
        typeof heading === 'number' &&
        !Number.isNaN(heading)
      ) {
        heading = Math.round(heading);
        if (currentDeviceOrientation.heading !== heading) {
          setCurrentDeviceOrientation({
            heading: heading,
            alpha: ev.alpha,
            beta: ev.beta,
            gamma: ev.gamma,
            absolute: ev.absolute,
            type: ev.type,
          });
        }
      }
    },
    [compassHeading, currentDeviceOrientation],
  );

  useEffect(() => {
    const DO_EVENT =
      'ondeviceorientationabsolute' in window
        ? 'deviceorientationabsolute'
        : 'deviceorientation';

    window.addEventListener(DO_EVENT, onDeviceOrientation);
    return () =>
      window.removeEventListener(DO_EVENT, onDeviceOrientation);
  }, [onDeviceOrientation]);
  return currentDeviceOrientation;
};

export { useDeviceOrietation };
