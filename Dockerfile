# Requires docker >= 17.05

FROM node:6 AS builder

WORKDIR scraaaam

RUN npm install --global gulp-cli

COPY package.json .

RUN npm set progress=false && npm config set depth 0

RUN npm install --only=production

RUN cp -R node_modules prod_node_modules

RUN npm install

COPY . .

RUN gulp build

FROM node:6

WORKDIR scraaaam

COPY package.json .
COPY --from=builder /scraaaam/prod_node_modules ./node_modules
COPY --from=builder /scraaaam/dist ./dist

EXPOSE 3001

ENTRYPOINT ["npm", "start"]