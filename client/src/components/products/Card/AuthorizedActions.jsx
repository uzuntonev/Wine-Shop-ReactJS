import React, { Fragment, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '../../IconButton/IconButton';
import EditDialog from '../../forms/EditProduct/EditDialog';

const useStyles = makeStyles((theme) => {
  return {
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  };
});

const AuthorizeActions = ({ product }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = useCallback(() => {
    history.push(`${history.location.pathname}/${product._id}`);
    setOpen(true);
  }, [history]);

  const handleClose = useCallback(() => {
    history.goBack();
    setOpen(false);
  }, [history]);

  return (
    <Fragment>
      <CardActions className={classes.actionButtons}>
        <IconButton
          handler={handleClickOpen}
          icon="edit"
          attr={{ size: 'small', color: 'inherit' }}
        />
        <IconButton
          handler={() => console.log('delete action')}
          icon="delete"
          attr={{ size: 'small', color: 'inherit' }}
        />
      </CardActions>

      {open ? (
        <EditDialog handleClose={handleClose} open={open} product={product} />
      ) : null}
    </Fragment>
  );
};

export default AuthorizeActions;
