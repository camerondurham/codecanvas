#!/bin/bash

set -x

# go to repository root, handle case where this is run in root directory
cd $(git rev-parse --show-toplevel)

unformatted_code=$(go fmt ./...)
[ ! -z "$unformatted_code" ] && echo "found unformatted code in repository, exiting..." && exit 1
