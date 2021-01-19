import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { make_user_profile_route } from '../constants';

function UserProfileLink({ username }) {
  return (
    <Typography 
      component={Link} 
      to={make_user_profile_route(username)}
      onClick={e => e.stopPropagation()}
    >
      {username}
    </Typography>
  );
}

export { UserProfileLink };
