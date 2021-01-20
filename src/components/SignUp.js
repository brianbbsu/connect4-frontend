import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, Grid, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { ROUTE_HOME } from '../constants';
import { setToken, requestSignUp } from '../api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(1),
  }
}));

function SignUp({ authorizeAndSetUser }) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessages, setErrorMessages] = useState({
    username: null,
    password: null,
    confirmPassword: null
  });

  const history = useHistory();

  const check = async (event: Event) => {
    event.preventDefault();
    let anyError = false;
    const newErrorMessage = {
      username: null,
      password: null,
      confirmPassword: null
    };
    const usernameRegex = /^[a-zA-Z0-9-_]{1,32}$/;
    const passwordMinLength = 6;
    if (username === '') {
      newErrorMessage.username = 'Username must not be empty.';
      anyError = true;
    } else if (!usernameRegex.test(username)) {
      newErrorMessage.username = `Username should match ${usernameRegex}.`;
      anyError = true;
    }
    if (password === '') {
      newErrorMessage.password = 'Password must not be empty.';
      anyError = true;
    } else if (password.length < passwordMinLength) {
      newErrorMessage.password = `Password must be at least ${passwordMinLength} characters long.`;
      anyError = true;
    }
    if (password !== confirmPassword) {
      newErrorMessage.confirmPassword = 'Passwords are different.';
      anyError = true;
    }
    if (anyError) {
      setErrorMessages(newErrorMessage);
      return;
    }
    const { token, message } = await requestSignUp({ password, username });
    if (token !== null) {
      setToken(token);
      history.push(ROUTE_HOME);
      authorizeAndSetUser();
    }
    else {
      setErrorMessages({
        username: message
      })
    }
  };

  const handlerFactory = setter => {
    return e => {
      setErrorMessages({
        username: null,
        password: null,
        confirmPassword: null
      });
      setter(e.target.value);
    };
  };

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h3">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={check} noValidate>
          <TextField
            id="username"
            label="Username"
            name="username"
            error={errorMessages.username}
            helperText={errorMessages.username || 'Username can only contains characters in [a-zA-Z0-9_-].'}
            value={username}
            onChange={handlerFactory(setUsername)}
            margin="dense"
            autoComplete="off"
            fullWidth
            autoFocus
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            error={errorMessages.password}
            helperText={errorMessages.password || 'Password should be at least 6 characters long.'}
            value={password}
            onChange={handlerFactory(setPassword)}
            margin="dense"
            autoComplete="off"
            fullWidth
          />
          <TextField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            name="confirm-password"
            error={errorMessages.confirmPassword}
            helperText={errorMessages.confirmPassword || ' '}
            value={confirmPassword}
            onChange={handlerFactory(setConfirmPassword)}
            margin="dense"
            autoComplete="off"
            fullWidth
          />
          <Grid container direction="row" alignItems="center">
            <Grid item xs={9}>
              { /* Sign in */ }
            </Grid>
            <Grid item xs={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export { SignUp }
