import { useState, useEffect, useContext } from 'react';
import { Box, Paper, Tabs, Tab, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

import { UserContext } from '../userContext';
import { requestGames } from '../api';

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
      const newGames = await requestGames();
      if (newGames === null) {
        return;
      }
      setGames(newGames);
    }
    go();
  }, [user]);

  const viewGames = viewMode === ALL_GAMES ? games : games.filter(game => game.player1 === user.username || game.player2 === user.username);

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
                <TableRow key={game.id} onClick={() => console.log(game)}>
                  <TableCell align="right">{game.id}</TableCell>
                  <TableCell>{game.player1}</TableCell>
                  <TableCell>{game.player2}</TableCell>
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
