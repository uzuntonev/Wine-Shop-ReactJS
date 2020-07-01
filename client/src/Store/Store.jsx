import React, { createContext, useState, useReducer } from 'react';

const Reducer = (state, action) => {
  switch (action.type) {
      case 'SET_IMAGES':
          return {
              ...state,
              images: state.images.concat(action.payload)
          };
      default:
          return state;
  }
};


const initialState = {
  auth: '',
  images: []
}

export const StoreContext = createContext(initialState)

const ContextStore = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>{props.children}</StoreContext.Provider>
  );
};

export default ContextStore;
