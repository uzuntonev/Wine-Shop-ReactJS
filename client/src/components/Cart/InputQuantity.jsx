import React, { Fragment, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { updateQuantitySuccess } from '../../Store/actions';
import {  makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { StoreContext } from '../../Store/Store';
const useStyles = makeStyles((theme) => ({
  input: {
    background: 'transparent',
    border: 'none',
    marginLeft: 20,
  },
}));
const InputQuantity = ({ product }) => {
  const classes = useStyles();
  const { dispatch } = useContext(StoreContext);

  const handleChange = useCallback((e, product) => {
    dispatch(updateQuantitySuccess({ product, value: +e.target.value }));
  }, [dispatch]);
  const changeQuantity = (e, action, product) => {
    const element = document.getElementById(product._id);
    const mapAction = {
      increase: () =>
        dispatch(
          updateQuantitySuccess({
            product,
            value: +element.value + 1,
          })
        ),
      decrease: () =>
        dispatch(
          updateQuantitySuccess({
            product,
            value: +element.value - 1 <= 0 ? 0 : +element.value - 1,
          })
        ),
    };
    mapAction[action]();
  };

  return (
    <Fragment>
      <IconButton onClick={(e) => changeQuantity(e, 'decrease', product)}>
        <RemoveIcon />
      </IconButton>
      <input
        className={classes.input}
        id={product._id}
        size="4"
        value={product.quantity}
        onChange={(e) => handleChange(e, product)}
      />
      <IconButton onClick={(e) => changeQuantity(e, 'increase', product)}>
        <AddIcon />
      </IconButton>
    </Fragment>
  );
};

InputQuantity.propTypes = {
  product: PropTypes.object
}

export default InputQuantity;
