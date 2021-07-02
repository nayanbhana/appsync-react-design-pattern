FROM node:12.14.1

RUN apt-get update
RUN apt-get -y install dos2unix gettext moreutils

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

EXPOSE 3000
EXPOSE 35729