import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, Grid, Container, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { ROUTE_HOME } from '../constants';
import { setToken, requestSignIn } from '../api';

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

function SignIn({ authorizeAndSetUser }) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formPending, setFormPending] = useState(false);

  const [errorMessages, setErrorMessages] = useState({
    username: null,
    password: null,
  });

  const history = useHistory();

  const check = async (event: Event) => {
    event.preventDefault();
    if (formPending) return; // Prevent double send
    let anyError = false;
    const newErrorMessage = {
      username: null,
      password: null
    };
    if (username === '') {
      newErrorMessage.username = 'Username must not be empty.';
      anyError = true;
    }
    if (password === '') {
      newErrorMessage.password = 'Password must not be empty.';
      anyError = true;
    }
    if (anyError) {
      setErrorMessages(newErrorMessage);
      return; // Validation failed. Do not submit
    }
    setFormPending(true);
    const { token, message } = await requestSignIn({ password, username });
    setFormPending(false);
    if (token !== null) {
      setToken(token);
      history.push(ROUTE_HOME);
      authorizeAndSetUser();
    }
    else {
      setErrorMessages({
        username: message,
        password: message,
      })
      setPassword(''); // Clear password field
    }
  };

  const handlerFactory = setter => {
    return e => {
      setErrorMessages({
        username: null,
        password: null
      });
      setter(e.target.value);
    };
  };

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h3">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={check} noValidate>
          <TextField
            id="username"
            label="Username"
            name="username"
            error={errorMessages.username}
            helperText={errorMessages.username || ' '}
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
            helperText={errorMessages.password || ' '}
            value={password}
            onChange={handlerFactory(setPassword)}
            margin="dense"
            autoComplete="off"
            fullWidth
          />
          <Grid container direction="row" alignItems="center" justify="flex-end">
            <Grid item xs={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
                disabled={formPending}
              >
                { formPending ? (<CircularProgress variant="indeterminate" size={24.5}/>) : "Sign in" } 
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export { SignIn }
