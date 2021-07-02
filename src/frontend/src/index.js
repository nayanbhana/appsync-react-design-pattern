import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';
import AuthContextProvider from './contexts/Auth/AuthContextProvider';
import App from './App';
import AppSyncClient from './AppSyncClient';
import config from './aws-exports';
import * as serviceWorker from './serviceWorker';

import './index.css';

Amplify.configure(config);

ReactDOM.render(
  <AuthContextProvider>
    <ApolloProvider client={AppSyncClient}>
      <App />
    </ApolloProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
