import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { TableCell, TableRow, IconButton } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import InputQuantity from './InputQuantity';
import { StoreContext } from '../../Store/Store';
import { removeItemFromCartSuccess } from '../../Store/actions'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    marginTop: 50,
    marginBottom: 150,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '80vw',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  imageCol: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
}));
const SingleRowProduct = ({ product }) => {
  const classes = useStyles();
  const { dispatch } = useContext(StoreContext);
  const removeItemFromCart = (product) => {
    dispatch(removeItemFromCartSuccess(product));
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="center" component="th" scope="row">
        <div className={classes.imageCol}>
          <IconButton onClick={() => removeItemFromCart(product)}>
            <CloseIcon />
          </IconButton>
          <Image publicId={product.imageUrl} fetch-format="auto" quality="auto">
            <Transformation height="200" width="150" crop="scale" radius="20" />
          </Image>
        </div>
      </StyledTableCell>
      <StyledTableCell align="right">{product.name}</StyledTableCell>
      <StyledTableCell align="right">
        {product.price.toFixed(2)}лв
      </StyledTableCell>
      <StyledTableCell align="right">
        <InputQuantity product={product} />
      </StyledTableCell>
      <StyledTableCell align="right">
        {(product.quantity * product.price).toFixed(2)}лв
      </StyledTableCell>
    </StyledTableRow>
  );
};

SingleRowProduct.propTypes = {
  product: PropTypes.object
}

export default SingleRowProduct;
