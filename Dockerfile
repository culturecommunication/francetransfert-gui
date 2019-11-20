#
# Build delivered image
#
# STEP 1 build static website
FROM node:lts-alpine as builder

## Set working directory
WORKDIR /app

## Copy all projects
COPY . .

## Install projects dependencies
RUN npm install 

## Build projects
RUN npm run build 


# STEP 2 build a small nginx image with static website
FROM nginx:alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY ./dist /usr/share/nginx/html

## Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

## Give permission to '/usr/share/nginx/html/' location
RUN find /usr/share/nginx/html/ -type f -print0 | xargs -0 chmod 0644
RUN find /usr/share/nginx/html/ -type d -print0 | xargs -0 chmod 0755

CMD ["nginx", "-g", "daemon off;"]

