#!/usr/bin/env bash

set -e
set -x

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd ${SCRIPT_DIR}/../..
PROJECT_ROOT=$(pwd)

function do_validate() {
    for f in $(ls *.yml -1); do
        aws cloudformation validate-template --template-body file://${f}
    done
}

cd ${PROJECT_ROOT}/cfn && do_validate

