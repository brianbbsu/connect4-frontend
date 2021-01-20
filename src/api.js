import axios from 'axios';

const instance = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL,
  validateStatus: function (status) {
    return true;
  }
});


function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function deleteToken(token) {
  localStorage.removeItem('token');
}

async function requestSignUp({ username, password }) {
  const { data: { token, message }, status } = await instance.post(
    '/auth/register',
    { username, password } 
  );

  if (status === 200) {
    return { token, message };
  }
  return { token: null, message };
}

async function requestSignIn({ username, password }) {
  const { data: { token, message }, status } = await instance.post(
    '/auth/login',
    { username, password } 
  );

  if (status === 200) {
    return { token, message };
  }
  return { token: null, message };
}

async function requestCheckLogin() {
  const token = getToken();
  if (token !== null) {
    const { data: { username }, status } = await instance.get(
      '/me', 
      { headers: { Authorization: `Token ${token}` } }
    );

    if (status === 200) {
      return username;
    }
    return null;
  }
  return null;
}

async function requestSignOut() {
  const token = getToken();

  if (token !== null) {
    const { status } = await instance.post(
      '/auth/logout', 
      {},
      { headers: { Authorization: `Token ${token}` } }
    );

    if (status === 200) {
      return true;
    }
    return false;
  }
  return false;
}

async function requestGameList() {
  const { data: { games }, status } = await instance.get(
    '/games', 
  );

  if (status === 200) {
    return games;
  }
  return null;
}

async function requestUserGameList(username) {
  const { data: { games }, status } = await instance.get(
    '/games', {
      params: {
        username
      }
    });

  if (status === 200) {
    return games;
  }
  return null;
}

async function requestUserList() {
  const { data: { users }, status } = await instance.get(
    '/users', 
  );

  if (status === 200) {
    return users;
  }
  return null;
}

async function requestUserInfo(username) {
  const { data: { user }, status } = await instance.get(
    `/users/${username}`, 
  );

  if (status === 200) {
    return user;
  }
  return null;
}

export { getToken, setToken, deleteToken, requestSignUp, requestSignIn, requestCheckLogin, requestSignOut, requestGameList, requestUserGameList, requestUserList, requestUserInfo };
