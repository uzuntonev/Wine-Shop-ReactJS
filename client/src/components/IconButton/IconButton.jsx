import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { IconButton as IconButtonMaterial } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {
  ShoppingBasket,
  Delete,
  Edit,
  MoreHoriz,
  Remove,
  Add,
  PhotoCamera,
} from '@material-ui/icons';

const IconButton = ({ handler, icon, attr, children }) => {
  const mapIcon = {
    edit: <Edit />,
    delete: <Delete />,
    more: <MoreHoriz />,
    cart: <AddShoppingCartIcon />,
    basket: <ShoppingBasket />,
    remove: <Remove />,
    add: <Add />,
    camera: <PhotoCamera />,
  };
  const handleIcon = useMemo(() => mapIcon[icon], [icon]);
  return (
    <IconButtonMaterial {...attr} onClick={handler}>
      {handleIcon}
      {children}
    </IconButtonMaterial>
  );
};

IconButton.propTypes = {
  handler: PropTypes.func,
  icon: PropTypes.string.isRequired,
  attr: PropTypes.object,
};

export default IconButton;
