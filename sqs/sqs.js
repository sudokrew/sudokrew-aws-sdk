const { SQS } = require('aws-sdk');
const { logger } = require('../services');

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
      logger.info(`Queue URL retrieved: ${data.QueueUrl}`);
      return data.QueueUrl;
    })
    .catch(err => {
      if (err.code == 'AWS.SimpleQueueService.NonExistentQueue') {
        logger.info(`Queue: ${queueName} doesn't exist.`);
      }
      else {
        logger.error(`Unknown error retrieving queue URL. Stack trace: ${err}`);
        throw (new Error(err));
      }
    });

  return result;
}

function createQueue(params) {

  const result = sqs.createQueue(params).promise()
    .then(data => {
      logger.info(`Queue created: ${data.QueueUrl}`);
      return data.QueueUrl;
    })
    .catch(err => {
      if (err.code == 'QueueAlreadyExists') {
        logger.info(`Queue: ${queueName} already exists.`);
      }
      else if (err.code == 'AWS.SimpleQueueService.QueueDeletedRecently') {
        logger.error(`Queue: ${queueName} deleted recently`);
        throw (new Error(err));
      }
      else {
        logger.error(`Unknown error creating queue. Stack trace: ${err}`);
        throw (new Error(err));
      }
    });

  return result;
}


function receiveMessage(params) {

  const result = sqs.receiveMessage(params).promise()
    .then(data => {
      logger.info(`Message(s) successfully received from ${params.QueueUrl}`);
      logger.debug(`Message received from queue is: ${JSON.stringify(data)}`);
      if (data.Messages) {
        return data.Messages;
      }
      return [];
    })
    .catch(err => {
      if (err.code == 'OverLimit') {
        logger.error(`OverLimit error received. Params: ${params}. Stack trace: ${err, err.stack}`);
      }
      else {
        logger.error(`Unknown error receiving message. Stack trace: ${err}`);
        throw (new Error(err));
      }
    });

  return result;
}


function deleteMessage(params) {
  const result = sqs.deleteMessage(params).promise()
    .then(data => {
      logger.info(`Message ${params.ReceiptHandle} successfully deleted from ${params.QueueUrl}`);
      return data.RequestId;
    })
    .catch(err => {
      if (err.code == 'InvalidIdFormat') {
        logger.error(`Invalid ID format for deleted message. Params: ${params}. Stack trace: ${err, err.stack}`);
      }
      else if (err.code == 'ReceiptHandleIsInvalid') {
        logger.error(`Receipt handle invalid for deleted message. Params: ${params}. Stack trace: ${err, err.stack}`);
      }
      else {
        logger.error(`Unknown error deleting queue message. Stack trace: ${err}`);
        throw (new Error(err));
      }
    });

  return result;
}

function sendMessage(params) {
  const result = sqs.sendMessage(params).promise()
    .then(data => {
      logger.info(`Message successfully delivered to ${params.QueueUrl}`);
      return data.QueueUrl;
    })
    .catch(err => {
      logger.error(`Error delivering message. Params: ${params}. Stack trace: ${err, err.stack}`);
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
