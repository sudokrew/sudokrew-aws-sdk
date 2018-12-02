// import sqs from './sqs';
const sqs = require('./sqs');
import s3 from '.s3';
import AWS from 'aws-sdk';


module.exports = {
  sqs,
  s3,
  AWS
}


