import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Grid } from '@material-ui/core';
import { SearchIcon, MoreIcon } from '@material-ui/icons';
import { AuthContext } from '../App/ContextWrapper';
import userService from '../services/user-service';
import { logout } from '../Store/actions';
import { StoreContext } from '../Store/Store';

const AuthorizedNav = ({ classes, history }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { state, dispatch } = useContext(StoreContext);

  const handlerLogout = () => {
    // userService.logout().then(() => {
    //   setAuth(false);
    //   history.push('/')
    // })
    dispatch(logout())
    history.push('/')
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
        <Button>
          <Link to="/">
            <Icon>home</Icon> Начало
          </Link>
        </Button>
        <Button>
          <Link className={classes.navLink} to="/add-product">
            <Icon>add_business</Icon> Добави продукт
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
        <Button>
          <Link className={classes.navLink} to="/my-products">
            <Icon>account_circle</Icon> Моите продукти
          </Link>
        </Button>
        <Button>
          <Link className={classes.navLink} to="/test">
            <Icon>account_circle</Icon> TEST
          </Link>
        </Button>
        <Button onClick={handlerLogout}>
          <Link className={classes.navLink} to="#">
            <Icon>cancel</Icon> Logout
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

export default AuthorizedNav;
