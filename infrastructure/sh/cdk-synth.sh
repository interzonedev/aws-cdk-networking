#!/bin/bash

set -e

function print_usage() {
    cat <<EOF

    Usage:
        -sif|--stack-id-fragment
            A short string that uniquely identifies your stack, such as your initials or other identifier like a JIRA
            ticket name (`ca-7`).  This is something to distinguish your stack (and child constructs) from others
            deployed in the same AWS CA account.
        -cvr|--code-version-ref
            A branch name or tag name in the Git repository that identifies the code version to synthesize the
            CloudFormation templates from.  This can also be a commit hash but that will be set automatically in a
            different context variable.
        -dl|--debug-level
            The level of debugging messages to output.
        -h, --help
            Prints this screen.  The command will not be executed.

EOF
}

# Declare default values.
print_usage=false
debug_level=0
stack_id_fragment=''
code_version_hash=`git rev-parse HEAD`
code_version_ref=''

# Set values according to command line arguments.
while [[ $# > 0 ]]; do
    key="$1"
    case $key in
        -dl|--debug-level)
            debug_level="$2"
        ;;
        -sif|--stack-id-fragment)
            stack_id_fragment="$2"
        ;;
        -cvr|--code-version-ref)
            code_version_ref="$2"
        ;;
        -h|--help)
            print_usage=true
        ;;
        *)
        # unknown option
        ;;
    esac
    shift
done

if [ "${print_usage}" = true ]; then
    print_usage
    exit 0
fi

if [ ! -z "$code_version_ref" ]; then
    code_version_hash=`git rev-parse $code_version_ref`
fi

if [ "${debug_level}" -gt "0" ]; then
    echo "stack_id_fragment = $stack_id_fragment"
    echo "code_version_hash = $code_version_hash"
    echo "code_version_ref = $code_version_ref"
fi

# Validate inputs
if [ -z "$stack_id_fragment" ]; then
    echo "Usage: The stack id fragment must be specified"
    exit 1
fi

# Build the synth command
synth_command="npm run synth --
  --profile cdk-cli
  --context stack-id-fragment=$stack_id_fragment
  --context code-version-hash=$code_version_hash"

if [ ! -z "$code_version_ref" ]; then
    synth_command="$synth_command --context code-version-ref=$code_version_ref"
fi

if [ "${debug_level}" -gt "1" ]; then
    echo "synth_command = $synth_command"
fi

# Execute the synth command
$synth_command
