const http = require('http');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const mime = require('mime');

const config = require('./config/config');
const handlers = require('./internals/handlers');
const staticServer = require('./internals/static-server');
colors.setTheme(config.color_theme);

var server = http.createServer(function(req, res) {
    console.log(`> Peticion entrante: ${req.url}`);

    if (typeof(handlers[req.url]) == 'function') {
        handlers[req.url](req, res);
    } else {
        staticServer.server(req, res);
    }
});

server.listen(config.PORT, config.IP, function() {
    console.log(`> Server escuchando en http://${config.IP}:${config.PORT}`.info);
})