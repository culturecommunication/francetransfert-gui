#!/bin/bash

# will run only in a docker env
[[ ! -e /.dockerenv ]] && exit 0

set -xe

# Download and install sonar-scanner cli
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.3.0.1492-linux.zip
unzip ./sonar-scanner-cli-3.3.0.1492-linux.zip
PATH=./sonar-scanner-3.3.0.1492-linux/bin:$PATH

# Submit code to sonarqube server
PROJECT_KEY=$CI_SONAR_PROJECT_KEY_MASTER
SONAR_COVERAGE_REPORT=$CI_PROJECT_DIR/coverage/lcov.info

sonar-scanner -X \
    -Dsonar.host.url=$SONAR_URL \
    -Dsonar.login=$SONAR_TOKEN \
    -Dsonar.projectKey=$PROJECT_KEY \
    -Dsonar.projectName=$PROJECT_KEY \
    -Dsonar.sources=./projects/gui-core/src/lib \
    -Dsonar.sourceEncoding=UTF-8 \
    -Dsonar.typescript.lcov.reportPaths=$SONAR_COVERAGE_REPORT

echo "Ok, submitted to sonarqube server"