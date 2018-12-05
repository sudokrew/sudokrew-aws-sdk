const { SQS } = require('aws-sdk');
const { logger } = require('../services');
const errorHandler = require('../services/errorHandler');

if (!process.env.AWS_SQS_ENDPOINT) {
  throw new Error('AWS_SQS_ENDPOINT environment variable missing');
}

const sqs = new SQS({ endpoint: process.env.AWS_SQS_ENDPOINT });

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
      errorHandler.getSqsError(err);
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
      errorHandler.getSqsError(err);
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
      errorHandler.getSqsError(err);
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
      errorHandler.getSqsError(err);
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
      errorHandler.getSqsError(err);
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
