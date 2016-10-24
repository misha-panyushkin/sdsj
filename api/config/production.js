"use strict";

const Immutable = require('immutable');

const config = Immutable.Map({
    clientPort: process.env.APP_PORT || 8080,
    logLevel: process.env.APP_LOG_LEVEL || 'info',

    apiVersion: 1,

    getApiPrefix () {
        return '/api/'.concat('v', this.apiVersion)
    }
});

exports.getConfig = () => {
    return config.toJS();
};