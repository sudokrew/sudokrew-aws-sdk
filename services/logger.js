const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: process.env.LOG_LEVEL,
      timestamp: Date.now(),
    }),
  ],
});

module.exports = {
  logger
};
