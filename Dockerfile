FROM node:8.2-onbuild
# Create app directory
RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY ./src /usr/src/app/src
CMD [ "npm", "start" ]
EXPOSE 8000