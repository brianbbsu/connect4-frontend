import { Fragment, useContext } from 'react';
import { Box, Paper, Typography, Container } from '@material-ui/core';

import { UserContext } from '../contexts';
import { Play } from './Play';

function Home({ authorizeAndSetUser }) {
  const user = useContext(UserContext);
  return (
    <Container maxWidth="md">
      <Box p={2} m={2} component={Paper}>
        { user.authorized !== null && ( 
          user.authorized ? (
            <Box display="flex" flexDirection="column">
              <Box>
                <Typography variant="h1">Welcome, {user.username}.</Typography>
                <Typography>
                  This is a online connect 4 website.
                </Typography>
              </Box>
              <Box m={2} width={0.5} alignSelf="center">
                <Play authorizeAndSetUser={authorizeAndSetUser} />
              </Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column">
              <Box>
                <Typography variant="h1">Home</Typography>
                <Typography>
                  This is a online connect 4 website.
                </Typography>
              </Box>
            </Box>
          ) 
        ) }
      </Box>
    </Container>
  );
}

export { Home };
