FROM node:16.13-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY ./src ./src
EXPOSE 3001

CMD [ "./node_modules/.bin/nodemon", "-w", "./src", "./src/index.js" ]
