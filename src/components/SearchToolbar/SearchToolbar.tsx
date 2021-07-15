import {
  createStyles,
  makeStyles,
  Theme,
  Card,
  Button,
} from '@material-ui/core';

import React from 'react';
import SelectLocation from '../SelectLocation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 9999,
      position: 'absolute',
      display: 'flex',
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: 0,
      },
    },
    content: {
      overflow: 'visible',
      display: 'flex',
      flexDirection: 'column',
      width: 400,

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
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

const SearchToolbar: React.FC = () => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Card className={classes.content}>
        <div className={classes.textFieldLocationContainer}>
          <SelectLocation placeholder="Choose start location" />
        </div>
        <div className={classes.textFieldLocationContainer}>
          <SelectLocation placeholder="Choose Destination" />
        </div>
        <Button>Search</Button>
      </Card>
    </main>
  );
};
export default SearchToolbar;
