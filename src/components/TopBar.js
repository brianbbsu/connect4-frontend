import { Fragment, useContext, useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, Button, ButtonGroup, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Typography } from '@material-ui/core';

import { UserContext } from '../contexts';
import { ROUTE_HOME, ROUTE_GAMES, ROUTE_USERS, ROUTE_SIGN_IN, ROUTE_SIGN_UP, make_user_profile_route } from '../constants';
import { deleteToken, requestSignOut } from '../api';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButton-root": {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  siteName: {
    fontWeight: 500,
    marginRight: theme.spacing(2),
    cursor: "pointer"
  }
}));

function TopBar({ authorizeAndSetUser }) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const history = useHistory();
  const signOut = async () => {
    setOpen(false);
    const success = await requestSignOut();
    if (success) {
      deleteToken();
      history.push(ROUTE_HOME);
      authorizeAndSetUser();
    }
    else {
      deleteToken();
      history.push(ROUTE_HOME);
      authorizeAndSetUser();
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen)=> !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if(event.key === 'Tab' || event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <AppBar position="sticky">
      <Toolbar className={classes.root}>
        { user.authorized !== null && (
          <Fragment>
            <Typography variant="h5" className={classes.siteName} onClick={() => history.push(ROUTE_HOME)}>
              Connect 4
            </Typography>
            <Box display="flex" flexGrow={1}>
              <ButtonGroup variant="text" color="inherit">
                <Button color="inherit" component={Link} to={ROUTE_HOME}>Home</Button>
                <Button color="inherit" component={Link} to={ROUTE_GAMES}>Games</Button>
                <Button color="inherit" component={Link} to={ROUTE_USERS}>Users</Button>
              </ButtonGroup>
            </Box>
            { user.authorized ? (
              <Fragment>
                <Button
                  ref={anchorRef}
                  color="inherit"
                  style={{textTransform: 'none'}}
                  onClick={handleToggle}
                >
                  { user.username }
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement}) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                            <MenuItem 
                            onClick={handleClose}
                            style={{textTransform: 'none'}} 
                            component={Link}
                            to={make_user_profile_route(user.username)}
                            >
                            Profile
                            </MenuItem>
                            <MenuItem onClick={signOut}>Sign out</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Fragment>
            ) : (
              <Fragment>
                <ButtonGroup variant="text" color="inherit">
                  <Button color="inherit" component={Link} to={ROUTE_SIGN_IN}>Sign In</Button>
                  <Button color="inherit" component={Link} to={ROUTE_SIGN_UP}>Sign Up</Button>
                </ButtonGroup>
              </Fragment>
            ) }            
          </Fragment>
        ) }
      </Toolbar>
    </AppBar>
  );
}

export { TopBar };
