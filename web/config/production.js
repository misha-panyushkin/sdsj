"use strict";

const Immutable = require('immutable');

const config = Immutable.Map({
    clientPort: process.env.APP_PORT || 8080,
    logLevel: process.env.APP_LOG_LEVEL || 'info'
});

exports.getConfig = () => {
    return config.toObject();
};