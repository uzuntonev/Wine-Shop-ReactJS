import React, { useState, useEffect, useContext } from 'react';
import { fetchPhotos } from '../../services/cloudinary-service';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { StoreContext } from '../../Store/Store';
import { makeStyles } from '@material-ui/core/styles';
import productService from '../../services/product-service';
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
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      // marginBottom:70,
      marginTop: 20,
      marginBottom: 0,
      marginRight: 0,
      marginLeft: 0,
      padding: 20,
    },
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
const List = () => {
  const classes = useStyles();

  // const { images, setImages } = useContext(StoreContext);
  const { state, dispatch } = useContext(StoreContext);
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
  }, []);

  const renderProducts = products.map((product) => {
    return (
      <div key={product._id}>
        <Card className={classes.imageCard}>
          <CardActionArea
            className={classes.imageActionArea}
            onClick={() => console.log('go to details')}
          >
            {/* <CardMedia
              className={classes.media}
              component="img"
              src="https://ruevitestate.bg/wp-content/uploads/2020/05/Promo-Box-2-1_opt.png"
              title="Wine product"
            /> */}
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
            <Button size="small" color="primary">
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
      </div>
    );
  });
  return (
    <CloudinaryContext cloudName="dfyamkucg">
      <div className={classes.root}>{renderProducts}</div>
      {/* <div className="App">
        <section>
          {state.images.map((i) => (
            <Image key={i} publicId={i} fetch-format="auto" quality="auto" />
          ))}
        </section>
      </div> */}
    </CloudinaryContext>
  );
};

export default List;
