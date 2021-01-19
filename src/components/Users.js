import { Fragment, useContext } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';

import { UserContext } from '../userContext';

function Users() {
  const user = useContext(UserContext);
  return (
    <Box p={2} m={2} component={Paper}>
      <Typography variant="h1">Users</Typography>
    </Box>
  );
}

export { Users }
