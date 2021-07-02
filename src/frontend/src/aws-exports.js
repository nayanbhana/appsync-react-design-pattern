const awsmobile = {
    "aws_project_region": "ap-southeast-2",
    "aws_cognito_identity_pool_id": process.env.REACT_APP_ID_POOL,
    "aws_cognito_region": "ap-southeast-2",
    "aws_user_pools_id": process.env.REACT_APP_USER_POOL,
    "aws_user_pools_web_client_id": process.env.REACT_APP_WEB_CLIENT_ID,
    "oauth": {
        "domain": process.env.REACT_APP_COGNITO_DOMAIN,
        "scope": [
            "aws.cognito.signin.user.admin",
            "openid"
        ],
        "redirectSignIn": process.env.REACT_APP_SIGNIN_URL,
        "redirectSignOut": process.env.REACT_APP_SIGNOUT_URL,
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};


export default awsmobile;