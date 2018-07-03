### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:10.5 as builder

ARG configuration=production

WORKDIR /ng-app

COPY package*.json /ng-app/

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
#RUN npm install && mkdir /ng-app && cp -R ./node_modules ./ng-app
RUN npm install

COPY . /ng-app/

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build -- --output-path=./dist --configuration $configuration


### STAGE 2: Setup ###

FROM nginx:1.15.0-alpine

COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /ng-app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
