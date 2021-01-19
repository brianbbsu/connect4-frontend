import { useState, useEffect } from 'react';
import { Box, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { UserProfileLink } from './UserProfileLink.js';
import { requestUserList } from '../api';
import { make_user_profile_route } from '../constants';

function Users() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function go() {
      const newUserList = await requestUserList();
      if (newUserList === null) {
        return;
      }
      setUserList(newUserList);
    }
    go();
  }, []);

  const history = useHistory();

  const userTable = (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            userList.map(
              userItem => (
                <TableRow 
                  key={userItem.username} 
                  onClick={() => {
                    //console.log(userItem);
                    history.push(make_user_profile_route(userItem.username))
                  }}
                  hover
                >
                  <TableCell><UserProfileLink username={userItem.username} /></TableCell>
                </TableRow>
              )
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box p={2} m={2} component={Paper}>
      {userTable}
    </Box>
  );
}

export { Users }
