#!/bin/bash

# We need to install dependencies only for Docker
[[ ! -e /.dockerenv ]] && exit 0

# Display debug in console
set -xe

# Variables d'environnement
. ci/01-install/02_init_variables.sh

# Définir la variable CHROME_BIN pour qu'elle pointe sur le binaire Chrome
export CHROME_BIN=`find $CI_PROJECT_DIR/node_modules/puppeteer -name "chrome"`

# Démarrer les tests Angular
node_modules/.bin/ng test --code-coverage=true --watch=false --browsers=ChromeHeadlessCI
