import sqs from './sqs';
import AWS from 'aws-sdk';

// AWS.config.update({endpoint: 'http://localstack', region:process.env.AWS_REGION});

aws.config.update(opts);

module.exports = {
  AWS,
  sqs,
};
