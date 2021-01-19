import { Fragment, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@material-ui/core';

import { UserProfileLink } from './UserProfileLink.js';
import { UserContext } from '../userContext';
import { requestUserInfo } from '../api';

const NOT_FOUND = 'not found';

function UserProfile() {
  const { username: viewUser } = useParams();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function go() {
      const newUserInfo = await requestUserInfo(viewUser);
      if (newUserInfo === null) {
        setUserInfo(NOT_FOUND);
        return;
      }
      setUserInfo(newUserInfo);
    }
    go();
    return () => setUserInfo(null);
  }, [viewUser]);

  return (
    <Box p={2} m={2} component={Paper}>
      { userInfo !== null && (
        userInfo === NOT_FOUND ? (
          <Fragment>
            <Typography>User not found.</Typography>
          </Fragment>
        ) : (
          <Fragment>
            <Typography>Username: <UserProfileLink username={userInfo.username} /></Typography>
            <Typography>Games Finished: {userInfo.gameFinished}</Typography>
            <Typography>Games Won: {userInfo.gameWon}</Typography>
            <Typography>Games Tied: {userInfo.gameTied}</Typography>
            <Typography>Games Lost: {userInfo.gameLost}</Typography>
            <Typography>User Creation Time: {userInfo.createdAt}</Typography>
          </Fragment>
        )
      ) }
    </Box>
  );
}

export { UserProfile }
