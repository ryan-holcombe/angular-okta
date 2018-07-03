### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:10.5 as builder

ARG configuration=production

WORKDIR /ng-app

COPY *.json /ng-app/
COPY /src /ng-app/src/

RUN npm install
RUN npm run build -- --output-path=./dist --configuration=$configuration


### STAGE 2: Setup ###

FROM nginx:1.15.0-alpine

COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /ng-app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
