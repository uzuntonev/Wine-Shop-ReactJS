import React, { Fragment } from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Copyright from '../Copyright/Copyright';

const useStyles = makeStyles((theme) =>
  createStyles({
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      backgroundColor: theme.palette.primary,
      color: theme.palette.primary.text,
    },
    grow: {
      flexGrow: 1,
    },
    copyright: {
      margin: 'auto',
    },
  })
);

const Footer = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <div className={classes.copyright}>
          <Toolbar>
            <Copyright />
          </Toolbar>
        </div>
      </AppBar>
    </Fragment>
  );
};

export default Footer;
