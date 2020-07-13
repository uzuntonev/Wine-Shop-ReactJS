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
import { StoreContext } from '../Store/Store';
import { register } from '../Store/actions';
import InputField from '../InputField/InputField';

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
  const { state, dispatch } = useContext(StoreContext);

  const handleOnChangeName = changeHandlerFactory('name');
  const handleOnChangePassword = changeHandlerFactory('password');
  const handleOnChangeEmail = changeHandlerFactory('email');
  const handleOnChangeRePassword = changeHandlerFactory('rePassword');
  const handleOnChangeUserType = changeHandlerFactory('userType');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    runValidations().then((formData) => {
      dispatch(register(formData));
      history.push('/');
    });
  });

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
            <Grid item xs={12}>
              <InputField
                label={'Потребителско име'}
                name={'name'}
                changeHandler={handleOnChangeName}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                label={'Email адрес'}
                name={'email'}
                changeHandler={handleOnChangeEmail}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                label={'Парола'}
                name={'password'}
                changeHandler={handleOnChangePassword}
                runControlValidation={runControlValidation}
                formState={formState}
                type={'password'}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                label={'Потвърди парола'}
                name={'rePassword'}
                changeHandler={handleOnChangeRePassword}
                runControlValidation={runControlValidation}
                formState={formState}
                type={'password'}
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
            Регистрация
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
};

export default withForm(Register, initialState, schema);
