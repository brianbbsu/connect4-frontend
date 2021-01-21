import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography, Grid, Card, CardContent, Avatar, IconButton, Tooltip, Chip } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { UserProfileLink } from './UserProfileLink';
import { GAME_STATUS_ONGOING, GAME_STATUS_PLAYER1_WINS, GAME_STATUS_PLAYER2_WINS, GAME_STATUS_TIE } from '../constants';
import { UserContext, GameInfoContext } from '../contexts';

import image_board from '../images/board.png';
import image_red from '../images/red.png';
import image_yellow from '../images/yellow.png';

function makeHoverBoard(board, j, color, username, status, player1, player2) {
  if (status !== GAME_STATUS_ONGOING) {
    return [board, null];
  }
  if (!((color === 1 && player1 === username) || (color === 2 && player2 === username))) {
    return [board, null];
  }
  if (j === -1) {
    return [board, null];
  }
  for (let i = 5; i >= 0; i--) {
    if (board[i][j] === 0) {
      const arr = [...board];
      arr[i] = [...arr[i]];
      arr[i][j] = -color;
      return [arr, { col: j, row: 5 - i }];
    }
  }
  return [board, null];
}

const useStyles = makeStyles(theme => ({
  playerName: {
    fontSize: "18px",
  } 
}));

const useCardHighlightStyles = makeStyles(theme => ({
  root: {
      borderColor: theme.palette.primary.main,
      border: '3px solid',
    }
}));


function Board({ moves, sendMove, valid }) {
  const user = useContext(UserContext);
  const { status, player1, player2 } = useContext(GameInfoContext);
  const classes = useStyles();
  const cardHighlightClasses = useCardHighlightStyles();

  const [viewIdx, setViewIdx] = useState(-1);

  const board = (() => {
    const arr = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        row.push(0);
      }
      arr.push(row);
    }
    const cap = viewIdx === -1 ? moves.length : viewIdx;
    for (let i = 0; i < cap; i++) {
      arr[5 - moves[i].row][moves[i].col] = i % 2 + 1;
    }
    return arr;
  })();

  const [hover, setHover] = useState(-1);

  const [boardWithHover, target] = viewIdx !== -1 ? [board, null] : makeHoverBoard(board, hover, moves.length % 2 + 1, user.username, status, player1, player2);

  const handleClick = () => {
    if (target !== null) {
      sendMove(target);
    }
  };

  const activePlayer = status === GAME_STATUS_ONGOING ? moves.length % 2 + 1 : 0;

  if (valid === null) {
    return (
      <></>
    );
  }

  if (valid === false) {
    return (
      <Box p={2} component={Paper}>
        <Typography>
          Invalid Game ID
        </Typography>
      </Box>
    );
  }

  const BoardMatrix = () => (
    <div
      style={{ width: '100%' }}
      onMouseLeave={() => setHover(-1)}
      onClick={handleClick}
    >
      {
        boardWithHover.map((row, idxRow) => (
          <div style={{ display: 'flex', width: '100%' }} key={idxRow}>
            {
              row.map((e, idxCol) => (
                <div
                  style={{ flex: '1 1  auto' }}
                  key={idxCol}
                  onMouseEnter={() => setHover(idxCol)}
                >
                  <div style={{ width: '100%', position: 'relative', paddingBottom: '100%' }}>
                    <img
                      src={image_board}
                      alt="missing board"
                      style={{
                        position: 'absolute',
                        zIndex: '1',
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        userSelect: 'none',
                        pointerEvents: 'none'
                      }}
                    />
                    {e !== 0 && (
                      <img
                        src={e * e === 1 ? image_yellow : image_red}
                        alt="missing piece"
                        style={{
                          position: 'absolute',
                          zIndex: '0',
                          height: '100%',
                          top: '0px',
                          left: '0px',
                          opacity: e < 0 ? 0.5 : 1,
                          userSelect: 'none',
                          pointerEvents: 'none'
                        }}
                      />
                    )}
                  </div>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );

  const BoardHistoryNavigator = () => (
    <Grid container justify="center" alignItems="center" spacing={1}>
      <Grid item>
        <Tooltip title="Prev Move" arrow>
          <div>
            <IconButton
              disabled={moves.length === 0 || viewIdx === 0}
              onClick={
                () => {
                  setViewIdx(oldIdx => {
                    if (oldIdx === -1)
                      return moves.length - 1;
                    return oldIdx - 1;
                  });
                }
              }
              size="small"
            >
              <NavigateBeforeIcon />
            </IconButton>
          </div>
        </Tooltip>
      </Grid>
      <Grid item>
        <Typography variant="h6">
          {viewIdx === -1 ? moves.length : viewIdx} / {moves.length}
        </Typography>
      </Grid>
      <Grid item>
        <Tooltip title="Next Move" arrow>
          <div>
            <IconButton
              disabled={viewIdx === -1}
              onClick={
                () => {
                  setViewIdx(oldIdx => {
                    if (oldIdx === moves.length - 1) {
                      return -1;
                    }
                    return oldIdx + 1;
                  });
                }
              }
              size="small"
            >
              <NavigateNextIcon />
            </IconButton>
          </div>
        </Tooltip>
      </Grid>
    </Grid>
  );

  const PlayerInfo = () => (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card
          raised={activePlayer === 1}
          classes={activePlayer === 1 ? cardHighlightClasses : {}}
        >
          <CardContent>
            <Grid container alignItems="center" justify="flex-start" spacing={1}>
              <Grid item>
                <Avatar src={image_yellow} />
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  Player1
                </Typography>
                <Typography variant="h6" className={classes.playerName}>
                  <UserProfileLink username={player1} />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          raised={activePlayer === 2}
          classes={activePlayer === 2 ? cardHighlightClasses : {}}
        >
          <CardContent>
            <Grid container alignItems="center" justify="flex-end" spacing={1}>
              <Grid item>
                <Typography variant="caption" align="right">
                  Player2
                </Typography>
                <Typography variant="h6" className={classes.playerName}>
                  <UserProfileLink username={player2} />
                </Typography>
              </Grid>
              <Grid item>
                <Avatar src={image_red} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box p={2} component={Paper}>
      <BoardMatrix />
      <BoardHistoryNavigator />
      <PlayerInfo />
    </Box>
  )
}

export { Board };