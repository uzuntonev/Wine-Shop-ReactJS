import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Basket from '../../Basket/Basket';
import NavLink from '../../NavLink/NavLink';

const UnauthorizedNav = ({ classes }) => {
  return (
    <Fragment>
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        item
        xs={6}
        spacing={1}
        className={classes.navLink}
      >
        <Grid container item xs={4}>
          <NavLink to={'/'} icon={'home'} title={'Начало'} />
        </Grid>
        <Grid container item xs={4}>
          <NavLink
            to={'/shop'}
            icon={'store_mall_directory'}
            title={'Магазин'}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={4}
        spacing={1}
        className={classes.navLink}
        justify="flex-end"
        alignItems="flex-end"
      >
        <Grid container item xs={4}>
          <NavLink to={'/login'} icon={'login'} title={'Влез'} />
        </Grid>
        <Grid container item xs={4}>
          <NavLink
            to={'/register'}
            icon={'perm_identity'}
            title={'Регистрация'}
          />
        </Grid>
        <Grid container item xs={4}>
          <Basket />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UnauthorizedNav;
