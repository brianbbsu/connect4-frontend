import { useContext } from 'react';
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
                <Typography variant="h3">Hi, {user.username}.</Typography>
                <Typography>
                  This is an online Connect 4 game website.
                </Typography>
              </Box>
              <Box m={3} width={0.5} alignSelf="center">
                <Play authorizeAndSetUser={authorizeAndSetUser} />
              </Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column">
              <Box>
                <Typography variant="h3">Home</Typography>
                <Typography>
                  This is a online connect 4 website.
                </Typography>
              </Box>
            </Box>
          ) 
        ) }
      </Box>
      <Box p={2} m={2} component={Paper}>
        <Box>
          <Typography variant="h3">Rule</Typography>
          <Typography>
            The two players alternate turns dropping one of their discs 
            at a time into an unfilled column. Any player who achieves a 
            horizontal, vertical, or diagonal four first win. If the board
            is filled up and there is no connected four, and then the game 
            will end in a draw.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export { Home };
