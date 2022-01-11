FROM node:16.13.1-alpine

# set working directory
RUN mkdir -p /usr/src/app
# RUN npm-windows-upgrade --npm-version latest
# RUN npm-windows-upgrade --npm-version 8.3.0

WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install -g --production

# copy the client directory into the container
COPY . /usr/src/ap