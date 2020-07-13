import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { ShoppingBasket } from '@material-ui/icons';
import { StoreContext } from '../Store/Store';

const useStyles = makeStyles((theme) => ({
  price: {
    fontSize: '15px',
    marginLeft: '10px',
  },
}));
const Basket = (props) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext);

  const basket = state.cart.reduce(
    (acc, curr) => {
      const count = acc.count + curr.quantity;
      const price = acc.price + curr.price * curr.quantity;
       return { count, price }
    },
    { count: 0, price: 0 }
  );

  return (
    <IconButton className={classes.price} color="inherit">
      <Link to={'/cart'}>
        <Badge badgeContent={basket.count} color="secondary">
          <ShoppingBasket />
        </Badge>
        <p className={classes.price}> - {basket.price.toFixed(2)} лв.</p>
      </Link>
    </IconButton>
  );
};

export default Basket;
