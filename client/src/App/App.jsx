import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AppRouter from './AppRouter';
import { makeStyles } from '@material-ui/core/styles';
import StoreContext from '../Store/Store';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
        <StoreContext>
          <Navbar />
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <AppRouter />
          </React.Suspense>
          <Footer />
        </StoreContext>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
