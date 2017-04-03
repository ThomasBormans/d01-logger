# District01 Node.js logger #
Custom Winston logger for District01 Node.js apps

## What is it ##

`d01-logger` uses [winston] for logging errors in the terminal and/or writing them to an output file.

## How to use ##

Use the logger to write all errors to a log file (default output is: _./logs/error.log_):
```js
// Start your app
var app = require("express")();
// Require the logger
var logger = require("d01-logger");

// Load all your middleware, routes, ...
...

// Use the logger after all middleware was added
app.use(logger.fallback);

// Continue setting up your app
app.listen(...
```

You can also use the logger for loggin messages to the console:
```js
// Require the logger
var logger = require("d01-logger");

// Log a debug message
logger.debug("Some debug message.");

// Log a warn message
logger.warn("Some warn message.");

// Log an error message
// This error will also be saved in the error.log file
logger.error("Some error message.");
```
The output in the terminal is colorized for easier debugging.

Last but not least, you can also add a Slack integration. It is important to load the Slack configuration **before** using anything from the logger. The webhook for Slack is required, the channel is optional. If no channel was added, the _#general_ channel will be used. You can include the init as follows:
```js
logger.init({
    webhook: "https://hooks.slack.com/services/xxx/yyy/zzz",
    channel: "#my-custom-channel"
});
```

**Please note**: The channel needs to be prefixed with a _#_.


[//]: #
   [winston]: <https://www.npmjs.com/package/winston>
