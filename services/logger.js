const winston = require('winston');

let logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: process.env.LOG_LEVEL,
      timestamp: Date.now(),
    }),
  ],
});

module.exports = logger;
