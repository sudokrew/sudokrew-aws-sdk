const sqs = require('./sqs');
const s3 = require('./s3');
const cloudwatch = require('./cloudwatch');
const AWS = require('aws-sdk');

module.exports = {
  aws,
  sqs,
  s3,
  cloudwatch
}
