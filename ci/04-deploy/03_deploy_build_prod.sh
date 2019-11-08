#!/bin/bash

# We need to install dependencies only for Docker
[[ ! -e /.dockerenv ]] && exit 0

# Display debug in console
set -xe

# Variables d'environnement
. ci/01-install/02_init_variables.sh

# Add Ibm Cloud files
cd ./dist/sample-app-angular7
cp ../../ibm_cloud/* .

# IBM Cloud setup
ibmcloud login -a $IBMCLOUD_ENDPOINT -u $IBMCLOUD_USER -p $IBMCLOUD_PASSWORD -o "$IBMCLOUD_ORGANIZATION" -s "$IBMCLOUD_SPACE"

# Push application to IBM CLoud
ibmcloud cf push
