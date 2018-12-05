const sqs = require('./sqs');
const s3 = require('./s3');
const aws = require('aws-sdk');

module.exports = {
  aws,
  sqs,
  s3
}