#!/usr/bin/env bash

set -e
set -x

GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD | tr -d -c ".[:alnum:]")
GIT_VERSION=$(git rev-parse --verify HEAD | head -c 10)
BUILD_NUMBER=${BUILD_BUILDNUMBER:-localdev}
TIME_STAMP=$(date '+%Y-%m-%-d-%H-%M')
APP_ENVIRONMENT=${APP_ENVIRONMENT-dev}
SERVICE_NAME=${SERVICE_NAME:-api}

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd ${SCRIPT_DIR}/../..
PROJECT_ROOT=$(pwd)
CONFIG_FILE="$PROJECT_ROOT/.env-${APP_ENVIRONMENT}"
for i in $(cat ${CONFIG_FILE} |  sed '/#/d;/^$/d;s/\r//' )
do
    export $i
done

ARTEFACT_DIR="${PROJECT_ROOT}/output"

STACK_NAME=${APP_NAME}-${SERVICE_NAME}-appsync-${APP_ENVIRONMENT}
TIME_STAMP=$(date '+%Y-%m-%-d-%H-%M')
PREFIX="cfntemp/${STACK_NAME}/${TIME_STAMP}"
ARTEFACT_STORAGE_BUCKET=$(aws cloudformation describe-stacks --stack-name ${BOOTSTRAP_STACK} --query 'Stacks[].Outputs[?OutputKey==`ArtefactBucketName`].OutputValue' --output text)
DYNDB_REFERENCE_TABLE=$(aws cloudformation describe-stacks --stack-name ${DATASTORE_STACK} --query 'Stacks[].Outputs[?OutputKey==`ReferenceDataTable`].OutputValue' --output text)
COGNITO_POOL_ID=$(aws cloudformation describe-stacks --stack-name ${AUTH_STACK} --query 'Stacks[].Outputs[?OutputKey==`CognitoPoolID`].OutputValue' --output text)
COGNITO_CLIENTID_WEB=$(aws cloudformation describe-stacks --stack-name ${AUTH_STACK} --query 'Stacks[].Outputs[?OutputKey==`CognitoClienIDWeb`].OutputValue' --output text)
DYNDB_TABLE=$(aws cloudformation describe-stacks --stack-name ${DATASTORE_STACK} --query 'Stacks[].Outputs[?OutputKey==`MemberDataTable`].OutputValue' --output text)
ES_ENDPOINT=$(aws cloudformation describe-stacks --stack-name ${ES_STACK} --query 'Stacks[].Outputs[?OutputKey==`ElasticSearchEndpoint`].OutputValue' --output text)
AppSyncIAMRole=$(aws cloudformation describe-stacks --stack-name ${ES_STACK} --query 'Stacks[].Outputs[?OutputKey==`AppSyncIAMRole`].OutputValue' --output text)


# Upload Files
aws s3 cp --recursive "${ARTEFACT_DIR}/api/graphql/" "s3://${ARTEFACT_STORAGE_BUCKET}/${PREFIX}/graphql" 

if [[ "${1}" == "remove" ]]; then
    aws cloudformation delete-stack --stack-name ${STACK_NAME}
    aws cloudformation wait stack-delete-complete --stack-name ${STACK_NAME}
    exit 0
fi

# Deploy Stack
aws cloudformation deploy \
    --stack-name ${STACK_NAME} \
    --template-file ${ARTEFACT_DIR}/cfn/appsync.yml \
    --parameter-overrides \
        AppName=${APP_NAME} \
        Environment=${APP_ENVIRONMENT} \
        CognitoPoolId=${COGNITO_POOL_ID} \
        CognitoClientId=${COGNITO_CLIENTID_WEB} \
        DynamoDBTableName=${DYNDB_TABLE} \
        s3Pathgraphql=s3://${ARTEFACT_STORAGE_BUCKET}/${PREFIX}/graphql \
        ElasticSearchEndpoint=${ES_ENDPOINT} \
        DynamoDBReferenceTableName=${DYNDB_REFERENCE_TABLE} \
        AppSyncIAMRole=${AppSyncIAMRole} \
    --capabilities CAPABILITY_NAMED_IAM CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
    --no-fail-on-empty-changeset \
    --tags "CostCentre=${COST_CENTRE}" "Owner=${OWNER}" "ApplicationID=${APPLICATION_ID}" "TimeStamp=${TIME_STAMP}" "Source_Branch=${GIT_BRANCH}" "Source_Version=${GIT_VERSION}" "BUILD_NUMBER=${BUILD_NUMBER}"
