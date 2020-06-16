import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Grid } from '@material-ui/core';
import Cart from './Cart';

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
        <Button>
          <Link to="/">
            <Icon>home</Icon> Начало
          </Link>
        </Button>
        <Button>
          <Link className={classes.navLink} to="/shop">
            <Icon>store_mall_directory</Icon> Магазин
          </Link>
        </Button>
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
        <Cart />
        <Button>
          <Link className={classes.navLink} to="/login">
            <Icon>login</Icon> Login
          </Link>
        </Button>
        <Button>
          <Link className={classes.navLink} to="/register">
            <Icon>perm_identity</Icon> Register
          </Link>
        </Button>
        {/* <div color="inherit" className={classes.search}>
            <div color="inherit" className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
      </Grid>
    </Fragment>
  );
};

export default UnauthorizedNav;
