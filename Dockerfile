### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:10.5-alpine as builder

ARG configuration=production

COPY package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --output-path=./dist --prod -c $configuration


### STAGE 2: Setup ###

FROM nginx:1.15.0-alpine

COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /ng-app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
