import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Button,
  Icon,
  Grid,
  InputBase,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { SearchIcon, MoreIcon } from '@material-ui/icons';
import Cart from './Cart';
import { AuthContext } from '../App/ContexWrapper';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    height: '80px',
    width: '100px',
    padding: '10px',
  },
  navLink: {
    '& a': {
      color: theme.palette.primary.text,
      padding: '10px',
      fontWeight: 'bold',
      borderRadius: '20px',
      textDecoration: 'none',
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme.palette.primary.text,
        color: theme.palette.primary.main,
      },
      '& span.material-icons': {
        marginRight: '10px',
      },
    },
  },
  toolbar: {
    color: theme.palette.primary.text,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { auth, setAuth } = useContext(AuthContext);

  console.log(auth);
  const handlerLogout = () => {
    axios
      .get('http://localhost:8000/api/auth/logout', { withCredentials: true })
      .then((data) => {
        setAuth(false);
        console.log(data);
      });
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid container alignItems="center" item xs={1}>
              <img src="/ruevite.png" className={classes.logo} />
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
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
              {auth ? (
                <Fragment>
                  <Button>
                    <Link className={classes.navLink} to="/shop">
                      <Icon>store_mall_directory</Icon> Магазин
                    </Link>
                  </Button>
                  <Button>
                    <Link className={classes.navLink} to="/create-product">
                      <Icon>add_business</Icon> Добави продукт
                    </Link>
                  </Button>
                </Fragment>
              ) : null}
            </Grid>
            <Grid container item xs={5} spacing={1} className={classes.navLink}>
              {auth ? (
                <Fragment>
                  <Button>
                    <Link className={classes.navLink} to="/my-account">
                      <Icon>account_circle</Icon> My account
                    </Link>
                  </Button>
                  <Button onClick={handlerLogout}>
                    <Link className={classes.navLink} to="#">
                      <Icon>cancel</Icon> Logout
                    </Link>
                  </Button>
                  <Cart />
                </Fragment>
              ) : (
                <Fragment>
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
                </Fragment>
              )}

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
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
