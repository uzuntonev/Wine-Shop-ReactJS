import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ContextWrapper from './ContexWrapper';
import AppRouter from './AppRouter';
import { fade, makeStyles } from '@material-ui/core/styles';

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
      <ContextWrapper>
        <BrowserRouter>
          <Navbar />
          <AppRouter />
          <Footer />
        </BrowserRouter>
      </ContextWrapper>
    </ThemeProvider>
  );
}

export default App;
