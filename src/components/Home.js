import { Fragment, useContext } from 'react';
import { Box, Paper, Typography, Container } from '@material-ui/core';

import { UserContext } from '../contexts';

function Home() {
  const user = useContext(UserContext);
  return (
    <Container maxWidth="md">
      <Box p={2} m={2} component={Paper}>
        { user.authorized !== null && ( 
          user.authorized ? (
            <Fragment>
              <Typography variant="h1">Welcome, {user.username}.</Typography>
              <Typography>
                This is a online connect 4 website.
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              <Typography variant="h1">Home</Typography>
              <Typography>
                This is a online connect 4 website.
              </Typography>
            </Fragment>
          ) 
        ) }
      </Box>
    </Container>
  );
}

export { Home };
