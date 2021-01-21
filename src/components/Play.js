import { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Button, Grid, Typography, LinearProgress, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { getToken, deleteToken } from '../api';
import { SimpleDialog } from "./SimpleDialog";

import { ROUTE_HOME, make_game_page_route, SOCKET_PAIR } from '../constants';

const NOT_QUEUED = 'not queued';
const QUEUE_PLAYER = 'queue player';
const QUEUE_AI = 'queue ai';

const ERROR_LOGIN_FIRST = 'Login first.';
const ERROR_ALREADY_WAITING = 'Already waiting.';

const useStyles = makeStyles((theme) => ({
  matchButton: {
    padding: theme.spacing(1, 0),
    marginTop: theme.spacing(1),
  },
  linearProgress: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1)
  },
  cancelButton: {
    padding: theme.spacing(0, 1),
  }
}));

function Play({ authorizeAndSetUser }) {
  const classes = useStyles();
  const [queueStatus, setQueueStatus] = useState(NOT_QUEUED);
  const [dialogOpen, setDialogOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (queueStatus !== NOT_QUEUED) {
      const withAI = queueStatus === QUEUE_AI;
      const socket = io(SOCKET_PAIR, {
        auth: {
          token: getToken(),
        }
      });
      socket.emit('pair', withAI, err => {
        if (err === ERROR_LOGIN_FIRST) {
          deleteToken();
          history.push(ROUTE_HOME);
          authorizeAndSetUser();
        }
        if (err === ERROR_ALREADY_WAITING) {
          setDialogOpen(true);
          setQueueStatus(NOT_QUEUED);
        }
      });

      const disconnectHandler = reason => {
        console.log('disconncted');
        if (reason === 'io server disconnect') {
          console.log('server disconnected');
          deleteToken();
          history.push(ROUTE_HOME);
          authorizeAndSetUser();
        }
      };

      socket.on('disconnect', disconnectHandler);

      socket.on('paired', gameID => {
        history.push(make_game_page_route(gameID));
      });

      return () => {
        socket.emit('leave');
        socket.close();
        setQueueStatus(NOT_QUEUED);
      };
    }
  }, [queueStatus, authorizeAndSetUser, history]);

  const MatchButton = ({text, targetQueueStatus}) => (
    <Button 
      variant="contained"
      disabled={queueStatus !== NOT_QUEUED}
      onClick={() => setQueueStatus(targetQueueStatus)}
      className={classes.matchButton}
      fullWidth
    >
      {text}
    </Button>
  );

  return (
    <Fragment>
      <Card>
        <CardHeader title="Play Now" titleTypographyProps={{variant: "h4"}} />
        <CardContent>
          { queueStatus === NOT_QUEUED ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <MatchButton text="Match with player" targetQueueStatus={QUEUE_PLAYER}/>
              </Grid>
              <Grid item xs={6}>
                <MatchButton text="Match with AI" targetQueueStatus={QUEUE_AI}/>
              </Grid>
            </Grid>
          ) : (
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography variant="overline">
                Waiting for { queueStatus === QUEUE_PLAYER ? "another player..." : "AI..." }
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="text" size="small" className={classes.cancelButton} onClick={() => setQueueStatus(NOT_QUEUED)}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress className={classes.linearProgress}/>
            </Grid>
          </Grid>
          )}
        </CardContent>
      </Card>
      <SimpleDialog
        content="You are already waiting in line using the same account."
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Fragment>
  );
}

export { Play };
