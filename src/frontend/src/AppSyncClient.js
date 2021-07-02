import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync';
import uuidv4 from 'uuid/v4';
import AppSyncConfig from './AppSyncConfig';

export default new AWSAppSyncClient(AppSyncConfig, {
  link: createAppSyncLink({
    ...AppSyncConfig,
    resultsFetcherLink: ApolloLink.from([
      setContext((request, previousContext) => ({
        headers: {
          ...previousContext.headers,
          'X-Request-ID': uuidv4()
        }
      })),
      createHttpLink({
        uri: AppSyncConfig.url
      }),
      new WebSocketLink({
        uri: process.env.REACT_APP_WS_URL,
        options: {
          reconnect: true
        }
      })
    ])
  })
});
