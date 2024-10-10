const morgan = require("morgan")

const morganLogger = morgan(function (tokens, req, res) {
    return [
        tokens.url(req, res),
    ].join(' ')
})


module.exports = morganLogger;
