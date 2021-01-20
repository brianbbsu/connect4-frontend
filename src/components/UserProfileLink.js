import { Link as RouterLink} from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';

import { make_user_profile_route } from '../constants';

function UserProfileLink({ username }) {
  return (
    <Link 
      component={RouterLink} 
      to={make_user_profile_route(username)}
      onClick={e => e.stopPropagation()}
    >
      {username}
    </Link>
  );
}

export { UserProfileLink };
