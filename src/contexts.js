import React from 'react';

const loadingUser = {
  authorized: null,
  username: null
};

const unauthorizedUser = {
  authorized: false,
  username: null
};

const unknownGameInfo = {
  player1: null,
  player2: null,
  status: null
}

const UserContext = React.createContext(unauthorizedUser);

const GameInfoContext = React.createContext(unknownGameInfo);

export { loadingUser, unauthorizedUser, unknownGameInfo, UserContext, GameInfoContext };
