import React from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { ShoppingBasket } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  price: {
    fontSize: '15px',
    marginLeft: '10px',
  },
}));
const Cart = (props) => {
    const classes = useStyles()
  return (
    <IconButton className={classes.price} color="inherit">
      <Badge badgeContent={1} color="secondary">
        <ShoppingBasket />
      </Badge>
      <p className={classes.price}> - 63.90 лв.</p>
    </IconButton>
  );
};

export default Cart;
