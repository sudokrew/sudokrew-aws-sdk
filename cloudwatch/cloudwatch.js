const AWS = require('aws-sdk');
const { logger } = require('../services');
const { CommonError } = require('../services/errorHandler');

class CloudwatchWrapper {

  constructor(opts) {
    this.cloudwatch = new CloudWatch(opts);
  }

  putMetricData(metricObj) {
    const result = this.cloudwatch.putMetricData(metricObj).promise()
      .then(data => {
        logger.debug(`Successful message sent to CloudWatch ${metricObj}`);
        return;
      })
      .catch(err => {
        throw new CommonError(err.code, err.description, err.stack);
      });

    return result;
  }
}

module.exports = CloudwatchWrapper;
