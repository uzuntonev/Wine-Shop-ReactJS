import React, { Fragment } from 'react';
import { Image } from 'cloudinary-react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent } from '@material-ui/core';
import NavLink from '../NavLink/NavLink';
import ProductCardActions from './ProductCardActions';
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

  return (
    <Fragment>
      <Card className={classes.imageCard}>
        <NavLink to={`details/${product._id}`}>
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
        </NavLink>
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
        <ProductCardActions product={product} />
      </Card>
    </Fragment>
  );
};

export default ProductCard;
