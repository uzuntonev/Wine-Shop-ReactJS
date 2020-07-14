import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Welcome from '../Welcome/Welcome';
const Details = React.lazy(() => import('../Product/Details'));
const List = React.lazy(() => import('../Product/List'));
const Cart = React.lazy(() => import('../Cart/Cart'));
const Create = React.lazy(() => import('../Product/Create'));
const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/add-product" component={Create} />
      <Route path="/my-products" component={List} />
      <Route path="/shop" component={List} />
      <Route path="/cart" component={Cart} />
      <Route path="/details/:id" component={Details} />
    </Switch>
  );
};

export default AppRouter;
