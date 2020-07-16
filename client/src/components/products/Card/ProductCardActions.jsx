import React, { useContext, useCallback, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StoreContext } from '../../../Store/Store';
import { CardActions, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { addToCart } from '../../../Store/actions';
import NavLink from '../../NavLink/NavLink';
import EditDialog from '../../forms/EditProduct/EditDialog';

const useStyles = makeStyles((theme) => {
  return {
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  };
});

const ProductCardActions = ({ product }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = useCallback(() => {
    history.push(`${history.location.pathname}/${product._id}`);
    setOpen(true);
  }, [history]);

  const handleClose = useCallback(() => {
    history.goBack();
    setOpen(false);
  }, [history]);

  const addToCartHandler = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  return !state.isAuth ? (
    <CardActions className={classes.actionButtons}>
      <IconButton
        size="small"
        color="primary"
        onClick={() => addToCartHandler(product)}
      >
        <AddShoppingCartIcon />
        Купи
      </IconButton>
      <NavLink to={`details/${product._id}`}>
        <IconButton size="small" color="primary">
          <MoreHorizIcon />
        </IconButton>
      </NavLink>
    </CardActions>
  ) : (
    <Fragment>
      <CardActions className={classes.actionButtons}>
        <IconButton size="small" color="primary" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" color="primary">
          <DeleteIcon />
        </IconButton>
      </CardActions>

      {open ? (
        <EditDialog
          handleClose={handleClose}
          open={open}
          product={product}
        />
      ) : null}
    </Fragment>
  );
};

ProductCardActions.propTypes = {
  product: PropTypes.object,
};

export default ProductCardActions;
