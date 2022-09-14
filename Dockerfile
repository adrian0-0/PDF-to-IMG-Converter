FROM ubuntu:20.04

WORKDIR /app

RUN apt-get update \
    && apt-get upgrade \
    && apt-get install apt-utils \
    && apt-get install npm -y \
    && apt-get install nodejs -y

COPY package*.json ./

RUN yarn

COPY . .

# ENV PORT=8080

# EXPOSE 8080

CMD [ "yarn", "start" ]