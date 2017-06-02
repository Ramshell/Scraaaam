FROM node:6

WORKDIR scraaaam

RUN npm install --global gulp-cli

COPY package.json .
RUN npm install

EXPOSE 3001

COPY . .

RUN gulp build

ENTRYPOINT ["gulp", "server"]