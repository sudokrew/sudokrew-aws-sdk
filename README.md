## Sudokrew AWS SDK Module

Services included:

- AWS S3
- AWS SQS

### Error Formats

Errors unique to SQS functions are handled and thrown.
Any Common Errors for S3 or SQS will be handled and thrown.

Errors will always return:

- AWS Error Code (ie: `InvalidMessageContents`)
- AWS Error Description (ie: `The message contains characters outside the allowed set.`)
- AWS Error Stack Trace
