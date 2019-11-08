#!/bin/bash

# We need to install dependencies only for Docker
[[ ! -e /.dockerenv ]] && exit 0

# Display debug in console
set -xe

# Variables d'environnement
. ci/01-install/02_init_variables.sh

# Require dependencies
npm install

# Prepare build prod
ng build --prod --configuration=production
