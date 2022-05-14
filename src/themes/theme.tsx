import { createTheme } from '@material-ui/core/styles';
import { teal, blueGrey } from '@material-ui/core/colors';

let theme = createTheme({
  palette: {
    primary: {
      main: teal[700],
      contrastText: '#ffffff',
      light: teal[100],
      dark: teal[900],
    },
    secondary: {
      main: blueGrey[500],
    },
    text: {
      primary: '#ffffff',
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#fff',
      },
    },
    MuiButton: {
      textPrimary: {
        color: theme.palette.text.primary,
      },
      outlinedPrimary: {
        borderColor: theme.palette.primary.light,
      },
      containedPrimary: {
        backgroundColor: theme.palette.primary.main,
      },
      label: {
        textTransform: 'none',
      },
      contained: {},
    },
  },
};

export default theme;
