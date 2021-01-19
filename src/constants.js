const ROUTE_HOME = '/';
const ROUTE_GAMES = '/games';
const ROUTE_USERS = '/users';
const ROUTE_SIGN_IN = '/signIn';
const ROUTE_SIGN_UP = '/signUp';
const ROUTE_USER_PROFILE = '/users/:username';
const make_user_profile_route = username => `/users/${username}`;
const ROUTE_GAME_PAGE = '/games/:gameID';
const make_game_page_route = gameID => `/games/${gameID}`;

const SOCKET_CHAT = `${process.env.REACT_APP_API_URL}/chats`
const SOCKET_GAME = `${process.env.REACT_APP_API_URL}/games`

const GAME_STATUS_ONGOING = 'ongoing';
const GAME_STATUS_PLAYER1_WINS = 'player1_wins';
const GAME_STATUS_PLAYER2_WINS = 'player2_wins';
const GAME_STATUS_TIE = 'tie';

export { 
  ROUTE_HOME, ROUTE_GAMES, ROUTE_USERS, ROUTE_SIGN_IN, ROUTE_SIGN_UP, 
  ROUTE_USER_PROFILE, make_user_profile_route, 
  ROUTE_GAME_PAGE, make_game_page_route,
  SOCKET_CHAT, SOCKET_GAME, 
  GAME_STATUS_ONGOING, GAME_STATUS_PLAYER1_WINS, GAME_STATUS_PLAYER2_WINS, GAME_STATUS_TIE
};
