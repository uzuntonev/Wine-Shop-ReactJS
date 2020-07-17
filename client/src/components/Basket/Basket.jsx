import React, { useContext } from 'react';
import Badge from '@material-ui/core/Badge';
import { StoreContext } from '../../store/Store';
import IconButton from '../IconButton/IconButton';
import NavLink from '../NavLink/NavLink';

const Basket = (props) => {
  const { state } = useContext(StoreContext);

  const basket = state.cart.reduce(
    (acc, curr) => {
      const count = acc.count + curr.quantity;
      const price = acc.price + curr.price * curr.quantity;
      return { count, price };
    },
    { count: 0, price: 0 }
  );

  return (
    <NavLink to={'/cart'}>
      <Badge badgeContent={basket.count} color="secondary">
        <IconButton icon="basket" attr={{ color: 'inherit' }} />
      </Badge>
      <p> - {basket.price.toFixed(2)} лв.</p>
    </NavLink>
  );
};

export default Basket;
