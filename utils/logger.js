const { createLogger, transports, format } = require("winston");
const { timestamp, combine, printf, errors } = format;
const fs = require("fs");
const path = require("path");
const DailyRotateFile = require("winston-daily-rotate-file");
const config = require("../config/app.config");

let dir = config.app["logs"]["dir"];
if (!dir) dir = path.resolve("logs");

// create directory if it is not present
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logLevel = process.env.NODE_ENV === "development" ? "debug" : "info";

const options = {
  file: {
    level: logLevel,
    filename: dir + "/%DATE%.log",
    datePattern: "YYYY-MMM-DD",
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    handleRejections: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: false,
    maxSize: "20m",
    colorize: true,
    maxFiles: "14d",
  },
};

const consoleLogFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] : ${stack || message}`;
});

module.exports = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: combine(
        format.colorize(),
        timestamp({ format: "YYYY-MMM-DD HH:mm:ss" }),
        errors({ stack: true }),
        consoleLogFormat
      ),
    }),
  ],
  // File storage to be turned on while app is live
  // exceptionHandlers: [new DailyRotateFile(options.file)],
  // rejectionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});
