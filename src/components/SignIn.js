import { useState } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { ROUTE_HOME } from '../constants';
import { setToken, requestSignIn } from '../api';

function SignIn({ authorizeAndSetUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessages, setErrorMessages] = useState({
    username: null,
    password: null,
    confirmPassword: null
  });

  const [backendErrorMessage, setBackendErrorMessage] = useState(null);

  const history = useHistory();

  const check = async () => {
    let flag = true;
    let newErrorMessage = {
      username: null,
      password: null
    };
    if (username === '') {
      newErrorMessage = {...newErrorMessage, username: 'Username must not be empty.'};
      flag = false;
    }
    if (password === '') {
      newErrorMessage = {...newErrorMessage, password: 'Passwords must not be empty.'};
      flag = false;
    }
    if (!flag) {
      setErrorMessages(newErrorMessage);
      return;
    }
    console.log('ok');
    const { token, message } = await requestSignIn({ password, username });
    if (token !== null) {
      setToken(token);
      history.push(ROUTE_HOME);
      authorizeAndSetUser();
    }
    else {
      setBackendErrorMessage(message);
    }
  };

  const handlerFactory = setter => {
    return e => {
      setErrorMessages({
        username: null,
        password: null
      });
      setBackendErrorMessage(null);
      setter(e.target.value);
    };
  };

  return (
    <Paper>
      <h1>Sign In</h1>
      <div>
        <TextField 
          id="username" 
          label="Username" 
          error={errorMessages.username !== null} 
          helperText={errorMessages.username} 
          value={username} 
          onChange={handlerFactory(setUsername)} 
        />
      </div>
      <div>
        <TextField 
          id="password" 
          label="Password"
          type="password" 
          error={errorMessages.password !== null} 
          helperText={errorMessages.password} 
          value={password} 
          onChange={handlerFactory(setPassword)} 
        />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={check}>Sign In</Button>
      </div>
      <div>
        {backendErrorMessage}
      </div>
    </Paper>
  );
}

export { SignIn }
