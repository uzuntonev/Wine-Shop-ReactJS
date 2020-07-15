import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from '../../../Store/Store';
import { CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { addToCart } from '../../../Store/actions';
import NavLink from '../../NavLink/NavLink';

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
  const addToCartHandler = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  return !state.isAuth ? (
    <CardActions className={classes.actionButtons}>
      <Button
        size="small"
        color="primary"
        onClick={() => addToCartHandler(product)}
      >
        <AddShoppingCartIcon />
        Купи
      </Button>
      <NavLink to={`details/${product._id}`}>
        <Button size="small" color="primary">
          <MoreHorizIcon />
        </Button>
      </NavLink>
    </CardActions>
  ) : (
    <CardActions className={classes.actionButtons}>
      <Button size="small" color="primary">
        <EditIcon />
      </Button>
      <Button size="small" color="primary">
        <DeleteIcon />
      </Button>
    </CardActions>
  );
};

ProductCardActions.propTypes = {
  product: PropTypes.object
}

export default ProductCardActions;
