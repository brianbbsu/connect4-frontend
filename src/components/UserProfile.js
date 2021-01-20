import { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { GameTable } from "./Games";

import { requestUserInfo, requestUserGameList } from '../api';

const NOT_FOUND = 'not found';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1, 2, 2),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 500,
  },
}));

const StatisticCount = ({title, value}) => (
  <Grid item xs={3}>
    <Typography variant="h6">
      {title}
    </Typography>
    <Typography variant="h4">
      {value}
    </Typography>
  </Grid>
);

function UserProfile() {
  const { username: viewUser } = useParams();
  
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(null);
  const [userGames, setUserGames] = useState(null);

  useEffect(() => {
    async function go() {
      const newUserInfo = await requestUserInfo(viewUser);
      if (newUserInfo === null) {
        setUserInfo(NOT_FOUND);
        return;
      }
      setUserInfo(newUserInfo);
      const newUserGames = await requestUserGameList(viewUser);
      setUserGames(newUserGames);
    }
    go();
    return () => {
      setUserInfo(null);
      setUserGames(null);
    };  
  }, [viewUser]);

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        { userInfo !== null && (
          userInfo === NOT_FOUND ? (
            <Typography variant="h6">
              User not found.
            </Typography>
          ) : (
            <Fragment>
              <Typography component="h1" variant="h3" className={classes.title}>
                Profile of {viewUser}
              </Typography>
              <Grid container>
                <StatisticCount title="Games Finished" value={userInfo.gameFinished}/>
                <StatisticCount title="Games Won" value={userInfo.gameWon}/>
                <StatisticCount title="Games Tied" value={userInfo.gameTied}/>
                <StatisticCount title="Games Lost" value={userInfo.gameLost}/>
              </Grid>
              <Typography variant="h5" className={classes.title}>
                Game History of {viewUser}
              </Typography>
              { userGames !== null && (
                <GameTable games={userGames}/>
              )}
            </Fragment>
          )
        ) }
      </Paper>
    </Container>
  );
}

export { UserProfile }
