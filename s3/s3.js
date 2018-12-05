const AWS = require('aws-sdk');
const { logger } = require('../services');
const { CommonError } = require('../services/errorHandler');


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
      logger.debug(`Successful creation of S3 bucket ${params.Bucket}`);
      return true;
    })
    .catch(err => {
      throw new CommonError(err.code, err.description, err.stack);
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
      throw new CommonError(err.code, err.description, err.stack);
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
      throw new CommonError(err.code, err.description, err.stack);
    });

  return result;
}

function putObject(params) {
  const result = s3.putObject(params).promise()
    .then(data => {
      logger.debug(`Successful write to S3 key: ${params.Key}\n Payload: ${params.payload}`);
      return data;
    })
    .catch(err => {
      throw new CommonError(err.code, err.description, err.stack);
    });

  return result;
}

module.exports = {
  putObject,
  createBucket,
  listBuckets,
  bucketExists
};