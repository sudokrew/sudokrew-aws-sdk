## Sudokrew AWS SDK Module

### Purpose
The purpose of the this module is to enforce the use of Promise based AWS SDK interfaces and more predicatable handling and throwing of AWS SDK related errors. 

### Services
Services include features from (not all API methods):

- AWS S3
- AWS SQS
- AWS Cloudfront

### Error Formats
All AWS SDK defined errors are defined as custom types and are parsed and thrown at run time.

Any Common Errors for S3 or SQS will be handled and thrown.

Errors will always return:

- AWS Error Code (ie: `InvalidMessageContents`)
- AWS Error Description (ie: `The message contains characters outside the allowed set.`)
- AWS Error Stack Trace
