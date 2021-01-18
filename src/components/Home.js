import { Fragment, useContext } from 'react';
import { Paper } from '@material-ui/core';

import { UserContext } from '../userContext';

function Home() {
  const user = useContext(UserContext);
  return (
    <Paper>
      { user.authorized !== null && user.authorized ? (
        <Fragment>
          <h1>Welcome, {user.username}</h1>
          <div>
            This is a online connect 4 website.
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Home</h1>
          <div>
            This is a online connect 4 website.
          </div>
        </Fragment>
      )}
    </Paper>
  );
}

export { Home }
