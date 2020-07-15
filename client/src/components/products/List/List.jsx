import React, { useState, useEffect, useContext } from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import { StoreContext } from '../../../Store/Store';
import { makeStyles } from '@material-ui/core/styles';
import productService from '../../../services/product-service';
import Card from '../Card/Card';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: 20,
      alignSelf: 'center',
    },
    item: {
      margin: 20,
    },
  };
});
const List = () => {
  const classes = useStyles();
  const { state } = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (state.isAuth) {
      productService.getUserProducts().then(({ data: products }) => {
        setProducts(products);
      });
    } else {
      // fetchPhotos('image', setImages);
      productService.getAllProducts().then(({ data }) => {
        setProducts(data);
      });
    }
  }, [state.isAuth]);

  const renderProducts = products.map((product) => {
    return (
      <Grid className={classes.item} item xs={3} key={product._id}>
        <Card product={product} />
      </Grid>
    );
  });
  return (
    <CloudinaryContext cloudName="dfyamkucg">
      <Grid container className={classes.root}>
        {renderProducts}
      </Grid>
    </CloudinaryContext>
  );
};

export default List;
