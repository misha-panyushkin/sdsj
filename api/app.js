"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const config = require('./config/config');
const logger = require('./logs/manager');

const app = express();
const server = http.Server(app);

const path = require('path');

const AppRouter = require('./Routers/App.router');

app.use(bodyParser.json({limit: '50mb'}));

app.use(config.getApiPrefix().concat('/data'), AppRouter);

server.listen(config.clientPort, function () {
    const location = server.address();
    logger.start('API server successfully started at address', location.address + ':' + location.port, '.');
});