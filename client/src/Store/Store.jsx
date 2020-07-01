import React, { createContext, useState, useReducer, useMemo } from 'react';
import {
  ActionTypes,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  createProductSuccess,
  createProductFailure,
  registerSuccess,
  registerFailure,
} from './actions';
import userService from '../services/user-service';
import productService from '../services/product-service';

const cookies = document.cookie.split('; ').reduce((acc, curr) => {
  const [key, value] = curr.split('=');
  acc[key] = value;
  return acc;
}, {});

const authCookie = cookies['x-auth-cookie'];

const initialState = {
  isAuth: !!authCookie,
  user: null,
  products: [],
  images: [],
  error: null,
};

const actionMap = {
  [ActionTypes.Login]: (state) => ({ ...state, error: null }),
  [ActionTypes.LoginSuccess]: (state, { user }) => ({ ...state, user, isAuth: true }),
  [ActionTypes.LoginFailure]: (state, { error }) => ({ ...state, error }),
  [ActionTypes.Register]: (state) => ({ ...state, error: null }),
  [ActionTypes.RegisterSuccess]: (state, { user }) => ({ ...state, user, isAuth: true }),
  [ActionTypes.RegisterFailure]: (state, { error }) => ({ ...state, error }),
  [ActionTypes.Logout]: (state) => ({ ...state, user: null, isAuth: false }),
};

const asyncActionMap = {
  [ActionTypes.Login]: ({ user }) => {
    return userService
      .login(user)
      .then(({data: { user }}) => loginSuccess(user))
      .catch((error) => loginFailure(error));
  },
  [ActionTypes.Logout]: () => {
    return userService
      .logout()
      .then(() => logoutSuccess())
      .catch((error) => logoutFailure(error));
  },
  [ActionTypes.CreateProduct]: ({ product }) => {
    return productService
      .createProduct(product)
      .then(() => createProductSuccess())
      .catch((error) => createProductFailure(error));
  },
  [ActionTypes.Register]: ({ user }) => {
    debugger
    return userService
      .register(user)
      .then(() => registerSuccess(user))
      .catch((error) => registerFailure(error));
  },
};

const storeReducer = (state, action) => {
  return actionMap[action.type]
    ? actionMap[action.type](state, action.payload)
    : state;
};



export const StoreContext = createContext(initialState);

const ContextStore = (props) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const store = useMemo(
    () => ({
      state,
      dispatch: (action) => {
        const asyncActionHandler = asyncActionMap[action.type];
        if (asyncActionHandler) {
          asyncActionHandler(action.payload).then(dispatch);
        }
        dispatch(action);
      },
    }),
    [state, dispatch]
  );

  return (
    // <StoreContext.Provider value={[state, dispatch]}>
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default ContextStore;
