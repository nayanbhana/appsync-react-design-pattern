import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import AuthContext from './AuthContext';
import Loading from '../../components/Loading/Loading';

const checkUser = () => {
  return Auth.currentSession()
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(err => console.log('err:', err));
};

const signOut = () => {
  Auth.signOut({ global: true }).catch(err => console.log(err));
};

const AuthContextProvider = ({ children }) => {
  let [loading, setLoading] = useState(true);
  let [user, setUser] = useState();

  useEffect(() => {
    setTimeout(() => {
      Auth.currentAuthenticatedUser()
        .then(user => {
          if (!user) {
            // Auth.signIn();
            Auth.federatedSignIn();
          }
          global.authIdToken = user.signInUserSession.idToken.jwtToken;
          setUser(user);
          console.log(user);
          setLoading(false);
        })
        .catch(
          error => console.log(error) || Auth.federatedSignIn()
          // Auth.signIn()
        );
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        checkUser,
        loading,
        signOut,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
