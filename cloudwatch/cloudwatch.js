const { CloudWatch } = require('aws-sdk');
const { logger } = require('../services');
const { CommonError, InvalidFormatError, ResourceNotFoundError, LimitExceededError } = require('../services/errorHandler');

class CloudwatchWrapper {

  constructor(opts) {
    this.cloudwatch = new CloudWatch(opts);
  }

  putMetricData(metricObj) {
    
    const result = this.cloudwatch.putMetricData(metricObj).promise()
      .then(data => {
        logger.debug(`Successful message ${JSON.stringify(data)} sent to CloudWatch: ${JSON.stringify(metricObj)}`);
        return;
      })
      .catch(err => {
        throw new CommonError(err.code, err.description, err.stack);
      })

    return result;
  }

  putMetricAlarm(alarmParams) {
    
    const result = this.cloudwatch.putMetricAlarm(alarmParams).promise()
      .then(data => {
        logger.debug(`Successful alarm ${JSON.stringify(data)} send to CloudWatch: ${JSON.stringify(alarmParams)}`)
      })
      .catch(err => {
        if (err.code == 'AWS.Cloudwatch.LimitExceeded') {
          throw new LimitExceededError(err.code, err.description, err.stack)
        } else {
          throw new CommonError(err)
        }
      })
    
    return result;
  }

  enableAlarmActions(paramsEnableAlarmAction) {
    const result = this.cloudwatch.enableAlarmActions(paramsEnableAlarmAction).promise()
      .then(data => {
      logger.debug(`Alarm: ${JSON.stringify(paramsEnableAlarmAction)} enabled. Response: ${JSON.stringify(data)}`)
      })
      .catch(err => {
        throw new CommonError(err)
      })
    return result
  }

  sendCustomCountMetric(namespace, metricName, value) {

    const customMetricObj = {
      Namespace: namespace,
      MetricData: [
        {
          MetricName: metricName,
          Timestamp: new Date(),
          Value: value
        }
      ]
    }
    
    return this.putMetricData(customMetricObj);
  }

  setAlarmState(alarmState) {

    const result = this.cloudwatch.setAlarmState(alarmState).promise()
      .then(data => {
        logger.debug(`Sucessful alarm ${JSON.stringify(data)} set in CloudWatch: ${JSON.stringify(alarmState)}`)
      })
      .catch(err => {
        if (err.code == 'AWS.Cloudwatch.InvalidFormat') {
          throw new InvalidFormatError(err.code, err.description, err.stack)
        } else if (err.code == 'AWS.Cloudwatch.ResourceNotFound') {
          throw new ResourceNotFoundError(err.code, err.description, err.stack)
        } else {
          throw new CommonError(err)
        }
      })
    
    return result;
  }
}

module.exports = CloudwatchWrapper;
