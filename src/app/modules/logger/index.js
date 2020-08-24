const path = require('path');
const winston = require('winston');
const {combine, timestamp, label, printf} = winston.format;
const WinstonDailyRotateFile = require('winston-daily-rotate-file');
const config = require('../../modules/config');

const getLogger = module => {
    // a label with the name of the file, which displays the message
    /** @warn May be an error on unit-tests */
    const exitOnError = false;
    let fileName = module.filename
        .replace(process.cwd(), '')
        .split(path.sep)
        .slice(-2)
        .join(path.sep);
    if (label[0] !== path.sep) {
        fileName = path.sep + fileName;
    }

    // const format = winston.format.simple();
    const format = combine(
        label({label: fileName}),
        winston.format.colorize(),
        timestamp(),
        printf(({label, level, message, timestamp}) => `[${level}][${timestamp}][${label}] - ${message}`),
    );
    // specifies the transport of logs depending on the settings
    const transports = [];
    /** @type {{type, consoleLevel, filePath, fileLevel}} */
    const logConfig = config.log;

    // logging in console
    if (logConfig.type === 'console' || logConfig.type === 'both') {
        transports.push(new winston.transports.Console({
            level: logConfig.consoleLevel,
            json: false,
        }));
    }

    // logging in file
    if (logConfig.type === 'file' || logConfig.type === 'both') {
        transports.push(new WinstonDailyRotateFile({
            filename: logConfig.filePath,
            level: logConfig.fileLevel,
            json: true,
        }));
    }

    // return customized logger
    return winston.createLogger({
        exitOnError,
        format,
        transports,
    });
};

module.exports = getLogger;
