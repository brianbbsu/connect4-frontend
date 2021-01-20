import { Link as RouterLink } from 'react-router-dom';
import { Link, makeStyles } from '@material-ui/core';

import { make_user_profile_route } from '../constants';


const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.info.dark
  }
}));

function UserProfileLink({ username }) {
  const classes = useStyles();

  return (
    <Link 
      component={RouterLink} 
      to={make_user_profile_route(username)}
      onClick={e => e.stopPropagation()}
      className={classes.link}
    >
      {username}
    </Link>
  );
}

export { UserProfileLink };
