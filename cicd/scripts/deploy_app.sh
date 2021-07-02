#!/usr/bin/env bash

set -e
set -x

APP_ENVIRONMENT=${APP_ENVIRONMENT:-dev}
SERVICE_NAME=${SERVICE_NAME:-frontend}

VARIABLES=""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd ${SCRIPT_DIR}/../..
PROJECT_ROOT=$(pwd)
CONFIG_FILE="$PROJECT_ROOT/.env-${APP_ENVIRONMENT}"
for i in $(cat ${CONFIG_FILE} |  sed '/#/d;/^$/d;s/\r//' )
do
    export $i
done
ARTEFACT_DIR="${PROJECT_ROOT}/output"

CFRONT_STACK_NAME=${APP_NAME}-${SERVICE_NAME}-${APP_ENVIRONMENT}
export APPSYNC_API=$(aws cloudformation describe-stacks --stack-name ${APPSYNC_API_STACK} --query 'Stacks[].Outputs[?OutputKey==`AppSyncApiURL`].OutputValue' --output text)
export COGNITO_ID_POOL=$(aws cloudformation describe-stacks --stack-name ${AUTH_STACK} --query 'Stacks[].Outputs[?OutputKey==`IdentityPoolID`].OutputValue' --output text)
export COGNITO_USER_POOL=$(aws cloudformation describe-stacks --stack-name ${AUTH_STACK} --query 'Stacks[].Outputs[?OutputKey==`CognitoPoolID`].OutputValue' --output text)
export COGNITO_CLIENT_ID=$(aws cloudformation describe-stacks --stack-name ${AUTH_STACK} --query 'Stacks[].Outputs[?OutputKey==`CognitoClienIDWeb`].OutputValue' --output text)
export COGNITO_DOMAIN_NAME=$(aws cloudformation describe-stacks --stack-name ${AUTH_STACK} --query 'Stacks[].Outputs[?OutputKey==`CognitoDomainName`].OutputValue' --output text)
export COGNITO_DOMAIN=${COGNITO_DOMAIN_NAME}.auth.ap-southeast-2.amazoncognito.com
export SIGNIN_URL=https://$(aws cloudformation describe-stacks --stack-name ${CFRONT_STACK_NAME} --query 'Stacks[].Outputs[?OutputKey==`Domain`].OutputValue' --output text)/
export SIGNOUT_URL=${SIGNIN_URL}

VARIABLES="\$APPSYNC_API \$COGNITO_ID_POOL \$COGNITO_USER_POOL \$COGNITO_CLIENT_ID \$COGNITO_DOMAIN \$SIGNIN_URL \$SIGNOUT_URL"

cd ${ARTEFACT_DIR}/frontend/build/static/js/

for f in *;
do
    envsubst   < $f "$VARIABLES" | sponge $f
done


APP_S3_BUCKET=$(aws cloudformation describe-stacks --stack-name ${CFRONT_STACK_NAME} --query 'Stacks[].Outputs[?OutputKey==`BucketName`].OutputValue' --output text)
aws s3 cp --recursive "${ARTEFACT_DIR}/frontend/build" "s3://${APP_S3_BUCKET}"

CFRONT_DIST_ID=$(aws cloudformation describe-stacks --stack-name ${CFRONT_STACK_NAME} --query 'Stacks[].Outputs[?OutputKey==`DistributionId`].OutputValue' --output text)
aws cloudfront create-invalidation --distribution-id ${CFRONT_DIST_ID} --paths '/*' 