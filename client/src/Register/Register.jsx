import React, { useContext } from 'react';
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
import { AuthContext } from '../App/ContexWrapper';
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
  const handleOnChangePassword = changeHandlerFactory('password');
  const handleOnChangeEmail = changeHandlerFactory('email');
  const handleOnChangeRePassword = changeHandlerFactory('rePassword');
  const handleOnChangeUserType = changeHandlerFactory('userType');

  const handleSubmit = (e) => {
    e.preventDefault();
    runValidations().then((formData) => {
      userService.register(formData).then(({ data }) => {
        console.log(data);
        setAuth(true);
        history.push('/');
      });
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
                label="Потребителско име"
                onChange={handleOnChangeName}
                onBlur={runControlValidation('name')}
                error={!!formState.errors && !!formState.errors['name']}
                helperText={formState.errors && formState.errors['name']}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="userType">Тип потребител</InputLabel>
                <Select
                  labelId="userType"
                  id="userType"
                  name="userType"
                  label="Тип потребител"
                  onChange={handleOnChangeUserType}
                  error={!!formState.errors && !!formState.errors['userType']}
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
                id="email"
                label="Email Адрес"
                name="email"
                autoComplete="email"
                onChange={handleOnChangeEmail}
                onBlur={runControlValidation('email')}
                error={!!formState.errors && !!formState.errors['email']}
                helperText={formState.errors && formState.errors['email']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Парола"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleOnChangePassword}
                onBlur={runControlValidation('password')}
                error={!!formState.errors && !!formState.errors['password']}
                helperText={formState.errors && formState.errors['password']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="rePassword"
                label="Потвърди парола"
                type="password"
                id="rePassword"
                autoComplete="current-rePassword"
                onChange={handleOnChangeRePassword}
                onBlur={runControlValidation('rePassword')}
                error={!!formState.errors && !!formState.errors['rePassword']}
                helperText={formState.errors && formState.errors['rePassword']}
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  userType: yup.string().required('Field is required'),
  email: yup
    .string()
    .email('Must be valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 symbols'),
  rePassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password don`t match')
    .required('Password is required')
    .min(6, 'Password must be at least 6 symbols'),
});

const initialState = {
  name: '',
  email: '',
  password: '',
  rePassword: '',
  userType: '',
};

export default withForm(Register, initialState, schema);
