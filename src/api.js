import axios from 'axios';

const instance = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL,
  validateStatus: function (status) {
    return true;
  }
});

function getToken() {
  console.log('getting token');
  return localStorage.getItem('token');
}

function setToken(token) {
  console.log('setting token');
  localStorage.setItem('token', token);
}

function deleteToken(token) {
  console.log('deleting token');
  localStorage.removeItem('token');
}

async function requestSignUp({ username, password }) {
  //console.log('inside requestSignUp', username, password);
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
  console.log('inside requestCheckLogin', token);
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
  console.log('inside requestCheckLogin', token);

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

export { getToken, setToken, deleteToken, requestSignUp, requestSignIn, requestCheckLogin, requestSignOut };
