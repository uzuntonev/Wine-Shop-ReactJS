import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import withForm from '../../hocs/withForm';
import { AuthContext } from '../../App/ContextWrapper';
import productService from '../../services/product-service';
import { openUploadWidget } from '../../services/cloudinary-service';
import { StoreContext } from '../../Store/Store';
import { createProduct } from '../../Store/actions';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const Create = ({
  changeHandlerFactory,
  formState,
  runValidations,
  runControlValidation,
  formIsInvalid,
  history,
}) => {
  const classes = useStyles();

  // const { auth, setAuth } = useContext(AuthContext);
  // const { images, setImages } = useContext(StoreContext);
  const [ image, setImage ] = useState()
  const { state, dispatch } = useContext(StoreContext);

  const handleOnChangeName = changeHandlerFactory('name');
  const handleOnChangeYear = changeHandlerFactory('year');
  const handleOnChangeType = changeHandlerFactory('type');
  const handleOnChangeAlcohol = changeHandlerFactory('alcohol');
  const handleOnChangeSize = changeHandlerFactory('size');

  const handleSubmit = (e) => {
    e.preventDefault();
    runValidations().then((formData) => {
      const product = {
        ...formData,
        imageUrl: image,
        creatorId: state.user._id
      }

      dispatch(createProduct(product))
      history.push('/')
      console.log(product);

    });
  };

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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Наименование на продукта"
            name="name"
            autoComplete="name"
            onChange={handleOnChangeName}
            onBlur={runControlValidation('name')}
            error={!!formState.errors && !!formState.errors['name']}
            helperText={formState.errors && formState.errors['name']}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="year"
            label="Реколта"
            id="year"
            autoComplete="current-year"
            onChange={handleOnChangeYear}
            onBlur={runControlValidation('year')}
            error={!!formState.errors && !!formState.errors['year']}
            helperText={formState.errors && formState.errors['year']}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="type"
            label="Вид"
            id="type"
            autoComplete="current-type"
            onChange={handleOnChangeType}
            onBlur={runControlValidation('type')}
            error={!!formState.errors && !!formState.errors['type']}
            helperText={formState.errors && formState.errors['type']}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="size"
            label="Размер"
            id="size"
            autoComplete="current-size"
            onChange={handleOnChangeSize}
            onBlur={runControlValidation('size')}
            error={!!formState.errors && !!formState.errors['size']}
            helperText={formState.errors && formState.errors['size']}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="alcohol"
            label="Алкохол"
            id="alcohol"
            autoComplete="current-alcohol"
            onChange={handleOnChangeAlcohol}
            onBlur={runControlValidation('alcohol')}
            error={!!formState.errors && !!formState.errors['alcohol']}
            helperText={formState.errors && formState.errors['alcohol']}
          />
          <button type='button' onClick={() => beginUpload('image')}>Upload Image</button>

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
  name: yup.string().required('Product name is required'),
  year: yup.string().required('Year is required'),
  type: yup.string().required('Type name is required'),
  alcohol: yup.string().required('Alcohol name is required'),
  size: yup.string().required('Size is required'),
  //   imageUrl: yup.string().required('Image url is required'),
  //   creatorId: yup.string().required('Product name is required'),
});

const initialState = {
  name: '',
  year: '',
  type: '',
  alcohol: '',
  size: '',
  //   imageUrl: '',
  //   creatorId: ''
};

export default withForm(Create, initialState, schema);
