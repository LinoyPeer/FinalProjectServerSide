const morgan = require("morgan");
const chalk = require("chalk");

const morganLogger = morgan(function (tokens, req, res) {
    const method = chalk.blue(tokens.method(req, res));
    const url = chalk.green(tokens.url(req, res));
    const status = chalk.yellow(tokens.status(req, res));
    const responseTime = chalk.cyan(tokens['response-time'](req, res) + ' ms');

    return [
        `Method of the request is: ${method}`,
        `URL of the request is: ${url}`,
        `Status of the request is: ${status}`,
        `Time of the request is: ${responseTime}`
    ].join('\n');
});

module.exports = morganLogger;
