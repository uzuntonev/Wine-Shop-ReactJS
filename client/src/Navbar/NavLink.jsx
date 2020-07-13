import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@material-ui/core';
const NavLink = ({ to, icon, title, handler }) => {
  return (
    <Button onClick={handler ? handler : undefined}>
      <Link to={to}>
        <Icon>{icon}</Icon> {title}
      </Link>
    </Button>
  );
};

export default NavLink;
