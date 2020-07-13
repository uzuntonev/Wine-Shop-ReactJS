import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Basket from './Basket';
import NavLink from './NavLink';

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
        <NavLink to={'/'} icon={'home'} title={'Начало'} />
        <NavLink to={'/shop'} icon={'store_mall_directory'} title={'Магазин'} />
      </Grid>
      <Grid
        container
        item
        xs={5}
        spacing={1}
        className={classes.navLink}
        justify="flex-end"
        alignItems="flex-end"
      >
        <Basket />
        <NavLink to={'/login'} icon={'login'} title={'Влез'} />
        <NavLink
          to={'/register'}
          icon={'perm_identity'}
          title={'Регистрация'}
        />
      </Grid>
    </Fragment>
  );
};

export default UnauthorizedNav;
