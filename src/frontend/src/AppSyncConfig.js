import { Auth } from 'aws-amplify';

export default {
  url: process.env.REACT_APP_API,
  region: 'ap-southeast-2',
  disableOffline: true,
  auth: {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: async () => {
      const session = await Auth.currentSession();
      return session.idToken.jwtToken;
    }
  }
};
