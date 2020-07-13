import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Grid } from '@material-ui/core';
import { AuthContext } from '../App/ContextWrapper';
import { logout } from '../Store/actions';
import { StoreContext } from '../Store/Store';
import NavLink from './NavLink';

const AuthorizedNav = ({ classes, history }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { state, dispatch } = useContext(StoreContext);

  const handlerLogout = () => {
    dispatch(logout());
    history.push('/');
  };
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
        <NavLink
          to={'/add-product'}
          icon={'add_business'}
          title={'Добави продукт'}
        />
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
        <NavLink
          to={'/my-products'}
          icon={'account_circle'}
          title={'Моите продукти'}
        />
        <NavLink to={'#'} icon={'cancel'} title={'Излез'} handler={handlerLogout}/>

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

export default AuthorizedNav;
