const AWS = require('aws-sdk');
const { logger } = require('../services');

if (!process.env.AWS_S3_ENDPOINT) {
  throw new Error('AWS_S3_ENDPOINT environment variable missing');
} else if (!process.env.AWS_S3_REGION) {
  throw new Error('AWS_S3_REGION environment variable missing');
} else if (!process.env.AWS_S3_FORCEPATHSTYLE) {
  throw new Error('AWS_S3_FORCEPATHSTYLE environment variable missing');
}

const s3 = new AWS.S3({
  endpoint: process.env.AWS_S3_ENDPOINT,
  region: process.env.AWS_S3_REGION,
  s3ForcePathStyle: process.env.AWS_S3_FORCEPATHSTYLE
});

function createBucket(params) {
  const result = s3.createBucket(params).promise()
    .then(data => {
      logger.debug(data);
      logger.info(`Successful creation of S3 bucket ${params.Bucket}`);
      return true;
    })
    .catch(err => {
      logger.error(`Error creating S3 bucket ${params.Bucket} \nError: ${err}`);
      return false;
    });

  return result;
}

function bucketExists(params) {
  const result = s3.headBucket(params).promise()
    .then(data => {
      logger.debug(`Bucket ${params.Bucket} exists`);
      return true;
    })
    .catch(err => {
      logger.debug(`Bucket ${params.Bucket} does not exist`);
      return false;
    });

  return result;
}

function listBuckets() {
  const result = s3.listBuckets().promise()
    .then(data => {
      logger.debug(`Successfully retrieved bucket list:\n${data}`);
      return data;
    })
    .catch(err => {
      logger.error(`Could not retreive bucket list. \n Error: ${err}`);
    });

  return result;
}

function putObject(params) {
  const result = s3.putObject(params).promise()
    .then(data => {
      logger.info(`Successful write to S3 key: ${params.Key}`);
      logger.debug(`Successful write to S3 key: ${params.Key}\n Payload: ${params.payload}`);
      return data;
    })
    .catch(err => {
      logger.error(`Error writing data to S3 target: ${err}`);
    });

  return result;
}

module.exports = {
  putObject,
  createBucket,
  listBuckets,
  bucketExists
};