FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 8000

CMD ["yarn", "dev"]