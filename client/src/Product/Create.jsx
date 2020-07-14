import React, { useContext, useState, useCallback } from 'react';
import * as yup from 'yup';
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
  IconButton,
  TextareaAutosize,
} from '@material-ui/core/';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import withForm from '../hocs/withForm';
import { openUploadWidget } from '../services/cloudinary-service';
import { StoreContext } from '../Store/Store';
import { createProduct } from '../Store/actions';
import InputField from '../InputField/InputField';

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
  textarea: {
    resize: 'none',
  },
  error: {
    color: '#f44336',
    fontSize: 12,
    marginLeft: 14,
    marginTop: 0,
  },
}));

const Create = ({
  changeHandlerFactory,
  formState,
  runValidations,
  runControlValidation,
  formIsInvalid,
  history,
}) => {
  const classes = useStyles();
  const [image, setImage] = useState();
  const { state, dispatch } = useContext(StoreContext);

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

      dispatch(createProduct(product));
      history.push('/');
    });
  });

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Добави нов продукт
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
            <Grid container justify='center' alignItems='center' item xs={5}>
              { image ? <CheckCircleIcon htmlColor={'green'} /> : null }
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                cols={45}
                rows={10}
                className={classes.textarea}
                placeholder="Описание"
                id={'description'}
                onChange={handleOnChangeTextarea}
                onBlur={runControlValidation('description')}
              />
              {formState.errors && formState.errors['description'] ? (
                <p className={classes.error}>
                  {formState.errors['description']}
                </p>
              ) : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formIsInvalid()}
          >
            Добави
          </Button>
        </form>
      </div>
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

export default withForm(Create, initialState, schema);
