import { useState, useContext, useEffect, useRef } from "react";
import { Box, Paper, Typography } from '@material-ui/core';
import { GAME_STATUS_ONGOING, GAME_STATUS_PLAYER1_WINS, GAME_STATUS_PLAYER2_WINS, GAME_STATUS_TIE } from '../constants';
import { UserContext, GameInfoContext } from '../contexts';
import { SimpleDialog } from "./SimpleDialog";

const GameStatus = () => {
  const { status, player1, player2 } = useContext(GameInfoContext);
  const user = useContext(UserContext);
  const savedStatus = useRef(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');

  const winMsg = "You win the game!";
  const loseMsg = "You lose the game...";
  const tieMsg = "Draw!";

  useEffect(() => {
    if (savedStatus.current === GAME_STATUS_ONGOING && status !== GAME_STATUS_ONGOING) {
      // Game finished!
      if (user.username === player1 || user.username === player2) {
        if (status === GAME_STATUS_PLAYER1_WINS) {
          if (user.username === player1)
            setMessage(winMsg);
          else 
            setMessage(loseMsg);
        } else if (status === GAME_STATUS_PLAYER2_WINS) {
          if (user.username === player2)
            setMessage(winMsg);
          else 
            setMessage(loseMsg);
        } else 
          setMessage(tieMsg);
        setOpenDialog(true);
      }      
    }
    savedStatus.current = status;
  }, [status]);

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
      <SimpleDialog
        content={message}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Box>
  );
};

export { GameStatus };