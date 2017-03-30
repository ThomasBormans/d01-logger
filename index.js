var winston = require("winston");

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: "error",
            filename: "./" + logDir + "error.log",
            handleExceptions: true,
            json: true,
            maxsize: 50000000,
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

var fallback = function(err, req, res, next) {
    logger.error(err);
    res.status(500).json({
        message: "Oh ooh... Something went terribly wrong."
    });
};

module.exports = logger;
module.exports.fallback = fallback;
