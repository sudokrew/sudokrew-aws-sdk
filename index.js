const sqs = require('./sqs');
const s3 = require('./s3');
const AWS = require('aws-sdk');

module.exports = {
  AWS,
  sqs,
  s3
}
