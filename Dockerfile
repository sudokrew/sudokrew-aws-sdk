# Start with alpine Node image official
FROM node:10.13.0-alpine

LABEL MAINTAINER=sudokrew/devops

# Run updates and install deps
RUN apk update && apk upgrade
RUN set -x \
 && apk add --update --no-cache \
    bash \
    groff \
    jq \
    less \
    py-pip \
 && pip install --upgrade pip \
 && pip install awscli

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV APP_PATH /app

#Create app directory
RUN mkdir -p $APP_PATH

#Set WORKDIR to run CMD from
WORKDIR $APP_PATH

#Install dependencies
COPY package.json $APP_PATH
RUN npm install

#Add application files
COPY . $APP_PATH

#Start the application
ENTRYPOINT [ "npm" ]
CMD ["test"]