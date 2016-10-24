var config = require('../config/config');
var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

function Manager () {}

(function () {

    this.start = function () {
        var args = Array.prototype.slice.call(arguments);
        logger.info.apply(logger, args.concat(['Log level is', config.logLevel, '.']));
    };

    this.log = function () {
        var args = Array.prototype.slice.call(arguments);
        logger.level = config.logLevel;
        logger.log.apply(logger, [config.logLevel].concat(args));
    };

}).call(Manager.prototype);

module.exports = new Manager;