#!/bin/bash

kports() {
    local ports
    if [[ "$#" != "0" ]]; then
        ports="$1"
    else
        ports="10100"
    fi

    processes=$(lsof -i:"${ports}")
    if [ ! -z "$processes" ]; then
        # kill using open ports, only print PIDs
        kill -HUP "$(lsof -t -i:$ports)"
    else
        echo "no processes running on port(s) $ports"
        return
    fi
}

kports "$1"
