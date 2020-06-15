import React from 'react';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
  })
);

const Copyright = () => {
  const classes = useStyles();
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
      <Link className={classes.link} href="#">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
    </Typography>
  );
};
export default Copyright;
