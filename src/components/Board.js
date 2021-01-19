import { useState, useContext } from 'react';

import { Box, Paper, Typography } from '@material-ui/core';
import { ROUTE_HOME, SOCKET_CHAT, GAME_STATUS_ONGOING } from '../constants';
import { UserContext, GameInfoContext } from '../contexts';

import image_board from '../images/board.png';
import image_red from '../images/red.png';
import image_yellow from '../images/yellow.png';

function makeHoverBoard(board, j, color, username, status, player1, player2) {
  if (status !== GAME_STATUS_ONGOING) {
    return [board, null];
  }
  if ( !( (color === 1 && player1 === username) || (color === 2 && player2 === username) ) ) {
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

function Board({ moves, sendMove, valid }) {
  const user = useContext(UserContext);
  const { status, player1, player2 } = useContext(GameInfoContext);

  const board = (() => {
    const arr = []; 
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        row.push(0);
      }
      arr.push(row);
    }
    for (let i = 0; i < moves.length; i++) {
      arr[5 - moves[i].row][moves[i].col] = i % 2 + 1;
    }
    return arr;
  })();

  const [hover, setHover] = useState(-1);

  const [boardWithHover, target] = makeHoverBoard(board, hover, moves.length % 2 + 1, user.username, status, player1, player2);

  const handleClick = () => {
    if (target !== null) {
      sendMove(target);
    }
  };

  if (valid === null) {
    return (
      <Box p={2} component={Paper}>
      </Box>
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

  return (
    <Box p={2} component={Paper}>
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
                          width: '100%'
                        }}
                      />
                      { e !== 0 && (
                        <img 
                          src={e * e === 1 ? image_red : image_yellow} 
                          alt="missing piece" 
                          style={{
                            position: 'absolute',
                            zIndex: '0', 
                            height: '100%',
                            top: '0px',
                            left: '0px',
                            height: '100%',
                            opacity: e < 0 ? 0.5 : 1
                          }}
                        />
                      ) }
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </Box>
  )
}

export { Board };
