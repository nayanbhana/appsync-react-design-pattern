import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from './contexts/Auth/AuthContext';
import Log from './views/Log/Log';
import Header from './components/Header/Header';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F8F9FA',
    width: '100vw',
    height: '100vh'
  }
}));

const App = () => {
  const classes = useStyles();
  const { user, signOut } = useContext(AuthContext);
  return (
    <div className={classes.root}>
      <Header user={user} signOut={signOut} />
      <Log />
    </div>
  );
};

export default App;
