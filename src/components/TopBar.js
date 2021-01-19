import { Fragment, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Box, AppBar, Toolbar, Button } from '@material-ui/core';

import { UserContext } from '../userContext';
import { ROUTE_HOME, ROUTE_GAMES, ROUTE_USERS, ROUTE_SIGN_IN, ROUTE_SIGN_UP, make_user_profile_route } from '../constants';
import { deleteToken, requestSignOut } from '../api';

function TopBar({ authorizeAndSetUser }) {
  const user = useContext(UserContext);

  const history = useHistory();
  const signOut = async () => {
    const success = await requestSignOut();
    if (success) {
      deleteToken();
      history.push(ROUTE_HOME);
      authorizeAndSetUser();
    }
    else {
      deleteToken();
      history.push(ROUTE_HOME);
      authorizeAndSetUser();
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        { user.authorized !== null && (
          <Fragment>
            <Box display="flex" flexGrow={1}>
              <Button color="inherit" component={Link} to={ROUTE_HOME}>Home</Button>
              <Button color="inherit" component={Link} to={ROUTE_GAMES}>Games</Button>
              <Button color="inherit" component={Link} to={ROUTE_USERS}>Users</Button>
            </Box>
            { user.authorized ? (
              <Fragment>
                <Button 
                  color="default" 
                  variant="contained" 
                  style={{textTransform: 'none'}}
                  component={Link}
                  to={make_user_profile_route(user.username)}
                >
                  { user.username }
                </Button>
                <Button color="inherit" onClick={signOut}>Sign out</Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to={ROUTE_SIGN_IN}>Sign In</Button>
                <Button color="inherit" component={Link} to={ROUTE_SIGN_UP}>Sign Up</Button>
              </Fragment>
            ) }
          </Fragment>
        ) }
      </Toolbar>
    </AppBar>
  );
}

export { TopBar };
