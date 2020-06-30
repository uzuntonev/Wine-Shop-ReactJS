import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ContextWrapper from './ContextWrapper';
import AppRouter from './AppRouter';
import { fade, makeStyles } from '@material-ui/core/styles';
import StoreContext from './ContextStore';

import './App.css';

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

      <StoreContext>
        <ContextWrapper>
          <BrowserRouter>
            <Navbar />
            <AppRouter />
            <Footer />
          </BrowserRouter>
        </ContextWrapper>
      </StoreContext>
      <ContextWrapper>
        <BrowserRouter>
          <Navbar />
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <AppRouter />
          </React.Suspense>
          <Footer />
        </BrowserRouter>
      </ContextWrapper>
    </ThemeProvider>
  );
}

export default App;
