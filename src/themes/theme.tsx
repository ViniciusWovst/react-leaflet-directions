import { createTheme } from '@material-ui/core/styles';
import { teal, blueGrey } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
      contrastText: '#ffffff',
      light: teal[100],
      dark: teal[900],
    },
    secondary: {
      main: blueGrey[500],
    },
  },
});

export default theme;
