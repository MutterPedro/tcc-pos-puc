FROM node:16.13-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY ./src ./src
EXPOSE 3002

CMD [ "node", "./src" ]
