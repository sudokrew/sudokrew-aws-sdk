function CommonError(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}

CommonError.prototype = new Error;

function NonExistentQueueError(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}

NonExistentQueueError.prototype = new Error;


function QueueDeletedRecentlyError(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}

QueueDeletedRecentlyError.prototype = new Error;


function QueueAlreadyExistsError(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}

QueueAlreadyExistsError.prototype = new Error;


function OverLimitError(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}

OverLimitError.prototype = new Error;


function InvalidIdFormatError(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}

InvalidIdFormatError.prototype = new Error;


function ReceiptHandleIsInvalidError(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}


ReceiptHandleIsInvalidError.prototype = new Error;


function UnsupportedOperationError(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}

UnsupportedOperationError.prototype = new Error;


function InvalidMessageContentsError(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}

InvalidMessageContentsError.prototype = new Error;

function BucketNotFoundError(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}

BucketNotFoundError.prototype = new Error;

module.exports = {
  CommonError,
  NonExistentQueueError,
  QueueDeletedRecentlyError,
  QueueAlreadyExistsError,
  OverLimitError,
  InvalidIdFormatError,
  ReceiptHandleIsInvalidError,
  UnsupportedOperationError,
  InvalidMessageContentsError,
  BucketNotFoundError
}