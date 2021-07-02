import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: '#563c82'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const UserSignedIn = ({ signOut, username }) => {
  return (
    <React.Fragment>
      <Typography variant='body'>
        <Box fontStyle='italic'>{username}</Box>
      </Typography>
      <Button color='inherit' onClick={() => signOut()}>
        Logout
      </Button>
    </React.Fragment>
  );
};

const Header = ({ signOut, user }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Contino AppSync React Design Pattern
          </Typography>
          {user && <UserSignedIn username={user.username} signOut={signOut} />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
