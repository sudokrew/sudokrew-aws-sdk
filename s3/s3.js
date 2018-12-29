const { S3 } = require('aws-sdk');
const { logger } = require('../services');
const { CommonError, BucketNotFoundError } = require('../services/errorHandler');

class S3Wrapper {

  constructor(opts) {
    this.s3 = new S3(opts);
  }

  createBucket(params) {
    const result = this.s3.createBucket(params).promise()
      .then(data => {
        logger.debug(`Successful creation of S3 bucket ${params.Bucket}`);
        return true;
      })
      .catch(err => {
        throw new CommonError(err.code, err.description, err.stack);
      });

    return result;
  }

  bucketExists(params) {
    const result = this.s3.headBucket(params).promise()
      .then(data => {
        logger.debug(`Bucket ${params.Bucket} exists`);
        return true;
      })
      .catch(err => {
        logger.debug(`Bucket Exists Error: ${err}`);

        if (err == 'NotFound' || err.code === 'NotFound') {
          throw new BucketNotFoundError(err.code, err.description, err.stack);
        }
        throw new CommonError(err.code, err.description, err.stack);
      });

    return result;
  }

  listBuckets() {
    const result = this.s3.listBuckets().promise()
      .then(data => {
        logger.debug(`Successfully retrieved bucket list:\n${data}`);
        return data;
      })
      .catch(err => {
        throw new CommonError(err.code, err.description, err.stack);
      });

    return result;
  }

  putObject(params) {
    const result = this.s3.putObject(params).promise()
      .then(data => {
        logger.debug(`Successful write to S3 key: ${params.Key}\n Payload: ${params.payload}`);
        return data;
      })
      .catch(err => {
        throw new CommonError(err.code, err.description, err.stack);
      });

    return result;
  }
}

module.exports = S3Wrapper;
