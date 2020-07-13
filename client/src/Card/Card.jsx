import React, { Fragment, useContext } from 'react';
import { Image } from 'cloudinary-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import productService from '../services/product-service';
import { StoreContext } from '../Store/Store';
import { addToCart } from '../Store/actions';
const useStyles = makeStyles((theme) => {
  return {
    media: {
      width: 240,
      padding: 15,
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imageCard: {
      marginBottom: 10,
      padding: 0,
      borderRadius: '20px',
    },
    imageActionArea: {
      display: 'flex',
      justifyContent: 'center',
      border: `solid 1px ${theme.palette.primary.text}`,
      borderRadius: '20px',
    },
    cardInfo: {
      border: `solid 1px ${theme.palette.primary.text}`,
      borderRadius: '20px',
    },
  };
});
const ProductCard = ({ product }) => {
  const classes = useStyles();
  const { state, dispatch} = useContext(StoreContext)
  const addToCartHandler = (product) => {
      dispatch(addToCart(product))
    // productService.getProductById(product._id).then(({data}) => {
    //     console.log(data);
    // })
console.log(state.cart);
  };
  return (
    <Fragment>
      <Card className={classes.imageCard}>
        <CardActionArea
          className={classes.imageActionArea}
          onClick={() => console.log('go to details')}
        >
          <Image
            className={classes.media}
            publicId={product.imageUrl}
            fetch-format="auto"
            quality="auto"
          />
        </CardActionArea>
      </Card>
      <Card className={classes.cardInfo}>
        <CardContent>
          <div className={classes.row}>
            <h3>Реколта</h3>
            <span>{product.year}</span>
          </div>
          <div className={classes.row}>
            <h3>Цена</h3>
            <span>{product.price}лв</span>
          </div>
        </CardContent>
        <CardActions className={classes.actionButtons}>
          <Button
            size="small"
            color="primary"
            onClick={() => addToCartHandler(product)}
          >
            <AddShoppingCartIcon />
            Купи
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => console.log('go to details')}
          >
            <MoreHorizIcon />
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default ProductCard;
