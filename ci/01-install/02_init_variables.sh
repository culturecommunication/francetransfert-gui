#!/bin/bash

# We need to install dependencies only for Docker
[[ ! -e /.dockerenv ]] && exit 0

# Display debug in console
set -xe

# Définir l'URL du dépôt Nexus à utiliser
package_version=`node -p -e "require('./package.json').version"`
if [[ $package_version == *"SNAPSHOT" ]]; then
    export nexus_registry=$NPM_SNAPSHOTS
else
    export nexus_registry=$NPM_RELEASES
fi

# Encoder le token d'authentification
export token_auth=`echo -n $SERVICE_LOGIN:$SERVICE_PWD | base64`
