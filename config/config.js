const AWS = require('aws-sdk');

const opts = {
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION
}

const awsConfig = AWS.config.update(opts);

module.exports = awsConfig;