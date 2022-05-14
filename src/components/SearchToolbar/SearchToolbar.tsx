import {
  createStyles,
  makeStyles,
  Theme,
  Card,
  Button,
  Slide,
  Collapse,
} from '@material-ui/core';
import DirectionsIcon from '@material-ui/icons/Directions';

import React, { useState } from 'react';
import { fetchDirections } from '../../api/MapBox';
import { TRouteInformation } from '../../types';
import SelectLocation from '../SelectLocation';
import { TLocation } from '../SelectLocation/SelectLocation';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListTransportType from '../ListTransportType';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400,
      //backgroundColor: 'red',
      zIndex: 9999,
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      paddingLeft: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        padding: 0,
      },
    },
    content: {
      overflow: 'visible',
      display: 'flex',
      flexDirection: 'column',
      width: 400,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      padding: theme.spacing(2),
      paddingBottom: 0,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        borderRadius: 0,
      },
    },
    textFieldLocationContainer: {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      paddingBottom: theme.spacing(1),
    },
  }),
);

type SearchToolbarProps = {
  onDestinationLocationSelected: (location: TLocation) => void;
  onStartLocationSelected: (location: TLocation) => void;
  onSearched: (routeInformation: TRouteInformation[]) => void;
};
const SearchToolbar: React.FC<SearchToolbarProps> = ({
  onDestinationLocationSelected,
  onStartLocationSelected,
  onSearched,
}) => {
  const classes = useStyles();
  const [startLocation, setStartLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] =
    useState(null);

  const [showSearch, setShowSearch] = useState(true);

  const [showExpandButton, setShowExpandButton] =
    useState(false);

  const [typeTransport, setTypeTransport] = useState('driving');

  const handleTransportTypeSelected = (type: string) => {
    setTypeTransport(type);
    if (startLocation && destinationLocation) {
      handleSearchClick();
    }
  };

  const handleDestinationLocationSelected = (
    location: TLocation,
  ) => {
    setDestinationLocation(location);
    onDestinationLocationSelected(location);
  };

  const handleStartLocationSelected = (location: TLocation) => {
    setStartLocation(location);
    onStartLocationSelected(location);
  };

  const handleSearchClick = async () => {
    const KM_FACTOR = 1000;
    const MINUTE_FACTOR = 59.992;
    const response = await fetchDirections(
      startLocation.coords,
      destinationLocation.coords,
      typeTransport,
    );

    const routeInformation: TRouteInformation[] = [];

    const routes = response.routes;
    routes.map(route => {
      const listCoord = [];
      const legs = route.legs;
      legs.map(leg => {
        leg.steps.map(step => {
          step.intersections.map(intersection => {
            listCoord.push([
              intersection.location[1],
              intersection.location[0],
            ]);
          });
        });
      });
      routeInformation.push({
        positions: listCoord,
        distance: route.distance / KM_FACTOR,
        duration: route.duration / MINUTE_FACTOR,
      });
    });
    onSearched(routeInformation);
  };

  return (
    <main className={classes.root}>
      <Slide
        direction="down"
        in={showSearch}
        mountOnEnter
        unmountOnExit
        timeout={1200}
        onExited={() => setShowExpandButton(true)}
        onEnter={() => setShowExpandButton(false)}
      >
        <Card className={classes.content}>
          <div className={classes.textFieldLocationContainer}>
            <SelectLocation
              defaultInputValue={startLocation?.place || ''}
              placeholder="Choose start location"
              onLocationSelected={handleStartLocationSelected}
            />
          </div>
          <div className={classes.textFieldLocationContainer}>
            <SelectLocation
              defaultInputValue={
                destinationLocation?.place || ''
              }
              placeholder="Choose Destination"
              onLocationSelected={
                handleDestinationLocationSelected
              }
            />
          </div>

          <Collapse in={startLocation && destinationLocation}>
            <ListTransportType
              onTypeSelected={handleTransportTypeSelected}
            />
          </Collapse>

          <Button
            disabled={!startLocation || !destinationLocation}
            onClick={handleSearchClick}
            color="primary"
            variant="contained"
            startIcon={<DirectionsIcon />}
          >
            Directions
          </Button>
          <Button onClick={() => setShowSearch(false)}>
            <ExpandLessIcon color="primary" />
          </Button>
        </Card>
      </Slide>
      {showExpandButton && (
        <Slide
          direction="down"
          in={showExpandButton}
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Button
            variant="contained"
            style={{
              opacity: 0.7,
              backgroundColor: 'white',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            onClick={() => setShowSearch(true)}
          >
            <ExpandMoreIcon color="primary" />
          </Button>
        </Slide>
      )}
    </main>
  );
};
export default SearchToolbar;
