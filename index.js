const AWS = require('aws-sdk');
const sqs = require('./sqs');
const s3 = require('./s3');
const cloudwatch = require('./cloudwatch');

module.exports = {
  AWS,
  sqs,
  s3,
  cloudwatch
}
