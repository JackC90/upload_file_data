FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm install -g typescript

RUN npx knex migrate:latest

RUN npm run build

EXPOSE 8061

CMD ["node", "dist/index.js"]