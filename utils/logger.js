const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;
require('winston-daily-rotate-file');

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] ${message} `;
  if (metadata && Object.keys(metadata).length) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const fileWriterTransport = new transports.DailyRotateFile({
  filename: 'logs/api-%DATE%.log',
  datePattern: 'YYYYMMDD',
  zippedArchive: true,
  maxSize: 5242880,
  timestamp: true,
  prettyPrint: true,
  tailable: true,
  silent: false,
  maxFiles: 5,
  json: true,
  colorize: false,
});

const logger = createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  format: combine(format.colorize(), splat(), timestamp(), myFormat),
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    }),
    fileWriterTransport,
  ],
});

fileWriterTransport.on('rotate', function (oldFilename, newFilename) {
  logger.log('info', 'Log file rotation', {
    oldFilename,
    newFilename,
  });
});

module.exports = logger;
