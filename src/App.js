import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { loadingUser, unauthorizedUser, UserContext } from './contexts';
import { requestCheckLogin } from './api';
import { TopBar } from './components/TopBar';
import { Home } from './components/Home';
import { Games } from './components/Games';
import { Users } from './components/Users';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { UserProfile } from './components/UserProfile';
import { GamePage } from './components/GamePage';
import { ROUTE_HOME, ROUTE_GAMES, ROUTE_USERS, ROUTE_SIGN_IN, ROUTE_SIGN_UP, ROUTE_USER_PROFILE, ROUTE_GAME_PAGE } from './constants';

// TODO: Cleaner signout process
// TODO: Better Socket.io handling (fix reconnection in the process)

function App() {
  const [nowUser, setNowUser] = useState(loadingUser);

  const authorizeAndSetUser = async token => {
    const username = await requestCheckLogin();
    if (username !== null) {
      setNowUser({
        authorized: true,
        username
      });
    }
    else {
      setNowUser(unauthorizedUser);
    }
  };

  useEffect(() => {
    authorizeAndSetUser();
  }, []);

  return (
    <UserContext.Provider value={nowUser}>
      <TopBar authorizeAndSetUser={authorizeAndSetUser} />
      <Switch>
        <Route exact path={ROUTE_HOME}>
          <Home />
        </Route>
        <Route exact path={ROUTE_GAMES}>
          <Games />
        </Route>
        <Route exact path={ROUTE_USERS}>
          <Users />
        </Route>
        <Route exact path={ROUTE_SIGN_IN}>
          <SignIn authorizeAndSetUser={authorizeAndSetUser} />
        </Route>
        <Route exact path={ROUTE_SIGN_UP}>
          <SignUp authorizeAndSetUser={authorizeAndSetUser} />
        </Route>
        <Route path={ROUTE_USER_PROFILE}>
          <UserProfile />
        </Route>
        <Route path={ROUTE_GAME_PAGE}>
          <GamePage authorizeAndSetUser={authorizeAndSetUser} />
        </Route>
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
