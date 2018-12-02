// import sqs from './sqs';
const sqs = require('./sqs');
const s3 = require('./s3');
const logger = require('./services')

module.exports = {
  sqs,
  s3,
  logger
}


