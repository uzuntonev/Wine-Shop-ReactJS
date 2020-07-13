import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import Context from '../Store/Store';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AppRouter from './AppRouter';
import Toast from './Toast';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#121212',
      text: '#B0976D',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  app: {
    // backgroundColor: '#F1F1F1',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Context>
          <Toast />
          <Navbar />
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <AppRouter />
          </React.Suspense>
          <Footer />
        </Context>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
