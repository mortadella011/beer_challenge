FROM node:13-slim

# install ng angular cli
RUN npm install -g @angular/cli

WORKDIR /home/node/app/

# copy angular node files
COPY angular.json package.json package-lock.json tsconfig.json browserslist tslint.json /home/node/app/
RUN npm ci
# copy sources
COPY src /home/node/app/src/

# build prod
RUN ng build --prod


FROM nginx:1.17.9-alpine
COPY docker_nginx.conf /etc/nginx/conf.d/default.conf
COPY  --from=0 /home/node/app/dist/* /usr/share/nginx/html/
