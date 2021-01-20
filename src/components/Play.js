import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Button, Grid } from '@material-ui/core';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { getToken, deleteToken } from '../api';

import { ROUTE_HOME, make_game_page_route, SOCKET_PAIR } from '../constants';

const NOT_QUEUED = 'not queued';
const QUEUE_PLAYER = 'queue player';
const QUEUE_AI = 'queue ai';

const ERROR_LOGIN_FIRST = 'Login first.';
const ERROR_ALREADY_WAITING = 'Already waiting.';

function Play({ authorizeAndSetUser }) {
  const [queueStatus, setQueueStatus] = useState(NOT_QUEUED);

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

  return (
    <Card>
      <CardHeader title="Play Now" />
      <CardContent>
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={6}>
            <Button 
              variant="contained"
              disabled={queueStatus !== NOT_QUEUED}
              onClick={() => setQueueStatus(QUEUE_PLAYER)}
            >
              Match with player
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="contained"
              disabled={queueStatus !== NOT_QUEUED}
              onClick={() => setQueueStatus(QUEUE_AI)}
            >
              Match with AI
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export { Play };
