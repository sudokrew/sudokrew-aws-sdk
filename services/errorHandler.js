function getS3Error(err) {
  throw new Error('Error Code: AccessDenied, 403 Forbidden');
}

function getSqsError(err) {
  if (err.code == 'AWS.SimpleQueueService.NonExistentQueue') {
    throw new Error(`The specified queue doesn't exist (AWS.SimpleQueueService.NonExistentQueue) - HTTP Status Code: 400`)
  } else if (err) {
    throw new Error(err);
  }
}

module.exports = {
  getS3Error,
  getSqsError
};
