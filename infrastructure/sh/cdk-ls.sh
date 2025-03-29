#!/bin/bash

if [ ! -d "cdk.out" ]; then
    echo "Usage: The cdk.out directory doesn't exist.  Please run the cdk-synth.sh script."
    exit 1
fi

npx cdk --profile cdk-cli --app cdk.out ls
