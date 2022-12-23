FROM debian:11-slim

WORKDIR /app

RUN apt-get update
RUN apt-get install -yq --no-install-recommends
RUN apt-get install curl -y
RUN apt-get install bash
RUN apt-get install wget
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y poppler-utils
RUN npm install --global yarn

ENV PORT=8080

EXPOSE 8080

CMD ["sh", "-c", "yarn install && yarn dev"]