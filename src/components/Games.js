import { useState, useEffect, useContext } from 'react';
import { Box, Paper, Tabs, Tab, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { UserProfileLink } from './UserProfileLink.js';
import { UserContext } from '../contexts';
import { requestGameList } from '../api';
import { make_game_page_route } from '../constants';

const ALL_GAMES = 'all';
const MY_GAMES = 'my';

function Games() {
  const user = useContext(UserContext);

  const [games, setGames] = useState([]);
  const [viewMode, setViewMode] = useState(ALL_GAMES);

  const handleChange = (event, newViewMode) => {
    setViewMode(newViewMode);
  };

  useEffect(() => {
    async function go() {
      const newGames = await requestGameList();
      if (newGames === null) {
        return;
      }
      setGames(newGames);
    }
    go();
  }, []);

  const viewGames = viewMode === ALL_GAMES ? games : games.filter(game => game.player1 === user.username || game.player2 === user.username);

  const history = useHistory();

  const makeHandleClick = id => {
    return () => {
      history.push(make_game_page_route(id));
    };
  };

  const gameTable = (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Player 1</TableCell>
            <TableCell>Player 2</TableCell>
            <TableCell>Game Status</TableCell>
            <TableCell>Game Start Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            viewGames.map(
              game => (
                <TableRow
                  key={game.id} 
                  onClick={makeHandleClick(game.id)}
                  hover
                >
                  <TableCell align="right">{game.id}</TableCell>
                  <TableCell><UserProfileLink username={game.player1} /></TableCell>
                  <TableCell><UserProfileLink username={game.player2} /></TableCell>
                  <TableCell>{game.status}</TableCell>
                  <TableCell>{game.createdAt}</TableCell>
                </TableRow>
              )
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box m={2} component={Paper}>
      <Tabs value={viewMode} onChange={handleChange}>
        <Tab label="All Games" value={ALL_GAMES} /> 
        <Tab label="My Games" value={MY_GAMES} disabled={user.authorized !== true} /> 
      </Tabs>
      <Box p={2}>
        {gameTable}
      </Box>
    </Box>
  );
}

export { Games }
