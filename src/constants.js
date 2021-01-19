const ROUTE_HOME = '/';
const ROUTE_GAMES = '/games';
const ROUTE_USERS = '/users';
const ROUTE_SIGN_IN = '/signIn';
const ROUTE_SIGN_UP = '/signUp';
const ROUTE_USER_PROFILE = '/users/:username';
const make_user_profile_route = username => `/users/${username}`;

export { ROUTE_HOME, ROUTE_GAMES, ROUTE_USERS, ROUTE_SIGN_IN, ROUTE_SIGN_UP, ROUTE_USER_PROFILE, make_user_profile_route };
