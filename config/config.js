const AWS = require('aws-sdk');

const configs = {
  SERVICES: "s3,rds,sqs,cloudwatch",
  NODE_ENV: "development",
  TMPDIR: "/private/tmp/localstack",
  AWS_ENDPOINT: "http://localstack",
  AWS_REGION: "us-west-1",
  AWS_S3_ENDPOINT: "http://localstack:4572",
  AWS_S3_FORCEPATHSTYLE: true,
  AWS_S3_REGION: "us-west-1",
  AWS_SQS_ENDPOINT: "http://localstack:4576"
}

const opts = {
  endpoint: configs.AWS_ENDPOINT,
  region: configs.AWS_REGION
}

const awsConfig = AWS.config.update(opts);

console.log(awsConfig, 'aws config from sdk');

module.exports = {
  awsConfig,
  configs
}
