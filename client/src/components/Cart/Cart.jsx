import React, { useContext, useCallback } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as TableRowMaterial,
  Paper,
} from '@material-ui/core';
import { CloudinaryContext } from 'cloudinary-react';
import { StoreContext } from '../../store/Store';
import { resetCartSuccess } from '../../store/actions';
import TableRow from './TableRow';
import SubmitButton from '../SubmitButton/SubmitButton';

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
}));

const Cart = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetCartSuccess());
      console.log(state.cart);
    },
    [dispatch, state.cart]
  );

  const cart = JSON.parse(window.localStorage.getItem('cart'));
  const renderProducts = (cart || []).map((product) => {
    return <TableRow key={product._id} product={product} />;
  });

  return (
    <CloudinaryContext cloudName="dfyamkucg">
      <TableContainer component={Paper} className={classes.root}>
        <form onSubmit={handleSubmit}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRowMaterial>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="right">Продукт</StyledTableCell>
                <StyledTableCell align="right">Цена</StyledTableCell>
                <StyledTableCell align="right">Количество</StyledTableCell>
                <StyledTableCell align="right">Общо</StyledTableCell>
              </TableRowMaterial>
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
          <SubmitButton
            disabled={!renderProducts.length}
            title={'Приключи поръчката'}
          />
        </form>
      </TableContainer>
    </CloudinaryContext>
  );
};

export default Cart;
