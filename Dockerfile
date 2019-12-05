#
# Build delivered image
#
# Build a small nginx image with static website
FROM nginx:alpine

## Expose port 80
EXPOSE 80

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy over the artifacts in dist folder to default nginx public folder
COPY dist /usr/share/nginx/html

## Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

## Give permission to '/usr/share/nginx/html/' location
RUN find /usr/share/nginx/html/ -type f -print0 | xargs -0 chmod 0644
RUN find /usr/share/nginx/html/ -type d -print0 | xargs -0 chmod 0755

CMD ["nginx", "-g", "daemon off;"]

