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

class SQSPromiseWrapper {
  constructor(opts) {
    this.sqs = new SQS(opts);
  }

  getQueueUrl(queueName) {

    const params = {
      QueueName: queueName
    };

    const result = this.sqs.getQueueUrl(params).promise()
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

  createQueue(params) {

    const result = this.sqs.createQueue(params).promise()
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


  receiveMessage(params) {

    const result = this.sqs.receiveMessage(params).promise()
      .then(data => {
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


  deleteMessage(params) {
    const result = this.sqs.deleteMessage(params).promise()
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

  sendMessage(params) {
    const result = this.sqs.sendMessage(params).promise()
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
}

module.exports = SQSPromiseWrapper;
