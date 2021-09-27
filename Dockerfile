FROM node:11-alpine

COPY package.json .
RUN yarn install

COPY public/ ./public/
COPY src/ ./src/

EXPOSE 3000
CMD yarn run start