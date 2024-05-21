import 'leaflet.offline';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';

import '../../App.css';

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  iconSize: [24, 36],
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  iconAnchor: [12, 36],
});

L.Marker.prototype.options.icon = DefaultIcon;

type MapProps = MapContainerProps;
const Map: React.FC<MapProps> = ({ children }) => {
  const [map, setMap] = useState();

  useEffect(() => {
    if (map) {
      L.control;
      const tileLayerOffline = L.tileLayer.offline(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abc',
          minZoom: 13,
          maxZoom: 16,
        },
      );

      tileLayerOffline.addTo(map);

      const controlSaveTiles = L.control.savetiles(
        tileLayerOffline,
        {
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          zoomlevels: [13, 14, 15, 16], // optional zoomlevels to save, default current zoomlevel
          confirm(layer, succescallback) {
            // eslint-disable-next-line no-alert
            if (
              window.confirm(
                `Save ${layer._tilesforSave.length}`,
              )
            ) {
              succescallback();
            }
          },
          confirmRemoval(layer, successCallback) {
            // eslint-disable-next-line no-alert
            if (window.confirm('Remove all the tiles?')) {
              successCallback();
            }
          },
          saveText:
            '<i class="fas fa-download" aria-hidden="true" title="Save tiles"></i>',
          rmText:
            '<i class="fas fa-trash" aria-hidden="true"  title="Remove tiles"></i>',
        },
      );

      controlSaveTiles.addTo(map);

      let progress;
      tileLayerOffline.on('savestart', e => {
        progress = 0;
        setTotal(e._tilesforSave.length);
      });
      tileLayerOffline.on('savetileend', () => {
        progress += 1;
        setProgress(progress);
      });
    }
  }, [map]);

  return (
    <MapContainer
      {...props}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      whenCreated={setMap}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
      />
      {children}

      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default Map;
