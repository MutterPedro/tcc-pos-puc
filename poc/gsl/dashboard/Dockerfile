FROM node:12.16.1-alpine

WORKDIR /app
RUN apk add --no-cache python2 git
COPY package.json package-lock.json ./
RUN npm ci
COPY ./public ./public
COPY ./src ./src
COPY ./preview ./preview
EXPOSE 3000

CMD [ "npm", "start" ]
