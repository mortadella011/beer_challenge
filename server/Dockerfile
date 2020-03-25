FROM node:13-slim

COPY package-lock.json /home/node/app/
COPY package.json /home/node/app/

WORKDIR /home/node/app/
RUN npm install

ADD src /home/node/app/src/

# 2 seconds for DB to startup
CMD bash -c "sleep 2 ; npm start"