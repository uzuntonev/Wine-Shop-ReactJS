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
  addToCartSuccess,
  addToCartFailure,
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
  user: JSON.parse(window.localStorage.getItem('user')),
  products: [],
  images: [],
  error: null,
  toast: { status: '', message: '' },
  cart: [],
};

const actionMap = {
  [ActionTypes.Login]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.LoginSuccess]: (state, { user }) => ({
    ...state,
    user,
    isAuth: true,
    toast: { status: 'success', message: 'You are log successfully' },
  }),
  [ActionTypes.LoginFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: 'Your login failed' },
  }),
  [ActionTypes.Register]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.RegisterSuccess]: (state, { user }) => ({
    ...state,
    user,
    isAuth: true,
    toast: {
      status: 'success',
      message: 'You are register and login successfully',
    },
  }),
  [ActionTypes.RegisterFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: 'Your registration failed' },
  }),
  [ActionTypes.Logout]: (state) => ({
    ...state,
    user: null,
    isAuth: false,
    toast: { status: 'success', message: 'You are logout successfully' },
  }),

  [ActionTypes.CreateProduct]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.CreateProductSuccess]: (state) => ({
    ...state,
    error: null,
    toast: {
      status: 'success',
      message: 'You created new product successfully',
    },
  }),
  [ActionTypes.CreateProductFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: `${error}` },
  }),
  [ActionTypes.addToCart]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.addToCartSuccess]: (state, { product }) => {
    let products = [ ...state.cart ]
    const currentProduct = products.find(p => p._id === product._id);
    if(currentProduct){
      const index = state.cart.indexOf(currentProduct);
      products[index] = {...currentProduct, quantity: currentProduct.quantity + 1}
    }else {
      products = products.concat({ ...product, quantity: 1 }) 
    }
    return {
      ...state,
      cart: products ,
      toast: { status: 'success', message: 'Product add to cart successfully' },
    };
  },
  [ActionTypes.addToCartFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: 'Something wrong' },
  }),
};

const asyncActionMap = {
  [ActionTypes.Login]: ({ user }) => {
    return userService
      .login(user)
      .then(({ data: { user } }) => {
        window.localStorage.setItem(
          'user',
          JSON.stringify({ id: user._id, token: user.token })
        );
        return loginSuccess(user);
      })
      .catch((error) => loginFailure(error));
  },
  [ActionTypes.Logout]: () => {
    return userService
      .logout()
      .then(() => {
        window.localStorage.clear();
        return logoutSuccess();
      })
      .catch((error) => logoutFailure(error));
  },
  [ActionTypes.CreateProduct]: ({ product }) => {
    return productService
      .createProduct(product)
      .then(() => createProductSuccess())
      .catch((error) => createProductFailure(error));
  },
  [ActionTypes.Register]: ({ user }) => {
    return userService
      .register(user)
      .then(() => {
        window.localStorage.setItem(
          'user',
          JSON.stringify({ id: user._id, token: user.token })
        );
        return registerSuccess(user);
      })
      .catch((error) => registerFailure(error));
  },
  [ActionTypes.addToCart]: ({ product }) => {
    return productService
      .getProductById(product._id)
      .then(({ data }) => {
        const currentProduct = data[0];
        return addToCartSuccess(currentProduct);
      })
      .catch((error) => addToCartFailure(error));
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
