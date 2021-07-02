#!/usr/bin/env bash

set -e
set -x

GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD | tr -d -c ".[:alnum:]")
GIT_VERSION=$(git rev-parse --verify HEAD | head -c 10)
BUILD_NUMBER=${BUILD_BUILDNUMBER:-localdev}
TIME_STAMP=$(date '+%Y-%m-%-d-%H-%M')
APP_ENVIRONMENT=${APP_ENVIRONMENT:-dev}
SERVICE_NAME=${SERVICE_NAME:-bootstrap}

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd ${SCRIPT_DIR}/../..
PROJECT_ROOT=$(pwd)
CONFIG_FILE="$PROJECT_ROOT/.env-${APP_ENVIRONMENT}"
for i in $(cat ${CONFIG_FILE} |  sed '/#/d;/^$/d;s/\r//' )
do
    export $i
done

STACK_NAME=${APP_NAME}-${SERVICE_NAME}-${APP_ENVIRONMENT}
TIME_STAMP=$(date '+%Y-%m-%-d-%H-%M')
ARTEFACT_DIR="${PROJECT_ROOT}/output"

if [[ "${1}" == "remove" ]]; then
    aws cloudformation delete-stack --stack-name ${STACK_NAME}
    aws cloudformation wait stack-delete-complete --stack-name ${STACK_NAME}
    exit 0
fi

echo $AWS_PROFILE

# Deploy Stack
aws cloudformation deploy \
    --stack-name ${STACK_NAME} \
    --template-file ${ARTEFACT_DIR}/cfn/bootstrap.yml \
    --parameter-overrides \
        Environment=${APP_ENVIRONMENT} \
        AppName=${APP_NAME} \
    --capabilities CAPABILITY_IAM \
    --no-fail-on-empty-changeset \
    --tags "CostCentre=${COST_CENTRE}" "Owner=${OWNER}" "ApplicationID=${APPLICATION_ID}" "TimeStamp=${TIME_STAMP}" "Source_Branch=${GIT_BRANCH}" "Source_Version=${GIT_VERSION}" "BUILD_NUMBER=${BUILD_NUMBER}"
