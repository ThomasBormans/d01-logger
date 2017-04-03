var util = require("util");
var winston = require("winston");
var request = require("request");
var fs = require("fs");
var config = {
    slack: {
        channel: "#general",
        emoji: ":robot_face:"
    }
};

var logDir = "logs/";
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

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

var Slack = function() {
    this.level = "error";
    this.webhook = config.slack.webhook;
    this.channel = config.slack.channel;
    this.handleExceptions = true;
};

util.inherits(Slack, winston.Transport);

winston.transports.Slack = Slack;

Slack.prototype.log = function(level, msg, meta, callback) {
    var options = {
        method: "POST",
        url: this.webhook,
        headers: {
            "Content-type": "application/json"
        },
        body: {
            channel: this.channel,
            username: "D01 logger",
            icon_emoji: config.slack.emoji,
            text: "```" + msg + "```"
        },
        json: true
    };

    request(options, function(err, data, body) {
        console.log("body", body);
    });
};

var init = function(options) {
    if (!options.webhook){
        throw new Error("Webhook is required.");
    } else {
        config.slack.webhook = options.webhook;
        config.slack.channel = options.channel || config.slack.channel;
        logger.add(Slack);
    }
};

var fallback = function(err, req, res, next) {
    logger.error(err);
    res.status(500).json({
        message: "Oh ooh... Something went terribly wrong."
    });
};

module.exports = logger;
module.exports.init = init;
module.exports.fallback = fallback;
