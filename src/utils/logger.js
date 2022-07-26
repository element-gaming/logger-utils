const { createLogger, format, transports } = require('winston');
const LokiTransport = require('winston-loki');

const { timestamp } = format;
const LOG_FILE_NAME = process.env.LOG_FILE_NAME
const LOKI_HOST = process.env.LOKI_HOST
require('winston-daily-rotate-file');

const logger = createLogger()

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// eslint-disable-next-line no-shadow
const logFormat = format.printf(({ timestamp, level, message, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message} `;
  if (metadata && Object.keys(metadata).length) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

logger.add(new transports.Console({
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  format: format.combine(enumerateErrorFormat(), format.colorize(), timestamp(), format.splat(), logFormat),
  exitOnError: false,
}))

logger.add(new transports.DailyRotateFile({
  filename: `logs/${LOG_FILE_NAME}-%DATE%.log`,
  datePattern: 'YYYYMMDD',
  zippedArchive: true,
  maxSize: 5242880,
  maxFiles: 10,
  level: 'info',
  json: true,
  format: format.combine(enumerateErrorFormat(), format.uncolorize(), timestamp(), format.splat(), logFormat),
}))

logger.add(new LokiTransport({
  host: `${LOKI_HOST}`,
  json: true,
  level: 'info',
  format: format.combine(enumerateErrorFormat(), format.colorize(), timestamp(), format.splat(), logFormat),
  labels: { job: `${LOG_FILE_NAME}` }
}))

module.exports = logger;
