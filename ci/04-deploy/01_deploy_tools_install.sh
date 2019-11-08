#!/bin/bash

# We need to install dependencies only for Docker
[[ ! -e /.dockerenv ]] && exit 0

# Display debug in console
set -xe

# Variables d'environnement
. ci/01-install/02_init_variables.sh

# IBM Cloud CLI
# curl -sL https://ibm.biz/idt-installer | bash
