import React, { useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
<<<<<<< Updated upstream
import {
  Avatar,
  CssBaseline,
  Grid,
  Typography,
  Container,
  IconButton,
} from '@material-ui/core/';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
=======
import { Avatar, CssBaseline, Typography, Container } from '@material-ui/core/';
>>>>>>> Stashed changes
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import withForm from '../../../hocs/withForm';
import { openUploadWidget } from '../../../services/cloudinary-service';
<<<<<<< Updated upstream
import { StoreContext } from '../../../Store/Store';
import { createProduct } from '../../../Store/actions';
import InputField from '../InputField';
import TextareaField from '../TextareaField';
import SubmitButton from '../../SubmitButton/SubmitButton';

=======
import { StoreContext } from '../../../store/Store';
import { createProduct } from '../../../store/actions';
import SubmitButton from '../../SubmitButton/SubmitButton';
import LayoutFieldsProduct from '../LayoutFieldsProduct';
>>>>>>> Stashed changes

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `solid 1px ${theme.palette.primary.text}`,
    padding: '30px',
    borderRadius: '20px',
    boxShadow: `3px 3px 5px ${theme.palette.primary.text}`,
  },
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
}));

const Create = (props) => {
  const { runValidations, formIsInvalid, history } = props;
  const classes = useStyles();
  const [image, setImage] = useState();
  const { dispatch } = useContext(StoreContext);

<<<<<<< Updated upstream
  const handleOnChangeName = changeHandlerFactory('name');
  const handleOnChangeYear = changeHandlerFactory('year');
  const handleOnChangeType = changeHandlerFactory('type');
  const handleOnChangeAlcohol = changeHandlerFactory('alcohol');
  const handleOnChangeSize = changeHandlerFactory('size');
  const handleOnChangePrice = changeHandlerFactory('price');
  const handleOnChangeTextarea = changeHandlerFactory('description');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    runValidations().then((formData) => {
      const product = {
        ...formData,
        imageUrl: image,
        creatorId: window.localStorage.getItem('user').id,
      };
=======
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        const product = {
          ...formData,
          imageUrl: image,
          creatorId: window.localStorage.getItem('user').id,
        };
>>>>>>> Stashed changes

      dispatch(createProduct(product));
      history.push('/');
    });
  }, [history, dispatch, runValidations, image]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="div" className={classes.paper}>
        <Typography component="h1" variant="h5">
          Добави нов продукт
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
<<<<<<< Updated upstream
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
            <Grid container justify="center" alignItems="center" item xs={5}>
              {image ? <CheckCircleIcon htmlColor={'green'} /> : null}
            </Grid>
            <Grid item xs={12}>
              <TextareaField
                cols={45}
                rows={10}
                label={'Описание'}
                name={'description'}
                handleChange={handleOnChangeTextarea}
                formState={formState}
                runControlValidation={runControlValidation}
              />
            </Grid>
          </Grid>
=======
          <LayoutFieldsProduct {...props} image={image} setImage={setImage} />
>>>>>>> Stashed changes
          <SubmitButton disabled={formIsInvalid()} title={'Добави'} />
        </form>
      </Typography>
    </Container>
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

Create.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default withForm(Create, initialState, schema);
