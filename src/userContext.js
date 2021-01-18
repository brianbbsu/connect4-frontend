import React from 'react';

const loadingUser = {
  authorized: null,
  username: null
};

const unauthorizedUser = {
  authorized: false,
  username: null
};

const UserContext = React.createContext(unauthorizedUser);

export { loadingUser, unauthorizedUser, UserContext };
