"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const config = require('./config/config');
const logger = require('./logs/manager');

const app = express();
const server = http.Server(app);

const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

server.listen(config.clientPort, () => {
    const location = server.address();
    logger.start('WEB server successfully started at address', location.address + ':' + location.port, '.');
});