#!/bin/bash
set -x

setup_user() {
    if [[ $# > 0 ]]; then
        user_id=$1
        directory=$2
        username=$3

        user_home="$directory/$username"
        mkdir -p "$user_home"
        groupadd -g $user_id $username
        useradd -u 1234 -g 1234 -d "$user_home" "$username"
        chown -R "$username:$username" "$user_home"
    else
        mkdir -p /tmp/runner1
        groupadd -g 1234 runner1
        useradd -u 1234 -g 1234 -d /tmp/runner1 runner1
        chown -R runner1:runner1 /tmp/runner1
    fi
}

# start server
if [[ $# > 0 ]]; then
    if [[ "$1" = "server" ]]; then
        setup_user
        DEBUG=1 /runner/runner-server
    fi
else
    setup_user
fi
