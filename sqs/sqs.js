const { SQS } = require('aws-sdk');
const { logger } = require('../services');
const {
  CommonError,
  NonExistentQueueError,
  QueueDeletedRecentlyError,
  QueueAlreadyExistsError,
  OverLimitError,
  InvalidIdFormatError,
  ReceiptHandleIsInvalidError,
  UnsupportedOperationError,
  InvalidMessageContentsError } = require('../services/errorHandler');

const { AWS_SQS_ENDPOINT } = require('../config/config.js');

if (!AWS_SQS_ENDPOINT) {
  throw new Error('AWS_SQS_ENDPOINT environment variable missing');
}

const sqs = new SQS({ endpoint: AWS_SQS_ENDPOINT });

function getQueueUrl(queueName) {

  const params = {
    QueueName: queueName
  };

  const result = sqs.getQueueUrl(params).promise()
    .then(data => {
      logger.debug(`Queue URL retrieved: ${data.QueueUrl}`);
      return data.QueueUrl;
    })
    .catch(err => {
      if (err.code == 'AWS.SimpleQueueService.NonExistentQueue') {
        throw new NonExistentQueueError(err.code, err.description, err.stack);
      }
      else {
        throw new CommonError(err.code, err.description, err.stack);
      }
    });

  return result;
}

function createQueue(params) {

  const result = sqs.createQueue(params).promise()
    .then(data => {
      logger.debug(`Queue created: ${data.QueueUrl}`);
      return data.QueueUrl;
    })
    .catch(err => {
      if (err.code == 'AWS.SimpleQueueService.QueueDeletedRecently') {
        throw new QueueDeletedRecentlyError(err.code, err.description, err.stack);
      }
      else if (err.code == 'QueueAlreadyExists') {
        throw new QueueAlreadyExistsError(err.code, err.description, err.stack);
      }
      else {
        throw new CommonError(err.code, err.description, err.stack);
      }
    });

  return result;
}


function receiveMessage(params) {

  const result = sqs.receiveMessage(params).promise()
    .then(data => {
      logger.debug(`Message received from queue is: ${JSON.stringify(data)}`);
      if (data.Messages) {
        return data.Messages;
      }
      return [];
    })
    .catch(err => {
      if (err.code == 'OverLimit') {
        throw new OverLimitError(err.code, err.description, err.stack);
      }
      else {
        throw new CommonError(err.code, err.description, err.stack);
      }
    });

  return result;
}


function deleteMessage(params) {
  const result = sqs.deleteMessage(params).promise()
    .then(data => {
      logger.debug(`Message ${params.ReceiptHandle} successfully deleted from ${params.QueueUrl}`);
      return data.RequestId;
    })
    .catch(err => {
      if (err.code == 'InvalidIdFormat') {
        throw new InvalidIdFormatError(err.code, err.description, err.stack);
      }
      else if (err.code == 'ReceiptHandleIsInvalid') {
        throw new ReceiptHandleIsInvalidError(err.code, err.description, err.stack);
      }
      else {
        throw new CommonError(err.code, err.description, err.stack);
      }
    });
  return result;
}

function sendMessage(params) {
  const result = sqs.sendMessage(params).promise()
    .then(data => {
      logger.debug(`Message successfully delivered to ${params.QueueUrl}`);
      return data.QueueUrl;
    })
    .catch(err => {
      if (err.code == 'AWS.SimpleQueueService.UnsupportedOperation') {
        throw new UnsupportedOperationError(err.code, err.description, err.stack);
      }
      else if (err.code == 'InvalidMessageContents') {
        throw new InvalidMessageContentsError(err.code, err.description, err.stack);
      }
      else {
        throw new CommonError(err.code, err.description, err.stack);
      }
    });
  return result;
}

module.exports = {
  createQueue,
  sendMessage,
  getQueueUrl,
  receiveMessage,
  deleteMessage
};
