FROM debian:11-slim

WORKDIR /app

RUN apt-get update
RUN apt-get install -yq --no-install-recommends
RUN apt-get install curl -y
RUN apt-get install bash
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y poppler-utils
RUN npm install --global yarn
RUN yarn add nodemon -D

WORKDIR ./www


COPY package*.json ./

RUN yarn

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "yarn", "dev" ]