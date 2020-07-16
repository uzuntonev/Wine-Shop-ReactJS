import React, { useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import {
  Avatar,
  CssBaseline,
  Grid,
  Typography,
  Container,
  IconButton,
} from '@material-ui/core/';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import withForm from '../../../hocs/withForm';
import { openUploadWidget } from '../../../services/cloudinary-service';
import { StoreContext } from '../../../Store/Store';
import { createProduct } from '../../../Store/actions';
import InputField from '../InputField';
import TextareaField from '../TextareaField';
import SubmitButton from '../../SubmitButton/SubmitButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import productService from '../../../services/product-service';
import { useLocation, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.text,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    pointerEvents: 'fill',
  },
  closeIcon: {
    float: 'right',
  },
}));
const EditDialog = ({
  handleClose,
  open,
  changeHandlerFactory,
  formState,
  runValidations,
  runControlValidation,
  formIsInvalid,
  history,
  product,
}) => {
  const classes = useStyles();
  const [image, setImage] = useState();
  const { dispatch } = useContext(StoreContext);

  const handleOnChangeName = changeHandlerFactory('name');
  const handleOnChangeYear = changeHandlerFactory('year');
  const handleOnChangeType = changeHandlerFactory('type');
  const handleOnChangeAlcohol = changeHandlerFactory('alcohol');
  const handleOnChangeSize = changeHandlerFactory('size');
  const handleOnChangePrice = changeHandlerFactory('price');
  const handleOnChangeDescription = changeHandlerFactory('description');

  useEffect(() => {
    Object.assign(formState.form, {...formState.form, ...product});
  }, [])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        const product = {
          ...formData,
          imageUrl: image,
          creatorId: window.localStorage.getItem('user').id,
        };

        // dispatch(createProduct(product));
        history.push('/my-products');
      });
    },
    [history, dispatch, runValidations, image]
  );

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: 'dfyamkucg',
      tags: [tag, 'anImage'],
      uploadPreset: 'upload',
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        // console.log(photos);
        if (photos.event === 'success') {
          // setImages([...images, photos.info.public_id]);
          setImage(photos.info.public_id);
        }
      } else {
        // console.log(error);
      }
    });
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form className={classes.form} onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">
            Редактиране продукт
            <IconButton className={classes.closeIcon} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputField
                    label={'Наименование'}
                    name={'name'}
                    changeHandler={handleOnChangeName}
                    runControlValidation={runControlValidation}
                    formState={formState}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    label={'Реколта'}
                    name={'year'}
                    changeHandler={handleOnChangeYear}
                    runControlValidation={runControlValidation}
                    formState={formState}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    label={'Вид'}
                    name={'type'}
                    changeHandler={handleOnChangeType}
                    runControlValidation={runControlValidation}
                    formState={formState}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    label={'Размер'}
                    name={'size'}
                    changeHandler={handleOnChangeSize}
                    runControlValidation={runControlValidation}
                    formState={formState}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    label={'Алкохол'}
                    name={'alcohol'}
                    changeHandler={handleOnChangeAlcohol}
                    runControlValidation={runControlValidation}
                    formState={formState}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    label={'Цена'}
                    name={'price'}
                    changeHandler={handleOnChangePrice}
                    runControlValidation={runControlValidation}
                    formState={formState}
                  />
                </Grid>
                <Grid item xs={7}>
                  <label htmlFor="icon-button-file">
                    Прикачи снимка
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => beginUpload('image')}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Grid>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  item
                  xs={5}
                >
                  {image ? <CheckCircleIcon htmlColor={'green'} /> : null}
                </Grid>
                <Grid item xs={12}>
                  <TextareaField
                    cols={45}
                    rows={10}
                    label={'Описание'}
                    name={'description'}
                    handleChange={handleOnChangeDescription}
                    formState={formState}
                    runControlValidation={runControlValidation}
                  />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <SubmitButton disabled={formIsInvalid()} title={'Редактиране'} />
          </DialogActions>
        </form>
      </Dialog>
  );
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Name must be at least 5 characters')
    .required('Product name is required'),
  year: yup.string().required('Year is required'),
  type: yup.string().required('Type name is required'),
  alcohol: yup.string().required('Alcohol name is required'),
  price: yup.string().required('Price is required'),
  size: yup.string().required('Size is required'),
  description: yup.string().required('Description is required'),
});

const initialState = {
  name: '',
  year: '',
  type: '',
  alcohol: '',
  size: '',
  price: '',
  description: '',
};

EditDialog.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default withForm(EditDialog, initialState, schema);
