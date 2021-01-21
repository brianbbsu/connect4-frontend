import { useContext } from "react";
import { Box, Paper, Typography } from '@material-ui/core';
import { GAME_STATUS_ONGOING, GAME_STATUS_PLAYER1_WINS, GAME_STATUS_PLAYER2_WINS, GAME_STATUS_TIE } from '../constants';
import { GameInfoContext } from '../contexts';

const GameStatus = () => {
  const { status } = useContext(GameInfoContext);

  if (status === null)
    return (<></>);

  const statusText = (() => {
    if (status === GAME_STATUS_PLAYER1_WINS) {
      return 'Player1 Won';
    }
    if (status === GAME_STATUS_PLAYER2_WINS) {
      return 'Player2 Won';
    }
    if (status === GAME_STATUS_TIE) {
      return 'Tie';
    }
    return 'On going';
  })();

  return (
    <Box p={2} component={Paper}>
      <Typography variant="h6">
        Status: <b>{ statusText }</b>
      </Typography>
    </Box>
  );
};

export { GameStatus };