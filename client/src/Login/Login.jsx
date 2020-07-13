import React, { useContext, useCallback } from 'react';
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
import withForm from '../hocs/withForm';
import { StoreContext } from '../Store/Store';
import { login } from '../Store/actions';
import InputField from '../InputField/InputField';

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

const Login = ({
  changeHandlerFactory,
  formState,
  runValidations,
  runControlValidation,
  formIsInvalid,
  history,
}) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext);

  const handleOnChangeEmail = changeHandlerFactory('email');
  const handleOnChangePassword = changeHandlerFactory('password');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    runValidations().then((formData) => {
      dispatch(login(formData));
      history.push('/', {status: 'success'});
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
          Влез
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запомни"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formIsInvalid()}
          >
            Влез
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/login" variant="body2">
                Забравена парола?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2" className={classes.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 symbols'),
});

const initialState = {
  email: '',
  password: '',
};

export default withForm(Login, initialState, schema);
