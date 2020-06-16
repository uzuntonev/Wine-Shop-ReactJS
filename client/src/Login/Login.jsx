import React, { useContext } from 'react';
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
import { AuthContext } from '../App/ContexWrapper';
import userService from '../services/user-service';
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

  const { auth, setAuth } = useContext(AuthContext);

  const handleOnChangeEmail = changeHandlerFactory('email');
  const handleOnChangePassword = changeHandlerFactory('password');

  const handleSubmit = (e) => {
    e.preventDefault();
    runValidations().then((formData) => {
      userService.login(formData).then(() => {
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Потребителско име"
            name="email"
            autoComplete="email"
            onChange={handleOnChangeEmail}
            onBlur={runControlValidation('email')}
            error={!!formState.errors && !!formState.errors['email']}
            helperText={formState.errors && formState.errors['email']}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleOnChangePassword}
            onBlur={runControlValidation('password')}
            error={!!formState.errors && !!formState.errors['password']}
            helperText={formState.errors && formState.errors['password']}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formIsInvalid()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/login" variant="body2">
                Forgot password?
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
