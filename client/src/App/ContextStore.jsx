import React, { createContext, useState } from 'react';

export const StoreContext = createContext({
  images: [],
  setImages: () => {},
});

const ContextStore = (props) => {
  const [images, setImages] = useState([]);
  const value = React.useMemo(() => ({ images, setImages }), [images, setImages]);

  return (
    <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>
  );
};

export default ContextStore;
