function getS3Error(err) {
  if (!err) {
    throw new Error(null);
  } else {
    throw new Error(err);
  }
}

function getSqsError(err) {
  if (err.code == 'AWS.SimpleQueueService.NonExistentQueue') {
    throw new Error(`The specified queue doesn't exist - ${err.code} - HTTP Status Code: 400`)
  }
  else if (err.code == 'AWS.SimpleQueueService.QueueDeletedRecently') {
    throw new Error(`A queue with name ${queueName} was deleted recently. You must wait 60 seconds after deleting a queue before you can create another queue with the same name. - ${err.code}`)
  }
  else if (err.code == 'QueueAlreadyExists') {
    throw new Error(`${err.code} - A queue with name ${queueName} already exists.`)
  }
  else if (err.code == 'OverLimit') {
    throw new Error(`OverLimit error received. Params: ${params}. Stack trace: ${err, err.stack}`);
  }
  else if (err.code == 'InvalidIdFormat') {
    throw new Error(`${err.code} - Invalid ID format for deleted message. Params: ${params}. Stack trace: ${err, err.stack}`);
  }
  else if (err.code == 'ReceiptHandleIsInvalid') {
    throw new Error(`${err.code} - Receipt handle invalid for deleted message. Params: ${params}. Stack trace: ${err, err.stack}`);
  }
  else if (err.code == 'AWS.SimpleQueueService.UnsupportedOperation') {
    throw new Error(`${err.code} - Error code 400. Unsupported operation.`)
  }
  else if (err.code == 'InvalidMessageContents') {
    throw new Error(`${err.code} - The message contains characters outside the allowed set. Stack trace: ${err, err.stack}`)
  }
  else if (err) {
    throw new Error(err);
  }
  else {
    throw new Error(null);
  }
}

module.exports = {
  getS3Error,
  getSqsError
};
