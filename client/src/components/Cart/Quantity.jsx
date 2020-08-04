import React, { Fragment, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from '../../store/store';
import { updateQuantitySuccess } from '../../store/actions';
import IconButton from '../IconButton/IconButton';
const useStyles = makeStyles((theme) => ({
  input: {
    background: 'transparent',
    border: 'none',
    marginLeft: 20,
  },
}));
const Quantity = ({ product }) => {
  const classes = useStyles();
  const { dispatch } = useContext(StoreContext);

  const handleChange = useCallback(
    (e, product) => {
      dispatch(updateQuantitySuccess({ product, value: +e.target.value }));
    },
    [dispatch]
  );
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
      <IconButton
        handler={(e) => changeQuantity(e, 'decrease', product)}
        icon="remove"
      />
      <input
        className={classes.input}
        id={product._id}
        size="4"
        value={product.quantity}
        onChange={(e) => handleChange(e, product)}
      />
      <IconButton
        handler={(e) => changeQuantity(e, 'increase', product)}
        icon="add"
      />
    </Fragment>
  );
};

Quantity.propTypes = {
  product: PropTypes.object,
};

export default Quantity;
