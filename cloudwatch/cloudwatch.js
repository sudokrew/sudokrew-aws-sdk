const { CloudWatch } = require('aws-sdk');
const { logger } = require('../services');
const { CommonError } = require('../services/errorHandler');

class CloudwatchWrapper {

  constructor(opts) {
    this.cloudwatch = new CloudWatch(opts);
  }

  putMetricData(metricObj) {
    
    const result = this.cloudwatch.putMetricData(metricObj).promise()
      .then(data => {
        logger.debug(`Successful message ${data} sent to CloudWatch: ${JSON.stringify(metricObj)}`);
        return;
      })
      .catch(err => {
        throw new CommonError(err.code, err.description, err.stack);
      });

    return result;
  }

  putMetricAlarm(alarmParams) {
    
    const result = this.cloudwatch.putMetricAlarm.promise()
      .then(data => {
        logger.debug(`Successful alarm ${data} send to CloudWatch: ${JSON.stringify(alarmParams)}`)
      })
      .catch(err => {
        throw new CommonError(err)
      })
    
    return result;
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

    const result = this.cloudwatch.setAlarmState.promise()
      .then(data => {
      logger.debug(`Sucessful alarm ${data} set in CloudWatch: ${JSON.stringify(alarmState)}`)
      })
      .catch(err => {
      throw new CommonError(err)
      })
    
    return result;
  }
}

module.exports = CloudwatchWrapper;
