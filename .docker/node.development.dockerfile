FROM node:latest

MAINTAINER David Dias <diasd@proximity.bbdo.fr>

# ENV CONTAINER_PATH //
# WORKDIR $CONTAINER_PATH

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install supervisor -g --silent
RUN npm install gulp -g --silent
RUN npm install bower -g --silent
RUN npm install --silent

COPY . /usr/src/app

EXPOSE 3000

CMD ['supervisor', 'gulp serve'] ?
