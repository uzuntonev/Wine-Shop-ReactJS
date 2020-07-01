import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import {
  Select,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Grid,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import withForm from '../hocs/withForm';
import { AuthContext } from '../App/ContextWrapper';
import userService from '../services/user-service';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `solid 1px ${theme.palette.primary.text}`,
    padding: '20px',
    borderRadius: '20px',
    boxShadow: `3px 3px 5px ${theme.palette.primary.text}`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.text,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({
  changeHandlerFactory,
  formState,
  runValidations,
  runControlValidation,
  formIsInvalid,
  history,
}) => {
  const classes = useStyles();
  const { auth, setAuth } = useContext(AuthContext);

  const handleOnChangeName = changeHandlerFactory('name');
  const handleOnChangeYear = changeHandlerFactory('year');
  const handleOnChangeAlcohol = changeHandlerFactory('password');
  const handleOnChangeSize = changeHandlerFactory('email');
  const handleOnChangeImageUrl = changeHandlerFactory('rePassword');
  const handleOnChangeType = changeHandlerFactory('userType');

  const handleSubmit = useCallback((e) => {});

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Име на продукта"
                onChange={handleOnChangeName}
                onBlur={runControlValidation('name')}
                error={!!formState.errors && !!formState.errors['name']}
                helperText={formState.errors && formState.errors['name']}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="type">Тип потребител</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  name="type"
                  label="Вид на продукта"
                  onChange={handleOnChangeType}
                  error={!!formState.errors && !!formState.errors['type']}
                >
                  <MenuItem value={'seller'}>Търговец</MenuItem>
                  <MenuItem value={'buyer'}>Купувач</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="year"
                label="Реколта"
                name="year"
                autoComplete="year"
                onChange={handleOnChangeYear}
                onBlur={runControlValidation('year')}
                error={!!formState.errors && !!formState.errors['year']}
                helperText={formState.errors && formState.errors['year']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="alcohol"
                label="Алкохол"
                type="alcohol"
                id="alcohol"
                autoComplete="alcohol"
                onChange={handleOnChangeAlcohol}
                onBlur={runControlValidation('alcohol')}
                error={!!formState.errors && !!formState.errors['alcohol']}
                helperText={formState.errors && formState.errors['alcohol']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="size"
                label="Размер"
                type="password"
                id="size"
                autoComplete="size"
                onChange={handleOnChangeSize}
                onBlur={runControlValidation('size')}
                error={!!formState.errors && !!formState.errors['size']}
                helperText={formState.errors && formState.errors['size']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="imageUrl"
                label="Снимка"
                type="password"
                id="imageUrl"
                autoComplete="imageUrl"
                onChange={handleOnChangeImageUrl}
                onBlur={runControlValidation('imageUrl')}
                error={!!formState.errors && !!formState.errors['imageUrl']}
                helperText={formState.errors && formState.errors['imageUrl']}
              />
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
            Добави продукта
          </Button>
        </form>
      </div>
    </Container>
  );
};

const schema = yup.object().shape({
//   name: yup.string().required('Name is required'),
//   userType: yup.string().required('Field is required'),
//   email: yup
//     .string()
//     .email('Must be valid email')
//     .required('Email is required'),
//   password: yup
//     .string()
//     .required('Password is required')
//     .min(6, 'Password must be at least 6 symbols'),
//   rePassword: yup
//     .string()
//     .oneOf([yup.ref('password'), null], 'Password don`t match')
//     .required('Password is required')
//     .min(6, 'Password must be at least 6 symbols'),
});

const initialState = {
  name: '',
  year: '',
  type: '',
  alcohol: '',
  size: '',
  imageUrl: '',
  creatorId: '',
};

export default withForm(Register, initialState, schema);
