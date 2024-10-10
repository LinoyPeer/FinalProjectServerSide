const config = require('config');
const { createError } = require("../utils/handleErrors");
const morganLogger = require("./loggers/morganLogger");

const logger = config.get('LOGGER');

const loggerMiddleware = () => {
    if (logger === 'morgan') {
        try {
            return morganLogger;
        } catch (e) {
            createError('logger', e, 400, "There is a problem with the logger")
        }
    }
}

module.exports = loggerMiddleware;