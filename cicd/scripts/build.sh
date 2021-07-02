#!/usr/bin/env bash

set -e
set -x

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd ${SCRIPT_DIR}/../..
PROJECT_ROOT=$(pwd)
cd src/frontend

PROJECT_SRC_ROOT="${PROJECT_ROOT}/src/frontend"
OUTPUT_DIR="${PROJECT_ROOT}/output"

if [[ -d ${OUTPUT_DIR} ]]; then
    rm -rf ${OUTPUT_DIR}
fi
mkdir -p ${OUTPUT_DIR}

cd ${PROJECT_SRC_ROOT}

yarn install
yarn run build

# Copy build
mkdir -p ${OUTPUT_DIR}/frontend
cp -r ${PROJECT_SRC_ROOT}/build ${OUTPUT_DIR}/frontend/build

# Copy cfn templates
cp -r ${PROJECT_ROOT}/cfn ${OUTPUT_DIR}/cfn

# Copy graphql templates
mkdir -p ${OUTPUT_DIR}/api
cp -r ${PROJECT_ROOT}/src/api/graphql ${OUTPUT_DIR}/api/graphql

rm -rf ${PROJECT_SRC_ROOT}/build