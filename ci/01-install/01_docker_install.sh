#!/bin/bash

# We need to install dependencies only for Docker
[[ ! -e /.dockerenv ]] && exit 0

# Display debug in console
set -xe

apt update -yqq
apt install -yqq git curl
