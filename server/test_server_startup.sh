#!/bin/bash
set -x

# very brittle and trivial script to check server starts up and provides a response
# absolutely no validation done so far
# TODO: do some data validation or make this a Go program and not a shell script

go run main.go &

sleep 5

# child process process id
server_pid=$!

response=$(curl -X GET localhost:10100/api/v1/languages)
if [ -z "$response" ]; then
    echo "no response from languages endpoint"
    kill -9 $server_pid
    exit 1
fi

echo "received a response from /api/v1/languages: $response"

kill -9 $server_pid
sleep 5
exit 0