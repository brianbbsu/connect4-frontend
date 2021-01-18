import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import { loadingUser, unauthorizedUser, UserContext } from './userContext';
import { requestCheckLogin } from './api';
import { TopBar } from './components/TopBar';
import { Home } from './components/Home';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { ROUTE_HOME, ROUTE_SIGN_IN, ROUTE_SIGN_UP } from './constants';

function App() {
  const [nowUser, setNowUser] = useState(loadingUser);

  const authorizeAndSetUser = async token => {
    const username = await requestCheckLogin();
    if (username !== null) {
      console.log('yes');
      setNowUser({
        authorized: true,
        username
      });
    }
    else {
      console.log('no');
      setNowUser(unauthorizedUser);
    }
  };

  useEffect(() => {
    console.log('loading authorize')
    authorizeAndSetUser();
  }, []);

  return (
    <UserContext.Provider value={nowUser}>
      <TopBar authorizeAndSetUser={authorizeAndSetUser} />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path={ROUTE_HOME}>
            <Home />
          </Route>
          <Route exact path={ROUTE_SIGN_IN}>
           <SignIn authorizeAndSetUser={authorizeAndSetUser} />
          </Route>
          <Route exact path={ROUTE_SIGN_UP}>
           <SignUp authorizeAndSetUser={authorizeAndSetUser} />
          </Route>
        </Switch>
      </Container>
    </UserContext.Provider>
  );
}

export default App;
