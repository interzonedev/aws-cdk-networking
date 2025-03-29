#!/bin/bash

stack_name=${1}

if [ -z "$stack_name" ]; then
    echo "Usage: The stack name must be specified"
    exit 1
fi

if [ ! -d "cdk.out" ]; then
    echo "Usage: The cdk.out directory doesn't exist.  Please run the cdk-synth.sh script."
    exit 1
fi

npx cdk --profile cdk-cli --app cdk.out --require-approval never deploy $stack_name
