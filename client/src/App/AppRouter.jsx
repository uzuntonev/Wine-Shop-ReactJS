import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Welcome from '../Welcome/Welcome';
import Create from '../Product/Create/Create';
import List from '../Product/List/List';


const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/add-product" component={Create} />
      <Route path="/test" component={List} />
    </Switch>
  );
};

export default AppRouter;
