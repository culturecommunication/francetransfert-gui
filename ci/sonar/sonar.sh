#!/bin/bash

# will run only in a docker env
[[ ! -e /.dockerenv ]] && exit 0

set -xe

# Download and install sonar-scanner cli
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.3.0.1492-linux.zip
unzip ./sonar-scanner-cli-3.3.0.1492-linux.zip
PATH=./sonar-scanner-3.3.0.1492-linux/bin:$PATH

# Submit code to sonarqube server
PROJECT_KEY=$SONAR_KEY$CI_PROJECT_NAME.$CI_COMMIT_REF_SLUG
MODULES='upload,download'
UPLOADNAME="Upload"
DOWNLOADNAME="Download"

sonar-scanner -X \
    -D"sonar.host.url=${SONAR_URL}" \
    -D"sonar.login=${SONAR_TOKEN}" \
    -D"sonar.projectKey=${PROJECT_KEY}" \
    -D"sonar.sourceEncoding=UTF-8" \
    -D"sonar.modules=${MODULES}" \
    -D"upload.sonar.projectBaseDir=./projects" \
    -D"upload.sonar.projectName=${UPLOADNAME}" \
    -D"upload.sonar.sources=./upload/src/app" \
    -D"upload.sonar.typescript.lcov.reportPaths=${CI_PROJECT_DIR}/coverage/upload/lcov.info" \
    -D"download.sonar.projectBaseDir=./projects" \
    -D"download.sonar.projectName=${DOWNLOADNAME}" \
    -D"download.sonar.sources=./download/src/app" \
    -D"download.sonar.typescript.lcov.reportPaths=${CI_PROJECT_DIR}/coverage/download/lcov.info"

echo "Ok, submitted to sonarqube server"
