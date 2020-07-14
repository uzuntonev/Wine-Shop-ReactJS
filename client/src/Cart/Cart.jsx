import React, { useContext, useCallback } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { CloudinaryContext } from 'cloudinary-react';
import { StoreContext } from '../Store/Store';
import SingleRowProduct from './SingleRowProduct';
import { resetCartSuccess } from '../Store/actions';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
}));

const Cart = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(resetCartSuccess());
    console.log(state.cart);
  }, []);

  const renderProducts = state.cart.map((product) => {
    return <SingleRowProduct key={product._id} product={product} />;
  });

  return (
    <CloudinaryContext cloudName="dfyamkucg">
      <TableContainer component={Paper} className={classes.root}>
        <form onSubmit={handleSubmit}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="right">Продукт</StyledTableCell>
                <StyledTableCell align="right">Цена</StyledTableCell>
                <StyledTableCell align="right">Количество</StyledTableCell>
                <StyledTableCell align="right">Общо</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderProducts.length ? (
                renderProducts
              ) : (
                <tr>
                  <td>Няма продукти в количката</td>
                </tr>
              )}
            </TableBody>
          </Table>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!renderProducts.length}
          >
            Приключи поръчката
          </Button>
        </form>
      </TableContainer>
    </CloudinaryContext>
  );
};

export default Cart;
