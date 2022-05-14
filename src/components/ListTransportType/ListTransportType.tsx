import {
  Chip,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useState } from 'react';

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      //justifyContent: 'space-between',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginRight: 0,
      marginLeft: 0,

      '& > *': {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        margin: theme.spacing(1),
        marginTop: 0,
      },
    },
    chip: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
    },
    label: {
      padding: 0,
    },
    icon: {
      margin: 0,
    },
  }),
);
type ListTransportTypeProps = {
  onTypeSelected: (type: string) => void;
};
const ListTransportType: React.FC<ListTransportTypeProps> = ({
  onTypeSelected,
}) => {
  const classes = useStyles();
  const [transporteSelected, setTransporteSelected] =
    useState('driving');
  /*
  driving
  walking
  cycling
  */
  const transportList = [
    {
      type: 'driving',
      icon: <DirectionsCarIcon />,
    },
    {
      type: 'walking',
      icon: <DirectionsWalkIcon />,
    },

    {
      type: 'cycling',
      icon: <DirectionsBikeIcon />,
    },
  ];

  const handleTypeSelected = (type: string) => {
    setTransporteSelected(type);
    onTypeSelected(type);
  };

  return (
    <div className={classes.root}>
      {transportList.map((transport, index) => {
        return (
          <Chip
            key={index}
            clickable
            onClick={() => handleTypeSelected(transport.type)}
            //label="10 km"
            classes={{
              root: classes.chip,
              label: classes.label,
              icon: classes.icon,
            }}
            color={
              transport.type === transporteSelected
                ? 'primary'
                : 'default'
            }
            icon={transport.icon}
            //style={{ display: 'flex', justifyContent: 'center' }}
          />
        );
      })}
    </div>
  );
};

export default ListTransportType;
