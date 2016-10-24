var _ = require('lodash');
var environment = process.env.NODE_ENV || 'production';

function Config (config) {
    _.assign(this, config);
}

module.exports = new Config(require('./'.concat(environment)).getConfig());